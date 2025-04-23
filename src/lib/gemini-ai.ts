import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Create a safety check to ensure the API key is provided
if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  console.warn('⚠️ Gemini API key is not set. AI responses will be simulated.');
}

// Initialize the Gemini AI client
const genAI = apiKey && apiKey !== 'your_gemini_api_key_here' 
  ? new GoogleGenerativeAI(apiKey) 
  : null;

// Define the model to use
const MODEL_NAME = 'gemini-1.5-flash';

// Context for the AI to understand its role
const SYSTEM_CONTEXT = `
You are a gaming assistant in a team-finding app called Cyber Arena Nexus. 
Your role is to help gamers connect with potential teammates.
Keep your responses friendly, helpful, and concise (1-3 sentences).
Focus on gaming topics, team coordination, and matchmaking.
If asked about games, ranks, or gaming strategies, provide helpful information.
Avoid discussing sensitive topics or providing personal information.
`;

// Define the conversation history type for type safety
export type MessageRole = 'user' | 'model';

export interface ConversationMessage {
  role: MessageRole;
  content: string;
}

/**
 * Generate a response from Gemini AI
 * @param prompt The user's message
 * @param conversationHistory Previous messages for context
 * @returns A promise that resolves to the AI's response
 */
export async function generateAIResponse(
  prompt: string, 
  conversationHistory: ConversationMessage[] = []
): Promise<string> {
  try {
    // If API key is not set, return a simulated response
    if (!genAI) {
      return simulateAIResponse(prompt);
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Format the conversation history for the API
    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Create the chat
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });
    
    // Add system instructions if available
    if (SYSTEM_CONTEXT) {
      await chat.sendMessage(SYSTEM_CONTEXT);
    }
    
    // Generate the response
    const result = await chat.sendMessage(prompt);
    const response = await result.response.text();
    
    return response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
}

/**
 * Simulate an AI response when the API key is not available
 * @param prompt The user's message
 * @returns A simulated response
 */
function simulateAIResponse(prompt: string): string {
  const lowercasePrompt = prompt.toLowerCase();
  
  // Simple pattern matching for common gaming questions
  if (lowercasePrompt.includes('hello') || lowercasePrompt.includes('hi')) {
    return "Hey there! Ready to find some teammates for your next gaming session?";
  }
  
  if (lowercasePrompt.includes('rank') || lowercasePrompt.includes('ranking')) {
    return "Ranks are important for finding compatible teammates. What's your current rank and which game are you playing?";
  }
  
  if (lowercasePrompt.includes('team') || lowercasePrompt.includes('teammate')) {
    return "Finding the right teammates can make all the difference! What roles are you looking to fill in your team?";
  }
  
  if (lowercasePrompt.includes('game') || lowercasePrompt.includes('play')) {
    return "We support many popular competitive games like Valorant, League of Legends, CS:GO, and more. Which one are you interested in?";
  }
  
  // Default responses for when no pattern matches
  const defaultResponses = [
    "That's interesting! Tell me more about your gaming preferences so I can help you find the right teammates.",
    "I'm here to help you connect with other players. What specific qualities are you looking for in teammates?",
    "Finding the right squad is key to success. What's your preferred playstyle?",
    "Got it! Have you checked out the player profiles in your skill range?",
    "I understand. The matchmaking system can help you find players with similar goals and playstyles."
  ];
  
  // Return a random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
