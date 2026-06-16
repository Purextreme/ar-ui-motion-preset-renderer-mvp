import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { renderJob } from "./scripts/render-core";
import type { RenderJob } from "./src/render/types";

function readRequestBody(req: import("node:http").IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function renderApiPlugin(): Plugin {
  return {
    name: "ar-render-api",
    configureServer(server) {
      server.middlewares.use("/api/render", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method Not Allowed");
          return;
        }

        try {
          const body = await readRequestBody(req);
          const job = JSON.parse(body) as RenderJob;
          const host = req.headers.host ?? "127.0.0.1:5173";
          const result = await renderJob(job, `http://${host}`);

          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
          }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), renderApiPlugin()],
});
