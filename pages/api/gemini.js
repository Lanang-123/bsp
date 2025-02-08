// pages/api/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format prompt sesuai dengan yang diharapkan oleh Gemini API
    const formattedPrompt = Array.isArray(prompt) 
      ? prompt.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }))
      : [{ role: 'user', parts: [{ text: prompt }] }];

    // Mulai chat tanpa riwayat awal
    const chat = model.startChat({
      history: formattedPrompt, // Kirim riwayat chat jika ada
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Kirim pesan terakhir sebagai input
    const lastMessage = formattedPrompt[formattedPrompt.length - 1].parts[0].text;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}