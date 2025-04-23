
import { Bell, Menu, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface MobileHeaderProps {
  toggleSidebar: () => void;
  toggleNotifications: () => void;
}

const MobileHeader = ({ toggleSidebar, toggleNotifications }: MobileHeaderProps) => {
  const unreadNotifications = 3; // Example count
  const unreadMessages = 2; // Example count

  return (
    <header className="flex items-center justify-between p-4 border-b border-cyber-primary/20 bg-cyber-dark/90 md:hidden">
      <button 
        onClick={toggleSidebar}
        className="text-white hover:text-cyber-primary focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-lg font-bold tracking-wider neon-text text-cyber-primary">CYBER NEXUS</span>
      </Link>
      
      <div className="flex items-center space-x-4">
        <Link to="/messages" className="relative p-1">
          <MessageCircle className="h-6 w-6 text-white hover:text-cyber-primary" />
          {unreadMessages > 0 && (
            <span className={cn(
              "absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4",
              "bg-cyber-accent text-white text-xs rounded-full"
            )}>
              {unreadMessages}
            </span>
          )}
        </Link>
        
        <button 
          onClick={toggleNotifications}
          className="relative p-1 focus:outline-none"
        >
          <Bell className="h-6 w-6 text-white hover:text-cyber-primary" />
          {unreadNotifications > 0 && (
            <span className={cn(
              "absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4",
              "bg-cyber-accent text-white text-xs rounded-full"
            )}>
              {unreadNotifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
