
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

// Mock conversations data
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    user: {
      id: '101',
      gamerTag: 'NeonBlade',
      lastActive: 'Online'
    },
    lastMessage: {
      content: 'Are you free for a game tonight?',
      timestamp: '10:30 AM',
      isRead: false,
      senderId: '101'
    },
    unreadCount: 1
  },
  {
    id: '2',
    user: {
      id: '102',
      gamerTag: 'PixelWarrior',
      lastActive: '5m ago'
    },
    lastMessage: {
      content: 'GG! That was an awesome match.',
      timestamp: 'Yesterday',
      isRead: true,
      senderId: '102'
    },
    unreadCount: 0
  },
  {
    id: '3',
    user: {
      id: '103',
      gamerTag: 'StormRider',
      lastActive: '3h ago'
    },
    lastMessage: {
      content: 'I sent you a friend request on Steam.',
      timestamp: 'Yesterday',
      isRead: true,
      senderId: 'current-user'
    },
    unreadCount: 0
  }
];

const Messages = () => {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Select first conversation by default
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].id);
    }
  }, [conversations, selectedConversation]);
  
  // Filter conversations by search query
  const filteredConversations = searchQuery
    ? conversations.filter(c => 
        c.user.gamerTag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;
    
  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    
    // Mark conversation as read
    setConversations(prevConvos => 
      prevConvos.map(convo => 
        convo.id === id
          ? { ...convo, unreadCount: 0, lastMessage: { ...convo.lastMessage, isRead: true } }
          : convo
      )
    );
  };
  
  const handleSendMessage = (conversationId: string, content: string) => {
    // In a real app, we'd send this to an API
    // For now, update the local state
    const now = new Date();
    const timeString = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
    
    setConversations(prevConvos => 
      prevConvos.map(convo => 
        convo.id === conversationId
          ? { 
              ...convo, 
              lastMessage: {
                content,
                timestamp: timeString,
                isRead: false,
                senderId: 'current-user'
              }
            }
          : convo
      )
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden">
      {/* Conversation List (Left Sidebar) */}
      <div className="md:border-r border-cyber-primary/20 overflow-hidden flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white mb-4 neon-text">Messages</h1>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="cyber-input w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <ConversationList 
            conversations={filteredConversations}
            selectedId={selectedConversation}
            onSelect={handleSelectConversation}
          />
        </div>
      </div>
      
      {/* Chat Window (Right Side) */}
      <div className="col-span-2 flex flex-col h-full overflow-hidden">
        {selectedConversation ? (
          <ChatWindow 
            conversation={conversations.find(c => c.id === selectedConversation)!}
            onSendMessage={(content) => handleSendMessage(selectedConversation, content)}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-cyber-dark/50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-primary/10 mb-4">
                <svg className="h-8 w-8 text-cyber-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white/80 mb-2">No conversation selected</h3>
              <p className="text-white/50">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
