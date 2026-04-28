// Proxy API serverless — protège la clé Gemini côté serveur
// Fonctionne sur Vercel automatiquement (route : /api/chat)
// Variables d'environnement :
//   GEMINI_API_KEY (obligatoire) — clé sur https://aistudio.google.com/app/apikey
//   GEMINI_MODEL   (optionnel)   — par défaut "gemini-2.5-flash"
//
// Modèles gratuits possibles si l'un est bloqué dans ta région :
//   - gemini-2.5-flash       (recommandé, rapide, qualité élevée)
//   - gemini-2.5-flash-lite  (encore plus rapide, plus court)
//   - gemini-1.5-flash       (modèle stable de fallback)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "GEMINI_API_KEY manquante côté serveur" });
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const { systemInstruction, contents } = req.body || {};
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

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
