import React, { useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Card, CardFooter } from "../ui/card";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Please enter a message.",
  }),
});

export function EnterChat({ onSubmit, isLoading, selectSuggestion }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSubmit = async (values) => {
    await onSubmit(values);
    form.reset();
  };

  useEffect(() => {
    if (selectSuggestion) {
      form.setValue('prompt', selectSuggestion.example);
    }
  }, [selectSuggestion, form]);

  const promptValue = selectSuggestion?.title || "";

  return (
    <Card className="border-0 shadow-none">
      <CardFooter className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Type your message..."
                        className="h-12 rounded-full bg-muted px-4"
                        value={promptValue || field.value}
                        onChange={field.onChange}
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(handleSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="icon"
                className="h-12 w-12 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
