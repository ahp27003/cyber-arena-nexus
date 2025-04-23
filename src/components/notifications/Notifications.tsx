
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notifications = ({ isOpen, onClose }: NotificationsProps) => {
  // Example notifications data
  const notifications = [
    {
      id: 1,
      type: 'request',
      message: 'ProGamer42 wants to team up with you',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'accepted',
      message: 'NinjaSlayer accepted your match request',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from PixelWarrior',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'request',
      message: 'StormRider sent you a match request',
      time: '6 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'system',
      message: 'Your profile has been viewed 10 times today',
      time: 'Yesterday',
      read: true
    }
  ];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 right-0 w-80 bg-cyber-dark border-l border-cyber-primary/20 p-5 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Notifications</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-cyber-primary/20 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={cn(
                "cyber-panel p-4 transition-all",
                !notification.read && "border-l-2 border-l-cyber-primary"
              )}
            >
              <div className="flex justify-between">
                <span className={cn(
                  "text-xs uppercase font-medium",
                  notification.type === 'request' && "text-cyber-blue",
                  notification.type === 'accepted' && "text-cyber-primary",
                  notification.type === 'message' && "text-cyber-accent",
                  notification.type === 'system' && "text-white/60"
                )}>
                  {notification.type}
                </span>
                <span className="text-xs text-white/60">{notification.time}</span>
              </div>
              <p className="mt-2 text-sm text-white/90">{notification.message}</p>
              
              {notification.type === 'request' && (
                <div className="mt-3 flex space-x-2">
                  <button className="cyber-button text-xs py-1 px-3 flex-1 bg-cyber-primary/30 hover:bg-cyber-primary/50">
                    Accept
                  </button>
                  <button className="text-xs py-1 px-3 flex-1 border border-white/10 rounded hover:bg-white/5 text-white/70">
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-white/60 py-6">
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Notifications;
