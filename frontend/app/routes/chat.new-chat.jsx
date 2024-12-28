import React, { useState } from "react";
import { EnterChat } from "../components/chat/EnterChat";
import { ChatMessages } from "../components/chat/ChatMessages";

export default function NewChat() {
  const [aiResponse, setAIResponse] = useState(""); // State to store AI response
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  async function onSubmit(values) {
    setIsLoading(true);
    setError("");

    // Add user message to chat history
    const userMessage = {
      role: "user",
      content: values.prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/groq-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: values.prompt,
          chatHistory: messages, // Send chat history to maintain context
        }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data.response);
      // Add AI response to chat history
      const aiMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setAIResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch response. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 container max-w-4xl mx-auto px-4">
        <div className="h-full py-4 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-semibold">Welcome to AI Chat</h2>
                <p className="text-muted-foreground">
                  Start a conversation with our AI assistant
                </p>
              </div>
            </div>
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading} />
          )}
        </div>
      </div>

      {/* Fixed bottom chat input with gradient backdrop */}
      <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto p-4">
          <EnterChat onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
