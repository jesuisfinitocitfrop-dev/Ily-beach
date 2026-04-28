import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Plugin qui simule /api/chat en local (Vite dev server)
// Comme ça le code du composant peut appeler /api/chat indifféremment
// en local (via ce plugin) ou en prod (via la fonction Vercel)
function apiChatDevPlugin(apiKey, model) {
  return {
    name: "api-chat-dev",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") return next();

        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                "GEMINI_API_KEY manquante. Crée un fichier .env à la racine avec GEMINI_API_KEY=AIza... puis relance npm run dev",
            })
          );
          return;
        }

        try {
          let body = "";
          for await (const chunk of req) body += chunk;
          const { systemInstruction, contents } = JSON.parse(body || "{}");

          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: systemInstruction
                ? { parts: [{ text: systemInstruction }] }
                : undefined,
              contents,
              generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
            }),
          });

          const text = await response.text();
          res.statusCode = response.status;
          res.setHeader("Content-Type", "application/json");
          res.end(text);
        } catch (e) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: String(e) }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  return {
    plugins: [react(), apiChatDevPlugin(env.GEMINI_API_KEY, model)],
    base: "./",
  };
});
