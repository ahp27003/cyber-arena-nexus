
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Users, MessageCircle, GamepadIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  email: string;
  gamerTag: string;
  game?: string;
  rank?: string;
  role?: string;
  region?: string;
  bio?: string;
  lookingForTeammate?: boolean;
  profileSetupCompleted?: boolean;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user data from localStorage
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // If profile setup not completed, redirect to setup
        if (!parsedUser.profileSetupCompleted) {
          navigate('/profile/setup');
        }
      }
    } catch (error) {
      console.error('Error loading user data', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-pulse-glow w-12 h-12 border-4 border-cyber-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white">Profile not found</h2>
        <Button 
          onClick={() => navigate('/login')}
          className="mt-4 bg-cyber-primary/30 border border-cyber-primary/50 hover:bg-cyber-primary/50"
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="cyber-card">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyber-primary via-cyber-blue to-cyber-glow flex items-center justify-center animate-pulse-glow">
                  <span className="text-3xl font-bold text-white">{user.gamerTag.charAt(0).toUpperCase()}</span>
                </div>
                <button 
                  onClick={() => toast.info('Feature coming soon!')}
                  className="absolute bottom-0 right-0 bg-cyber-dark border border-cyber-primary/30 rounded-full p-2 hover:bg-cyber-primary/20 transition-colors"
                >
                  <Edit className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
            
            {/* Gamer Tag */}
            <h1 className="text-2xl font-bold text-white text-center mb-1 neon-text">
              {user.gamerTag}
            </h1>
            
            {/* Status Badge */}
            {user.lookingForTeammate && (
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/30">
                  <Users className="mr-1 h-3 w-3" /> Looking for teammates
                </span>
              </div>
            )}
            
            {/* Player Info */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-3 text-white">
                <div className="h-8 w-8 rounded-md bg-cyber-primary/20 flex items-center justify-center">
                  <GamepadIcon className="h-4 w-4 text-cyber-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Game</div>
                  <div className="font-medium">{user.game || 'Not specified'}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white">
                <div className="h-8 w-8 rounded-md bg-cyber-accent/20 flex items-center justify-center">
                  <svg className="h-4 w-4 text-cyber-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.34 17a10.018 10.018 0 01-.78-2.5c0-.46 2.46-3.47 3.83-5.25.12-.15.46-.59.7-.86 1.30-1.42 2.45-2.19 3.37-2.37.36-.07.76-.08 1.15-.03 1.58.2 2.78.88 3.94 2.24.32.37.65.81.78.96 1.37 1.78 3.82 4.79 3.82 5.25a10.018 10.018 0 01-.78 2.5c-1.58 3.04-4.64 5-8.16 5s-6.58-1.96-8.16-5zm.16-5c0 3.15 1.73 6.29 5 7.66 3.27-1.37 5-4.51 5-7.66 0-2.38-1.19-4.08-2.5-5.37-1.31-1.29-2.92-1.66-3.5-1.63-.58-.03-2.19.33-3.5 1.63-1.31 1.29-2.5 2.99-2.5 5.37z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-white/60">Rank</div>
                  <div className="font-medium">{user.rank || 'Not specified'}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white">
                <div className="h-8 w-8 rounded-md bg-cyber-blue/20 flex items-center justify-center">
                  <svg className="h-4 w-4 text-cyber-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.20 9.20l-0.8-0.8c-0.29-0.29-0.77-0.29-1.06 0l-5.99 6L6.60 11.60c-0.29-0.29-0.77-0.29-1.06 0l-0.8 0.8c-0.29 0.29-0.29 0.77 0 1.06l3.68 3.68c0.29 0.29 0.77 0.29 1.06 0l7.72-7.72C17.49 9.97 17.49 9.49 17.20 9.20z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-white/60">Role</div>
                  <div className="font-medium">{user.role || 'Not specified'}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white">
                <div className="h-8 w-8 rounded-md bg-cyber-glow/20 flex items-center justify-center">
                  <svg className="h-4 w-4 text-cyber-glow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-white/60">Region</div>
                  <div className="font-medium">{user.region || 'Not specified'}</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col space-y-2">
              <Button 
                onClick={() => navigate('/settings')}
                variant="outline"
                className="w-full border-cyber-primary/30 text-white hover:bg-cyber-primary/20 flex items-center justify-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Bio */}
          <div className="cyber-card">
            <h2 className="text-xl font-bold text-white mb-4">About Me</h2>
            <p className="text-white/80">
              {user.bio || 'No bio provided yet. Edit your profile to add a bio.'}
            </p>
          </div>
          
          {/* Recent Matches */}
          <div className="cyber-card">
            <h2 className="text-xl font-bold text-white mb-4">Recent Match Requests</h2>
            
            {/* Empty state */}
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-primary/10 mb-4">
                <Users className="h-8 w-8 text-cyber-primary/70" />
              </div>
              <h3 className="text-white/80 mb-2">No recent matches</h3>
              <p className="text-white/50 text-sm mb-4">Browse players to find your perfect teammates</p>
              <Button 
                onClick={() => navigate('/players')}
                className="bg-cyber-primary/30 border border-cyber-primary/50 hover:bg-cyber-primary/50"
              >
                Find Players
              </Button>
            </div>
          </div>
          
          {/* Recent Messages */}
          <div className="cyber-card">
            <h2 className="text-xl font-bold text-white mb-4">Recent Messages</h2>
            
            {/* Empty state */}
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-primary/10 mb-4">
                <MessageCircle className="h-8 w-8 text-cyber-primary/70" />
              </div>
              <h3 className="text-white/80 mb-2">No messages yet</h3>
              <p className="text-white/50 text-sm mb-4">When you connect with players, your conversations will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
