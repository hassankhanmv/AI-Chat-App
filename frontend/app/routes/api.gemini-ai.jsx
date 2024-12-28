import { GoogleGenerativeAI } from "@google/generative-ai";
import { json } from "@remix-run/node";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const action = async ({ request }) => {
  const body = await request.json();
  const prompt = body.prompt;

  if (!prompt) {
    return json({ error: "No prompt" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return json({ response: output });
  } catch (error) {
    console.error("No Response found", error.message || error);
    return json({ error: "No Response found" }, { status: 500 });
  }
};
