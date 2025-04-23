
import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Smile, ArrowLeft, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { generateAIResponse, ConversationMessage } from '@/lib/gemini-ai';

// Mock messages data
const MOCK_MESSAGES = [
  {
    id: '1',
    content: "Hey! I saw your profile and I think we'd make a good team.",
    timestamp: '10:20 AM',
    senderId: 'current-user'
  },
  {
    id: '2',
    content: 'Hi there! Thanks for reaching out. What rank are you currently?',
    timestamp: '10:22 AM',
    senderId: '101'
  },
  {
    id: '3',
    content: "I'm Diamond 2 right now. Been looking for a consistent duo partner to grind with.",
    timestamp: '10:25 AM',
    senderId: 'current-user'
  },
  {
    id: '4',
    content: "That's perfect! I'm Diamond 3. What role do you main?",
    timestamp: '10:27 AM',
    senderId: '101'
  },
  {
    id: '5',
    content: "I'm a support main. You?",
    timestamp: '10:29 AM',
    senderId: 'current-user'
  },
  {
    id: '6',
    content: 'ADC main! That works out really well. Are you free for a game tonight?',
    timestamp: '10:30 AM',
    senderId: '101'
  }
];

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
}

interface ConversationUser {
  id: string;
  gamerTag: string;
  lastActive: string;
}

interface Conversation {
  id: string;
  user: ConversationUser;
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
    senderId: string;
  };
  unreadCount: number;
}

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (content: string) => void;
  onBack?: () => void;
}

const ChatWindow = ({ conversation, onSendMessage, onBack }: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Store conversation history for context
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Create and add the user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: 'current-user'
    };
    
    // Update the UI with the user's message
    setMessages(prevMessages => [...prevMessages, userMessage]);
    onSendMessage(inputValue);
    setInputValue('');
    
    // Update conversation history for context
    const updatedHistory = [...conversationHistory, { role: 'user' as const, content: inputValue }];
    setConversationHistory(updatedHistory);
    
    // Show AI is responding
    setIsAiResponding(true);
    setAiError(null);
    
    try {
      // Generate AI response
      const aiResponseText = await generateAIResponse(inputValue, updatedHistory);
      
      // Add AI response to conversation history
      setConversationHistory([...updatedHistory, { role: 'model' as const, content: aiResponseText }]);
      
      // Create and add the AI response message
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: conversation.user.id
      };
      
      // Update the UI with the AI's response
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiError('Failed to get response. Please try again.');
    } finally {
      setIsAiResponding(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-cyber-primary/20">
        {isMobile && (
          <button 
            onClick={onBack}
            className="mr-3 text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-blue flex items-center justify-center mr-3">
          <span className="font-bold text-white">{conversation.user.gamerTag.charAt(0).toUpperCase()}</span>
        </div>
        
        <div>
          <h3 className="font-medium text-white">{conversation.user.gamerTag}</h3>
          <span className="text-xs text-green-400">{conversation.user.lastActive}</span>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 cyber-grid-bg">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === 'current-user';
            
            return (
              <div 
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                  <div className={`
                    rounded-t-lg p-3 
                    ${isCurrentUser 
                      ? 'rounded-bl-lg bg-cyber-primary/30 border border-cyber-primary/20' 
                      : 'rounded-br-lg bg-cyber-blue/20 border border-cyber-blue/20'
                    }
                  `}>
                    <p className="text-white">{message.content}</p>
                  </div>
                  <div className={`text-xs text-white/50 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* AI is typing indicator */}
          {isAiResponding && (
            <div className="flex justify-start">
              <div className="max-w-[75%] order-1">
                <div className="rounded-t-lg rounded-br-lg bg-cyber-blue/10 border border-cyber-blue/10 p-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 text-cyber-blue animate-spin" />
                    <p className="text-white/70 text-sm">Typing...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error message */}
          {aiError && (
            <div className="flex justify-center">
              <div className="max-w-[75%]">
                <div className="rounded-lg bg-red-500/20 border border-red-500/20 p-2">
                  <p className="text-red-400 text-sm">{aiError}</p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-cyber-primary/20">
        <div className="flex items-center space-x-2">
          <button 
            className="text-white/60 hover:text-white p-2"
            onClick={() => alert('Emoji picker coming soon!')}
          >
            <Smile className="h-6 w-6" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isAiResponding ? "AI is responding..." : "Type a message..."}
              className="cyber-input w-full py-2 min-h-[44px] max-h-24 resize-none"
              rows={1}
              disabled={isAiResponding}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isAiResponding}
            className={`p-2 rounded-full ${
              inputValue.trim() && !isAiResponding
                ? 'bg-cyber-primary text-white hover:bg-cyber-primary/80' 
                : 'bg-cyber-primary/20 text-white/50 cursor-not-allowed'
            }`}
          >
            {isAiResponding ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {/* AI-powered assistant hint */}
        <div className="mt-2 text-center">
          <p className="text-xs text-white/40">
            Powered by AI assistant • Responses may not reflect real player communication
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
