// Centralized constants file for AI Chat App

const constants = {
    suggestionCards: [
      {
        id: 1,
        title: "Discover New Recipes",
        description: "Ask me for recipes from around the world or ideas for a special meal.",
        example: "What are some easy dinner recipes?",
      },
      {
        id: 2,
        title: "Plan Your Day",
        description: "Get help organizing your schedule or creating a to-do list for the day.",
        example: "Can you help me plan my day?",
      },
      {
        id: 3,
        title: "Learn Something New",
        description: "Ask about any topic you're curious about and get clear explanations.",
        example: "Explain quantum physics in simple terms.",
      },
      {
        id: 4,
        title: "Boost Productivity",
        description: "Find tips to stay focused and tools to enhance your workflow.",
        example: "How can I improve my productivity?",
      },
    ],
    appSettings: {
      theme: "light",
      language: "en",
      dateFormat: "MM/DD/YYYY",
    },
    apiEndpoints: {
      chat: "/api/chat",
      suggestions: "/api/suggestions",
      userSettings: "/api/user-settings",
    },
  };
  
  export default constants;
  