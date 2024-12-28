import { json } from "@remix-run/node";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log(groq, "groq API Key");

export const action = async ({ request }) => {
  const body = await request.json();
  const userInput = body.prompt;
  const chatHistory = body.chatHistory || [];

  if (!userInput) {
    return json({ error: "No userInput" }, { status: 400 });
  }

  try {
    const response = await analyzeText(userInput, chatHistory);
    return json({ response });
  } catch (error) {
    console.error("No Response found", error.message || error);
    return json({ error: "No Response found" }, { status: 500 });
  }
};

async function analyzeText(userInput, chatHistory) {
  try {
    // Convert chat history to Groq format
    const previousMessages = chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const systemPrompt = `You are an AI Assistant called RemixAI. Help users by answering their questions in simple and concise language. Maintain context of the conversation.`;
    
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...previousMessages,
        { role: "user", content: userInput }
      ],
      model: "mixtral-8x7b-32768",
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content;
    return content;
  } catch (error) {
    console.error("Groq API call failed:", error.message || error);
    throw new Error("Groq API call failed");
  }
}
