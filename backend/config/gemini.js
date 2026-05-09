import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIAdvice = async (title, description, category) => {
  try {
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const prompt = `
You are a compassionate, practical advisor on an anonymous advice platform called Kindness Hub.

Someone has shared this problem anonymously:
Title: ${title}
Category: ${category}
Description: ${description}

Give them warm, honest, actionable advice in 3-4 sentences. 
- Be empathetic but practical
- No generic platitudes
- Speak directly to their specific situation
- Do NOT start with "I" or "As an AI"
- Sound like a wise, caring friend
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error('Gemini error:', err.message);
    return null; // fail silently — don't block post creation
  }
};