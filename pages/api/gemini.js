import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let { prompt, mode } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  // Jika mode summary, tambahkan instruksi ringkasan pada prompt
  if (mode === 'summary') {
    prompt = "Buat saya summary dari untuk percakapan berikut:\n\n" + prompt;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const formattedPrompt = Array.isArray(prompt)
      ? prompt.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }))
      : [{ role: 'user', parts: [{ text: prompt }] }];

    const chat = model.startChat({
      history: formattedPrompt,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

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
