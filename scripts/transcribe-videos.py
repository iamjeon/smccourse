"""
Transcribe YouTube videos -> .txt transcripts (offline, free).

Pipeline per video: yt-dlp pulls bestaudio -> mp3 (ffmpeg) -> Whisper transcribes
(Tagalog) -> writes a UTF-8 .txt at the mapped path. Recovered transcripts are written
to TextCourse/_recovered/... so the existing (corrupted) files are never overwritten.

Usage:
  WHISPER_MODEL=medium python scripts/transcribe-videos.py scripts/videos.tsv

videos.tsv format (one per line, TAB-separated; blank lines and #comments ignored):
  <youtube-url>\t<output-.txt-path>
"""
import os
import sys
import glob
import tempfile
import subprocess

import whisper  # type: ignore

MODEL = os.environ.get("WHISPER_MODEL", "medium")  # tiny|base|small|medium|large-v3
LANG = os.environ.get("WHISPER_LANG", "tl")  # Tagalog


def load_rows(path: str):
    rows = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.rstrip("\n")
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            if "\t" not in line:
                print(f"  skip (no TAB): {line!r}")
                continue
            url, out = line.split("\t", 1)
            rows.append((url.strip(), out.strip()))
    return rows


def get_audio(src: str, workdir: str) -> str:
    """Return a media path Whisper can read. Local files (incl. .mp4) are used as-is;
    otherwise treat src as a URL and pull the audio with yt-dlp."""
    if os.path.isfile(src):
        return src
    out_tmpl = os.path.join(workdir, "a.%(ext)s")
    subprocess.run(
        [sys.executable, "-m", "yt_dlp", "-f", "bestaudio/best",
         "-x", "--audio-format", "mp3", "-o", out_tmpl, src],
        check=True,
    )
    files = glob.glob(os.path.join(workdir, "a.*"))
    if not files:
        raise RuntimeError("yt-dlp produced no audio file")
    return files[0]


def main():
    if len(sys.argv) < 2:
        print("usage: python scripts/transcribe-videos.py <videos.tsv>")
        sys.exit(2)
    rows = load_rows(sys.argv[1])
    if not rows:
        print("No (url, output) rows found. Fill in scripts/videos.tsv first.")
        sys.exit(1)

    print(f"Loading Whisper model '{MODEL}' (first run downloads it)...")
    model = whisper.load_model(MODEL)

    ok, fail = 0, 0
    for i, (url, out) in enumerate(rows, 1):
        print(f"\n[{i}/{len(rows)}] {out}\n    {url}")
        try:
            os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
            with tempfile.TemporaryDirectory() as td:
                audio = get_audio(url, td)
                res = model.transcribe(audio, language=LANG, fp16=False, verbose=False)
            with open(out, "w", encoding="utf-8") as o:
                o.write(res["text"].strip() + "\n")
            words = len(res["text"].split())
            print(f"    -> wrote {out} ({words} words)")
            ok += 1
        except Exception as e:  # noqa: BLE001 - keep going on per-video failure
            print(f"    !! FAILED: {e}")
            fail += 1
    print(f"\nDone. {ok} ok, {fail} failed.")


if __name__ == "__main__":
    main()
