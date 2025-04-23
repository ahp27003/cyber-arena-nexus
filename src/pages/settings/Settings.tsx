
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Edit, User, Moon, Sun, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

interface UserSettings {
  gamerTag: string;
  game: string;
  rank: string;
  role: string;
  region: string;
  bio: string;
  lookingForTeammate: boolean;
  darkMode: boolean;
}

const GAMES = ['League of Legends', 'Valorant', 'CS:GO', 'Dota 2', 'Overwatch', 'Apex Legends', 'Fortnite'];
const REGIONS = ['NA', 'EU', 'ASIA', 'OCE', 'LATAM', 'BR'];

const RANKS = {
  'League of Legends': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  'Valorant': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Immortal', 'Radiant'],
  'CS:GO': ['Silver I', 'Silver II', 'Gold Nova', 'Master Guardian', 'Legendary Eagle', 'Supreme', 'Global Elite'],
  'Dota 2': ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'],
  'Overwatch': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'],
  'Apex Legends': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'],
  'Fortnite': ['Open League', 'Contender League', 'Champion League']
};

const ROLES = {
  'League of Legends': ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
  'Valorant': ['Duelist', 'Initiator', 'Controller', 'Sentinel'],
  'CS:GO': ['Entry Fragger', 'AWPer', 'Support', 'In-game Leader', 'Lurker'],
  'Dota 2': ['Carry', 'Midlane', 'Offlane', 'Soft Support', 'Hard Support'],
  'Overwatch': ['Tank', 'Damage', 'Support'],
  'Apex Legends': ['Assault', 'Skirmisher', 'Recon', 'Controller', 'Support'],
  'Fortnite': ['Builder', 'Fragger', 'IGL', 'Support']
};

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    gamerTag: '',
    game: '',
    rank: '',
    role: '',
    region: '',
    bio: '',
    lookingForTeammate: false,
    darkMode: true // Default to dark mode
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Load user data on component mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setSettings({
          gamerTag: parsedUser.gamerTag || '',
          game: parsedUser.game || '',
          rank: parsedUser.rank || '',
          role: parsedUser.role || '',
          region: parsedUser.region || '',
          bio: parsedUser.bio || '',
          lookingForTeammate: parsedUser.lookingForTeammate || false,
          darkMode: true // Default to dark mode
        });
      }
    } catch (error) {
      console.error('Error loading user settings', error);
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const game = e.target.value;
    setSettings(prev => ({
      ...prev,
      game,
      rank: '',
      role: ''
    }));
  };
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Validate form
      if (!settings.gamerTag) {
        toast.error('Gamer tag is required');
        setIsSaving(false);
        return;
      }
      
      // In a real app, we would make an API call here
      // For this demo, we'll update localStorage
      
      // Get existing user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Update with new settings
      const updatedUser = {
        ...userData,
        gamerTag: settings.gamerTag,
        game: settings.game,
        rank: settings.rank,
        role: settings.role,
        region: settings.region,
        bio: settings.bio,
        lookingForTeammate: settings.lookingForTeammate
      };
      
      // Save updated user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleToggleDarkMode = () => {
    // Toggle dark mode
    document.documentElement.classList.toggle('light');
    setIsDarkMode(!isDarkMode);
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };
  
  const handleDeleteAccount = async () => {
    try {
      // In a real app, we would make an API call here
      // For this demo, we'll clear localStorage
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear user data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      toast.success('Account deleted successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account', error);
      toast.error('Failed to delete account');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-6 neon-text">Settings</h1>
      
      <div className="space-y-8">
        {/* Profile Settings Section */}
        <div className="cyber-card">
          <div className="flex items-center mb-6">
            <User className="h-5 w-5 text-cyber-primary mr-2" />
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gamer Tag */}
              <div>
                <Label htmlFor="gamerTag" className="text-white/80 mb-2">
                  Gamer Tag
                </Label>
                <input
                  id="gamerTag"
                  name="gamerTag"
                  type="text"
                  value={settings.gamerTag}
                  onChange={handleInputChange}
                  className="cyber-input w-full"
                  placeholder="Your gamer tag"
                />
              </div>
              
              {/* Region */}
              <div>
                <Label htmlFor="region" className="text-white/80 mb-2">
                  Region
                </Label>
                <select
                  id="region"
                  name="region"
                  value={settings.region}
                  onChange={handleInputChange}
                  className="cyber-input w-full"
                >
                  <option value="">Select Region</option>
                  {REGIONS.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              {/* Game */}
              <div>
                <Label htmlFor="game" className="text-white/80 mb-2">
                  Game
                </Label>
                <select
                  id="game"
                  name="game"
                  value={settings.game}
                  onChange={handleGameChange}
                  className="cyber-input w-full"
                >
                  <option value="">Select Game</option>
                  {GAMES.map(game => (
                    <option key={game} value={game}>{game}</option>
                  ))}
                </select>
              </div>
              
              {/* Rank - only available if game is selected */}
              <div>
                <Label htmlFor="rank" className="text-white/80 mb-2">
                  Rank
                </Label>
                <select
                  id="rank"
                  name="rank"
                  value={settings.rank}
                  onChange={handleInputChange}
                  disabled={!settings.game}
                  className="cyber-input w-full"
                >
                  <option value="">Select Rank</option>
                  {settings.game && RANKS[settings.game as keyof typeof RANKS]?.map(rank => (
                    <option key={rank} value={rank}>{rank}</option>
                  ))}
                </select>
              </div>
              
              {/* Role - only available if game is selected */}
              <div>
                <Label htmlFor="role" className="text-white/80 mb-2">
                  Role
                </Label>
                <select
                  id="role"
                  name="role"
                  value={settings.role}
                  onChange={handleInputChange}
                  disabled={!settings.game}
                  className="cyber-input w-full"
                >
                  <option value="">Select Role</option>
                  {settings.game && ROLES[settings.game as keyof typeof ROLES]?.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Bio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="bio" className="text-white/80">
                  Bio
                </Label>
                <span className="text-xs text-white/50">{settings.bio?.length || 0}/280</span>
              </div>
              <textarea
                id="bio"
                name="bio"
                value={settings.bio}
                onChange={handleInputChange}
                maxLength={280}
                className="cyber-input w-full h-24 resize-none"
                placeholder="Tell other players about yourself..."
              />
            </div>
            
            {/* Looking for teammate switch */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lookingForTeammate" className="text-white/80">
                  Looking for Teammates
                </Label>
                <p className="text-xs text-white/50">Show others you're available to team up</p>
              </div>
              <Switch
                id="lookingForTeammate"
                checked={settings.lookingForTeammate}
                onCheckedChange={(checked) => handleSwitchChange('lookingForTeammate', checked)}
                className="data-[state=checked]:bg-cyber-primary"
              />
            </div>
          </div>
        </div>
        
        {/* Appearance Settings */}
        <div className="cyber-card">
          <div className="flex items-center mb-6">
            {isDarkMode ? (
              <Moon className="h-5 w-5 text-cyber-primary mr-2" />
            ) : (
              <Sun className="h-5 w-5 text-cyber-accent mr-2" />
            )}
            <h2 className="text-xl font-bold text-white">Appearance</h2>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="darkMode" className="text-white/80">
                  Dark Mode
                </Label>
                <p className="text-xs text-white/50">Toggle between dark and light theme</p>
              </div>
              <Switch
                id="darkMode"
                checked={isDarkMode}
                onCheckedChange={handleToggleDarkMode}
                className="data-[state=checked]:bg-cyber-primary"
              />
            </div>
          </div>
        </div>
        
        {/* Danger Zone */}
        <div className="cyber-card border border-red-500/30">
          <div className="flex items-center mb-6">
            <Trash className="h-5 w-5 text-red-500 mr-2" />
            <h2 className="text-xl font-bold text-white">Danger Zone</h2>
          </div>
          
          <div>
            <p className="text-white/70 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-cyber-primary/30 border border-cyber-primary/50 hover:bg-cyber-primary/50 px-6 py-2"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
      
      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="cyber-card max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Account</h3>
            <p className="text-white/80 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                className="border-white/20 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
