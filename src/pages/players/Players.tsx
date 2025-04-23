
import { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { toast } from 'sonner';
import PlayerCard from './PlayerCard';

// Define the player interface with matchScore property
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
  matchScore?: number; // Added optional matchScore property
}

// Sample mock player data
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
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('All Games');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [lookingForTeammateOnly, setLookingForTeammateOnly] = useState(false);
  
  // Get current user
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Calculate match score between current user and another player
  const calculateMatchScore = (player: Player) => {
    if (player.id === currentUser.id) return 0;
    if (player.game !== currentUser.game) return 0;
    
    // Basic scoring algorithm
    let score = 100;
    
    // Rank differences affect score
    const getRankValue = (rank: string) => {
      // This is a simplified version - in a real app we'd have a proper rank value system for each game
      const ranks = [
        'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger', 'Immortal', 'Radiant'
      ];
      return ranks.indexOf(rank);
    };
    
    const playerRankValue = getRankValue(player.rank);
    const currentUserRankValue = getRankValue(currentUser.rank || '');
    
    if (playerRankValue !== -1 && currentUserRankValue !== -1) {
      // Subtract 5 points for each rank difference
      const rankDiff = Math.abs(playerRankValue - currentUserRankValue);
      score -= rankDiff * 5;
    }
    
    // Same region bonus
    if (player.region === currentUser.region) {
      score += 10;
    }
    
    // Same role penalty (usually want complementary roles)
    if (player.role === currentUser.role) {
      score -= 15;
    }
    
    // Ensure score doesn't go below 0
    return Math.max(0, score);
  };

  useEffect(() => {
    // Apply filters
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let results = [...players];
      
      // Apply search filter
      if (searchQuery) {
        results = results.filter(player => 
          player.gamerTag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply game filter
      if (gameFilter !== 'All Games') {
        results = results.filter(player => player.game === gameFilter);
      }
      
      // Apply region filter
      if (regionFilter !== 'All Regions') {
        results = results.filter(player => player.region === regionFilter);
      }
      
      // Apply "looking for teammate" filter
      if (lookingForTeammateOnly) {
        results = results.filter(player => player.lookingForTeammate);
      }
      
      // Calculate match scores
      results = results.map(player => ({
        ...player,
        matchScore: calculateMatchScore(player)
      }));
      
      // Sort by match score (descending)
      results.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      
      setFilteredPlayers(results);
      setLoading(false);
    }, 500);
  }, [searchQuery, gameFilter, regionFilter, lookingForTeammateOnly, players]);
  
  const handleSendRequest = (playerId: string) => {
    toast.success(`Match request sent to player #${playerId}`);
    // In a real app, we'd send this to the API
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2 neon-text">Find Players</h1>
      <p className="text-white/70 mb-8">Connect with other players who match your skill level and interests</p>
      
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search gamers by tag..."
              className="cyber-input w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter toggle button */}
          <button
            onClick={toggleFilters}
            className="cyber-button flex items-center justify-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
        
        {/* Extended filters */}
        {showFilters && (
          <div className="cyber-panel p-6 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Game filter */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Game</label>
                <select
                  className="cyber-input w-full"
                  value={gameFilter}
                  onChange={(e) => setGameFilter(e.target.value)}
                >
                  {GAMES.map((game) => (
                    <option key={game} value={game}>{game}</option>
                  ))}
                </select>
              </div>
              
              {/* Region filter */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Region</label>
                <select
                  className="cyber-input w-full"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              {/* Looking for teammate filter */}
              <div className="flex items-center space-x-3 h-full pt-8">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={lookingForTeammateOnly} 
                    onChange={() => setLookingForTeammateOnly(!lookingForTeammateOnly)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-cyber-dark peer-checked:bg-cyber-primary/30 rounded-full 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
                                after:w-5 after:transition-all peer-checked:after:bg-cyber-primary"></div>
                </label>
                <span className="text-white/90">Looking for teammate</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Player grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse-glow w-12 h-12 border-4 border-cyber-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard 
              key={player.id}
              player={player}
              onSendRequest={() => handleSendRequest(player.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-primary/10 mb-4">
            <Filter className="h-8 w-8 text-cyber-primary/70" />
          </div>
          <h3 className="text-white/80 mb-2">No players found</h3>
          <p className="text-white/50">Try changing your filters to see more players</p>
        </div>
      )}
    </div>
  );
};

export default Players;
