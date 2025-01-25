import React from 'react';
import { Text } from "../../ui/Text";
import { Card } from '../../ui/card';

export default function SuggestionsCards({suggestionsData, setSelectSuggestion}) {
  return (
    <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {suggestionsData && suggestionsData?.map((suggestion) => (
        <Card
          key={suggestion.id}
          className="p-6 cursor-pointer transition-all hover:shadow-lg hover:bg-accent/10 dark:hover:bg-muted/30"
          onClick={() => setSelectSuggestion(suggestion)}
          onKeyPress={(e) => e.key === 'Enter' && setSelectSuggestion(suggestion)}
          role="button"
          tabIndex={0}
        >
          <div className="space-y-3">
            <Text size="h-sm" className="mb-2 font-semibold">
              {suggestion.title}
            </Text>
            
            <Text size="sm" className="text-muted-foreground">
              {suggestion.description}
            </Text>
            
            <div className="mt-4 p-3 rounded-lg bg-muted/50 dark:bg-muted/20">
              <Text size="xs" className="font-medium text-primary">
                Example:
              </Text>
              <Text size="xs" className="mt-1 text-muted-foreground">
                {suggestion.example}
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
  )
}
