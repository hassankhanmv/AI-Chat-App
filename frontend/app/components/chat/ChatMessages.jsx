import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";
import { MessageSkeleton } from "./MessageSkeleton";

export function ChatMessages({ messages, isLoading }) {
  const scrollRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="h-[calc(100vh-180px)] pr-4">
      <div className="flex flex-col gap-4 pb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <Avatar>
                <AvatarImage src="/ai-avatar.png" alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}

            <Card
              className={cn(
                "max-w-[80%]",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <CardContent className="p-3">
                <div className="prose dark:prose-invert">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <time className="text-[10px] opacity-70 mt-2 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </time>
              </CardContent>
            </Card>

            {message.role === "user" && (
              <Avatar>
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isLoading && <MessageSkeleton />}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
