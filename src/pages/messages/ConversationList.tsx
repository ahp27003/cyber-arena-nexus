
import { cn } from '@/lib/utils';

interface ConversationUser {
  id: string;
  gamerTag: string;
  lastActive: string;
}

interface Message {
  content: string;
  timestamp: string;
  isRead: boolean;
  senderId: string;
}

interface Conversation {
  id: string;
  user: ConversationUser;
  lastMessage: Message;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ConversationList = ({ conversations, selectedId, onSelect }: ConversationListProps) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyber-primary/10 mb-3">
          <svg className="h-6 w-6 text-cyber-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-white/80 text-sm mb-1">No conversations found</h3>
        <p className="text-white/50 text-xs">Connect with players to start chatting</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-cyber-primary/10">
      {conversations.map((conversation) => {
        const isSelected = selectedId === conversation.id;
        const isCurrentUserLastSender = conversation.lastMessage.senderId === 'current-user';
        
        return (
          <li 
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "cursor-pointer p-4 transition-colors",
              isSelected ? "bg-cyber-primary/20" : "hover:bg-cyber-primary/10"
            )}
          >
            <div className="flex items-center">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-blue flex items-center justify-center mr-3">
                <span className="font-bold text-white">{conversation.user.gamerTag.charAt(0).toUpperCase()}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-medium truncate">
                    {conversation.user.gamerTag}
                  </h3>
                  <span className="text-white/50 text-xs">
                    {conversation.lastMessage.timestamp}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className={cn(
                    "text-sm truncate",
                    !conversation.lastMessage.isRead && !isCurrentUserLastSender
                      ? "text-white font-medium"
                      : "text-white/60"
                  )}>
                    {isCurrentUserLastSender ? "You: " : ""}{conversation.lastMessage.content}
                  </p>
                  
                  {conversation.unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-cyber-primary text-white text-xs">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                
                <div className="mt-1">
                  <span className={cn(
                    "text-xs",
                    conversation.user.lastActive === 'Online' ? "text-green-400" : "text-white/40"
                  )}>
                    {conversation.user.lastActive}
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ConversationList;
