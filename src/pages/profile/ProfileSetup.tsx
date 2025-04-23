
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const GAMES = ['League of Legends', 'Valorant', 'CS:GO', 'Dota 2', 'Overwatch', 'Apex Legends', 'Fortnite'];

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

const REGIONS = ['NA', 'EU', 'ASIA', 'OCE', 'LATAM', 'BR'];

interface ProfileSetupProps {}

const ProfileSetup = ({}: ProfileSetupProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [bio, setBio] = useState('');
  const [lookingForTeammate, setLookingForTeammate] = useState(false);
  
  const handleNext = () => {
    // Validate current step
    if (activeStep === 0 && !selectedGame) {
      toast.error('Please select a game to continue');
      return;
    }
    
    if (activeStep === 1 && !selectedRank) {
      toast.error('Please select your rank to continue');
      return;
    }
    
    if (activeStep === 2 && !selectedRole) {
      toast.error('Please select your role to continue');
      return;
    }
    
    if (activeStep === 3 && !selectedRegion) {
      toast.error('Please select your region to continue');
      return;
    }
    
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      completeSetup();
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const completeSetup = () => {
    // In a real app, we would make an API call to save the profile
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Update user with profile data
      const updatedUser = {
        ...user,
        game: selectedGame,
        rank: selectedRank,
        role: selectedRole,
        region: selectedRegion,
        bio,
        lookingForTeammate,
        profileSetupCompleted: true
      };
      
      // Save updated user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile setup completed!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to save profile data');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="cyber-card">
          <h1 className="text-2xl md:text-3xl font-bold text-white neon-text text-center mb-6">
            Set Up Your Profile
          </h1>
          
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            {[0, 1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`flex-1 h-1 mx-1 rounded-full transition-all ${
                  step <= activeStep ? 'bg-cyber-primary' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          
          {/* Step 1: Select Game */}
          {activeStep === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium text-white mb-4">What game do you play?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GAMES.map((game) => (
                  <button
                    key={game}
                    onClick={() => setSelectedGame(game)}
                    className={`cyber-panel p-4 flex items-center transition-all ${
                      selectedGame === game ? 'border-cyber-primary neon-border' : 'hover:border-cyber-primary/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded bg-cyber-primary/20 flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-cyber-primary">{game.charAt(0)}</span>
                    </div>
                    <span className="text-white">{game}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Select Rank */}
          {activeStep === 1 && selectedGame && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium text-white mb-4">What's your rank in {selectedGame}?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {RANKS[selectedGame as keyof typeof RANKS]?.map((rank) => (
                  <button
                    key={rank}
                    onClick={() => setSelectedRank(rank)}
                    className={`cyber-panel p-4 flex items-center justify-center transition-all ${
                      selectedRank === rank ? 'border-cyber-primary neon-border' : 'hover:border-cyber-primary/30'
                    }`}
                  >
                    <span className="text-white">{rank}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 3: Select Role */}
          {activeStep === 2 && selectedGame && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium text-white mb-4">What role do you play?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ROLES[selectedGame as keyof typeof ROLES]?.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`cyber-panel p-4 flex items-center justify-center transition-all ${
                      selectedRole === role ? 'border-cyber-primary neon-border' : 'hover:border-cyber-primary/30'
                    }`}
                  >
                    <span className="text-white">{role}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 4: Select Region */}
          {activeStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium text-white mb-4">What region do you play in?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`cyber-panel p-4 flex items-center justify-center transition-all ${
                      selectedRegion === region ? 'border-cyber-primary neon-border' : 'hover:border-cyber-primary/30'
                    }`}
                  >
                    <span className="text-white">{region}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 5: Bio & Preferences */}
          {activeStep === 4 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-xl font-medium text-white mb-2">Your Bio</h2>
                <p className="text-white/60 text-sm mb-3">Tell other players about yourself (max 280 chars)</p>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 280))}
                  placeholder="Hi! I'm a competitive player looking for teammates who communicate well and want to climb the ranks!"
                  className="cyber-input w-full h-32 resize-none"
                  maxLength={280}
                />
                <div className="text-right text-xs text-white/60 mt-1">
                  {bio.length}/280
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Looking for Teammate</h3>
                  <p className="text-sm text-white/60">Show others you're looking to team up</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={lookingForTeammate} 
                    onChange={() => setLookingForTeammate(!lookingForTeammate)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-cyber-dark peer-checked:bg-cyber-primary/30 rounded-full 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
                                after:w-5 after:transition-all peer-checked:after:bg-cyber-primary"></div>
                </label>
              </div>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              onClick={handleBack} 
              variant="outline"
              disabled={activeStep === 0}
              className="border-cyber-primary/30 text-white hover:bg-cyber-primary/20"
            >
              Back
            </Button>
            
            <Button 
              onClick={handleNext}
              className="bg-cyber-primary/30 border border-cyber-primary/50 hover:bg-cyber-primary/50"
            >
              {activeStep === 4 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
