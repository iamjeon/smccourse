// Lightweight WebSocket chat relay — handles 10K+ concurrent on 1 GB RAM.
// Deploy to Fly.io, Railway, Oracle Cloud, or any Node.js host.
//
// Env vars:
//   PORT          — listen port (default 8080)
//   RELAY_SECRET  — shared secret for the /broadcast endpoint
//
// Endpoints:
//   GET  /health     — { ok, clients, buffer }
//   POST /broadcast  — push a message to all connected clients (requires Bearer token)
//   WS   /ws         — client WebSocket (receives init + message + presence events)

const http = require("http");
const { WebSocketServer } = require("ws");

const PORT = parseInt(process.env.PORT || "8080", 10);
const SECRET = process.env.RELAY_SECRET || "";
const MAX_BUFFER = 50;
const PING_INTERVAL = 30000;

if (!SECRET) {
  console.warn("WARNING: RELAY_SECRET is not set — /broadcast is unprotected!");
}

const buffer = [];
const wss = new WebSocketServer({ noServer: true });

function broadcast(payload) {
  const data = JSON.stringify(payload);
  for (const ws of wss.clients) {
    if (ws.readyState === 1) ws.send(data);
  }
}

function aliveCount() {
  let n = 0;
  for (const ws of wss.clients) if (ws.readyState === 1) n++;
  return n;
}

function broadcastPresence() {
  broadcast({ type: "presence", count: aliveCount() });
}

// --- WebSocket handling ---

wss.on("connection", (ws) => {
  ws.isAlive = true;
  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.send(JSON.stringify({ type: "init", messages: buffer }));
  broadcastPresence();

  ws.on("close", () => broadcastPresence());
});

const pingTimer = setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) {
      ws.terminate();
      continue;
    }
    ws.isAlive = false;
    ws.ping();
  }
}, PING_INTERVAL);

wss.on("close", () => clearInterval(pingTimer));

// --- HTTP server ---

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ ok: true, clients: aliveCount(), buffer: buffer.length })
    );
  }

  if (req.method === "POST" && req.url === "/broadcast") {
    if (SECRET && req.headers.authorization !== `Bearer ${SECRET}`) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    let body = "";
    for await (const chunk of req) body += chunk;

    try {
      const msg = JSON.parse(body);
      buffer.push(msg);
      while (buffer.length > MAX_BUFFER) buffer.shift();
      broadcast({ type: "message", data: msg });
      res.writeHead(200);
      return res.end("OK");
    } catch {
      res.writeHead(400);
      return res.end("Bad JSON");
    }
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.on("upgrade", (req, socket, head) => {
  if (req.url === "/ws") {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(
    `Chat relay | port ${PORT} | buffer ${MAX_BUFFER} msgs | secret ${SECRET ? "SET" : "NOT SET"}`
  );
});
