import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side API proxy for calling Gemini model.
  // It secure-gates key authorization, allowing either the server's injected GEMINI_API_KEY or a client-defined backup.
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction, userApiKey } = req.body;
      
      const apiKey = userApiKey?.trim() || process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(400).json({ 
          error: "សូមបញ្ចូល Gemini API Key របស់អ្នកនៅក្នុងផ្ទាំង AI Helper ជាមុនសិន ឬកំណត់វានៅក្នុង Settings/Secrets របស់កម្មវិធី។" 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error Server-Side:", error);
      res.status(500).json({ error: error.message || "Failed to generate evaluation report from Gemini API." });
    }
  });

  // Hot module replacement or static server selection
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
