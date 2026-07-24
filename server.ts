import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily / securely
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // AI Assistant Endpoint for Floating Chatbot
  app.post('/api/assistant', async (req, res) => {
    try {
      const { message, availableAccounts } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          reply: "Welcome to Zero Point Market! I can assist you with instant AI escrow account purchases, level verification, and warranty guarantees. How can I help you today?"
        });
      }

      const prompt = `You are the AI Concierge for ZERO POINT MARKET, a futuristic dark-mode gaming account marketplace.
      User message: "${message}"
      
      Inventory context: ${JSON.stringify(availableAccounts || [])}
      
      Respond concisely (2-3 sentences), professionally, and with a futuristic gaming commerce tone. Note that all prices are in Bangladeshi Taka (৳ BDT). Mention instant delivery (< 2 seconds) and lifetime escrow warranty if applicable.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const replyText = response.text || "Zero Point Market provides instant AI-powered escrow delivery for verified gaming accounts.";
      res.json({ reply: replyText });
    } catch (error) {
      console.error('Gemini Assistant API Error:', error);
      res.json({
        reply: "Zero Point Market ensures 100% automated AI delivery for all Valorant, CS2, Fortnite, League, and Genshin accounts!"
      });
    }
  });

  // Vite middleware in development vs static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
