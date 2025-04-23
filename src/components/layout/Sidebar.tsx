
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  LogOut, 
  MessageCircle, 
  User, 
  Gamepad
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [username, setUsername] = useState('Player');
  
  useEffect(() => {
    // Get username from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUsername(userData.gamerTag || 'Player');
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const navItems = [
    { 
      name: 'My Profile', 
      path: '/profile', 
      icon: User 
    },
    { 
      name: 'Find Players', 
      path: '/players', 
      icon: Users 
    },
    { 
      name: 'Messages', 
      path: '/messages', 
      icon: MessageCircle,
      badge: 3 // Example badge count
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings 
    },
  ];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative",
        isOpen ? "translate-x-0" : "-translate-x-full md:w-20 md:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full cyber-panel border-r border-cyber-primary/20">
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <Link to="/" className="flex items-center space-x-2">
              <Gamepad className="h-8 w-8 text-cyber-primary" />
              <span className="text-xl font-bold tracking-wider neon-text text-cyber-primary">NEXUS</span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center justify-center w-full">
              <Gamepad className="h-8 w-8 text-cyber-primary" />
            </Link>
          )}
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-white hover:text-cyber-primary"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* User profile */}
        <div className={cn(
          "p-4 border-b border-cyber-primary/20",
          isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"
        )}>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-blue flex items-center justify-center animate-pulse-glow">
            <span className="font-bold text-white">{username.charAt(0).toUpperCase()}</span>
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium truncate text-white">{username}</h2>
              <p className="text-xs truncate text-white/60">Online</p>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center px-3 py-3 rounded-md transition-all duration-200",
                  isActive
                    ? "bg-cyber-primary/20 border border-cyber-primary/30 text-white neon-border"
                    : "text-white/70 hover:bg-cyber-primary/10 hover:text-white",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-cyber-primary" : "text-white/70")} />
                
                {isOpen && (
                  <span className="ml-3 flex-1 whitespace-nowrap">{item.name}</span>
                )}
                
                {isOpen && item.badge && (
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-cyber-accent text-white text-xs">
                    {item.badge}
                  </span>
                )}
                
                {!isOpen && item.badge && (
                  <span className="absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-cyber-accent"></span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Logout button */}
        <div className="p-4 border-t border-cyber-primary/20">
          <button
            onClick={handleLogout}
            className={cn(
              "group flex items-center px-3 py-3 rounded-md text-white/70 hover:bg-red-500/10 hover:text-red-400 w-full transition-all duration-200",
              !isOpen && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
