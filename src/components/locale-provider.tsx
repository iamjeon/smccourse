"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Locale } from "@/lib/brand";

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const Ctx = createContext<LocaleCtx | null>(null);
const STORAGE_KEY = "ll-locale";

export function LocaleProvider({
  children,
  initial = "en",
}: {
  children: React.ReactNode;
  initial?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initial);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "tl") setLocaleState(saved);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setLocale(locale === "en" ? "tl" : "en"),
    [locale, setLocale],
  );

  return (
    <Ctx.Provider value={{ locale, setLocale, toggle }}>{children}</Ctx.Provider>
  );
}

export function useLocale(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe fallback so components don't crash outside a provider.
    return { locale: "en", setLocale: () => {}, toggle: () => {} };
  }
  return ctx;
}
