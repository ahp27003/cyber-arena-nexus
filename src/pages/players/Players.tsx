import { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { toast } from 'sonner';
import PlayerCard from './PlayerCard';
import { Button } from '@/components/ui/button';

interface Player {
  id: string;
  gamerTag: string;
  game: string;
  rank: string;
  role: string;
  region: string;
  bio: string;
  lookingForTeammate: boolean;
  lastActive: string;
  matchScore?: number;
}

const MOCK_PLAYERS: Player[] = [
  {
    id: '1',
    gamerTag: 'NeonBlade',
    game: 'Valorant',
    rank: 'Diamond',
    role: 'Duelist',
    region: 'NA',
    bio: 'Competitive Valorant player looking for a team to grind ranked with. I main Jett and Reyna.',
    lookingForTeammate: true,
    lastActive: '2 mins ago'
  },
  {
    id: '2',
    gamerTag: 'PixelWarrior',
    game: 'Apex Legends',
    rank: 'Master',
    role: 'Assault',
    region: 'EU',
    bio: 'Day 1 Apex player with multiple 20 bombs. Looking for consistent squad to push Predator.',
    lookingForTeammate: true,
    lastActive: '5 mins ago'
  },
  {
    id: '3',
    gamerTag: 'StormRider',
    game: 'League of Legends',
    rank: 'Platinum',
    role: 'Mid',
    region: 'NA',
    bio: 'Mid main since season 3. Looking for clash team and duo partner.',
    lookingForTeammate: true,
    lastActive: '20 mins ago'
  },
  {
    id: '4',
    gamerTag: 'ShadowBeast',
    game: 'CS:GO',
    rank: 'Legendary Eagle',
    role: 'AWPer',
    region: 'EU',
    bio: 'AWPer with 10+ years of experience. Looking for serious team to compete in tournaments.',
    lookingForTeammate: true,
    lastActive: '1 hour ago'
  },
  {
    id: '5',
    gamerTag: 'VoidWalker',
    game: 'Valorant',
    rank: 'Immortal',
    role: 'Controller',
    region: 'ASIA',
    bio: 'Viper/Brimstone main with great utility usage. Looking for a team to climb ranked.',
    lookingForTeammate: true,
    lastActive: '3 hours ago'
  },
  {
    id: '6',
    gamerTag: 'FrostGiant',
    game: 'Dota 2',
    rank: 'Ancient',
    role: 'Hard Support',
    region: 'NA',
    bio: 'Position 5 player who loves warding and saving carries. Looking for a stack to grind MMR.',
    lookingForTeammate: true,
    lastActive: '5 hours ago'
  }
];

const GAMES = ['All Games', 'Valorant', 'League of Legends', 'CS:GO', 'Dota 2', 'Apex Legends', 'Overwatch', 'Fortnite'];
const REGIONS = ['All Regions', 'NA', 'EU', 'ASIA', 'OCE', 'LATAM', 'BR'];

interface PlayersProps {}

const Players = ({}: PlayersProps) => {
  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(MOCK_PLAYERS);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [animateFilters, setAnimateFilters] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('All Games');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [lookingForTeammateOnly, setLookingForTeammateOnly] = useState(false);
  
  // Get current user from localStorage or use empty object if not found
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  const calculateMatchScore = (player: Player) => {
    if (player.id === currentUser.id) return 0;
    if (player.game !== currentUser.game) return 0;
    
    let score = 100;
    
    const getRankValue = (rank: string) => {
      const ranks = [
        'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger', 'Immortal', 'Radiant'
      ];
      return ranks.indexOf(rank);
    };
    
    const playerRankValue = getRankValue(player.rank);
    const currentUserRankValue = getRankValue(currentUser.rank || '');
    
    if (playerRankValue !== -1 && currentUserRankValue !== -1) {
      const rankDiff = Math.abs(playerRankValue - currentUserRankValue);
      score -= rankDiff * 5;
    }
    
    if (player.region === currentUser.region) {
      score += 10;
    }
    
    if (player.role === currentUser.role) {
      score -= 15;
    }
    
    return Math.max(0, score);
  };

  // Apply filters when any filter changes
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timeoutId = setTimeout(() => {
      let filtered = [...players];
      
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(player => 
          player.gamerTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply game filter
      if (gameFilter !== 'All Games') {
        filtered = filtered.filter(player => player.game === gameFilter);
      }
      
      // Apply region filter
      if (regionFilter !== 'All Regions') {
        filtered = filtered.filter(player => player.region === regionFilter);
      }
      
      // Apply looking for teammate filter
      if (lookingForTeammateOnly) {
        filtered = filtered.filter(player => player.lookingForTeammate);
      }
      
      // Calculate match scores if user has game preference
      if (currentUser && currentUser.game) {
        filtered = filtered.map(player => ({
          ...player,
          matchScore: calculateMatchScore(player)
        }));
        
        // Sort by match score (highest first)
        filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      }
      
      setFilteredPlayers(filtered);
      setLoading(false);
    }, 500);
    
    // Clean up timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, gameFilter, regionFilter, lookingForTeammateOnly]);
  
  useEffect(() => {
    if (showFilters) {
      // Small delay to ensure animation plays
      setTimeout(() => setAnimateFilters(true), 50);
    } else {
      setAnimateFilters(false);
    }
  }, [showFilters]);
  
  const handleSendRequest = (playerId: string) => {
    toast.success(`Match request sent to player #${playerId}`);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Reset all filters to default
  const resetFilters = () => {
    setSearchQuery('');
    setGameFilter('All Games');
    setRegionFilter('All Regions');
    setLookingForTeammateOnly(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyber-primary/5 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyber-blue/5 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-cyber-primary to-white bg-clip-text text-transparent inline-block">
            Find Players
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto md:mx-0">
            Connect with players that match your skill level and preferences
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8 cyber-panel p-6 border-cyber-primary/30 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-cyber-primary transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search by gamer tag, game, rank, or role..."
                className="cyber-input w-full pl-10 focus:border-cyber-primary/50 focus:shadow-md focus:shadow-cyber-primary/10 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={toggleFilters}
                variant="outline"
                className="cyber-button flex items-center justify-center gap-2 hover:bg-cyber-primary/20 hover:border-cyber-primary/40 transition-all duration-300"
              >
                <Filter className="h-5 w-5" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              {(searchQuery || gameFilter !== 'All Games' || regionFilter !== 'All Regions' || lookingForTeammateOnly) && (
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="cyber-button flex items-center justify-center gap-2 bg-cyber-dark/50 hover:bg-cyber-primary/20 transition-all duration-300"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
          
          {/* Filters Panel - with animation */}
          {showFilters && (
            <div className={`cyber-panel p-6 mt-4 border-cyber-primary/20 transition-all duration-500 ${animateFilters ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Game</label>
                  <select
                    className="cyber-input w-full focus:border-cyber-primary/50 focus:shadow-md focus:shadow-cyber-primary/10 transition-all duration-300"
                    value={gameFilter}
                    onChange={(e) => setGameFilter(e.target.value)}
                  >
                    {GAMES.map((game) => (
                      <option key={game} value={game}>{game}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Region</label>
                  <select
                    className="cyber-input w-full focus:border-cyber-primary/50 focus:shadow-md focus:shadow-cyber-primary/10 transition-all duration-300"
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                  >
                    {REGIONS.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={lookingForTeammateOnly} 
                      onChange={() => setLookingForTeammateOnly(!lookingForTeammateOnly)} 
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-cyber-dark/80 peer-checked:bg-cyber-primary/30 rounded-full 
                                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
                                  after:w-5 after:transition-all peer-checked:after:bg-cyber-primary
                                  group-hover:after:scale-110 transition-all duration-300"></div>
                    <span className="ml-3 text-white/90 group-hover:text-white transition-colors duration-300">Looking for teammate</span>
                  </label>
                </div>
              </div>
              
              {/* Active filters summary */}
              <div className="mt-4 pt-4 border-t border-cyber-primary/10 flex flex-wrap gap-2">
                <span className="text-white/60 text-sm">Active filters:</span>
                {gameFilter !== 'All Games' && (
                  <span className="text-xs px-2 py-1 bg-cyber-primary/20 text-cyber-primary rounded-full">
                    Game: {gameFilter}
                  </span>
                )}
                {regionFilter !== 'All Regions' && (
                  <span className="text-xs px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full">
                    Region: {regionFilter}
                  </span>
                )}
                {lookingForTeammateOnly && (
                  <span className="text-xs px-2 py-1 bg-cyber-accent/20 text-cyber-accent rounded-full">
                    Looking for teammates
                  </span>
                )}
                {searchQuery && (
                  <span className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full">
                    Search: "{searchQuery}"
                  </span>
                )}
                {gameFilter === 'All Games' && regionFilter === 'All Regions' && !lookingForTeammateOnly && !searchQuery && (
                  <span className="text-xs text-white/40">None</span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Results count and sorting options */}
        {!loading && filteredPlayers.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-white/70">
              <span className="text-cyber-primary font-semibold">{filteredPlayers.length}</span> players found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Sort by:</span>
              <select className="bg-cyber-dark/50 border border-cyber-primary/20 text-white/80 rounded-md px-2 py-1 text-sm">
                <option>Match Score</option>
                <option>Recently Active</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Results Section */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-pulse-glow w-16 h-16 border-4 border-cyber-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cyber-primary/80 animate-pulse">Finding players...</p>
          </div>
        ) : filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredPlayers.map((player, index) => (
              <div 
                key={player.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PlayerCard 
                  player={player}
                  onSendRequest={() => handleSendRequest(player.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="cyber-panel p-12 text-center my-12 border-cyber-primary/20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyber-primary/10 mb-6 animate-pulse">
              <Filter className="h-10 w-10 text-cyber-primary/70" />
            </div>
            <h3 className="text-2xl font-semibold text-white/80 mb-3">No players found</h3>
            <p className="text-white/60 max-w-md mx-auto mb-6">We couldn't find any players matching your current filters.</p>
            <Button 
              onClick={resetFilters}
              className="bg-cyber-primary/20 border border-cyber-primary/40 hover:bg-cyber-primary/30 transition-all duration-300"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
