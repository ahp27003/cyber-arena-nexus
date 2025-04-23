
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
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

interface PlayerCardProps {
  player: Player;
  onSendRequest: () => void;
}

const PlayerCard = ({ player, onSendRequest }: PlayerCardProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleSendRequest = () => {
    setRequestSent(true);
    onSendRequest();
  };
  
  // Calculate the match score label and color
  const getMatchScoreDetails = () => {
    if (player.matchScore === undefined) return { label: 'N/A', color: 'text-white/50' };
    
    if (player.matchScore >= 90) return { label: 'Perfect Match', color: 'text-emerald-400' };
    if (player.matchScore >= 75) return { label: 'Great Match', color: 'text-cyber-primary' };
    if (player.matchScore >= 50) return { label: 'Good Match', color: 'text-cyber-blue' };
    if (player.matchScore >= 25) return { label: 'Fair Match', color: 'text-amber-400' };
    return { label: 'Poor Match', color: 'text-red-400' };
  };
  
  const matchScoreDetails = getMatchScoreDetails();
  
  return (
    <div 
      className={cn(
        "cyber-card relative transition-all duration-300 overflow-hidden group",
        isHovered && "border-cyber-primary/50 shadow-lg shadow-cyber-primary/10 transform -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyber-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-cyber-blue/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Match score indicator */}
      {player.matchScore !== undefined && (
        <div className={cn(
          "absolute -top-3 -right-3 px-3 py-1 rounded-full border text-sm font-semibold z-10 shadow-md transition-all duration-300",
          player.matchScore >= 90 && 'bg-emerald-500/20 border-emerald-500/50 group-hover:bg-emerald-500/30 group-hover:border-emerald-500/70',
          player.matchScore >= 75 && player.matchScore < 90 && 'bg-cyber-primary/20 border-cyber-primary/50 group-hover:bg-cyber-primary/30 group-hover:border-cyber-primary/70',
          player.matchScore >= 50 && player.matchScore < 75 && 'bg-cyber-blue/20 border-cyber-blue/50 group-hover:bg-cyber-blue/30 group-hover:border-cyber-blue/70',
          player.matchScore >= 25 && player.matchScore < 50 && 'bg-amber-500/20 border-amber-500/50 group-hover:bg-amber-500/30 group-hover:border-amber-500/70',
          player.matchScore < 25 && 'bg-red-500/20 border-red-500/50 group-hover:bg-red-500/30 group-hover:border-red-500/70',
        )}>
          <span className={matchScoreDetails.color}>{player.matchScore}% {matchScoreDetails.label}</span>
        </div>
      )}
      
      {/* Player Header */}
      <div className="flex items-center mb-5">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-blue flex items-center justify-center mr-4 shadow-md group-hover:shadow-cyber-primary/30 transition-all duration-300 group-hover:scale-105">
          <span className="font-bold text-white text-lg">{player.gamerTag.charAt(0).toUpperCase()}</span>
        </div>
        
        <div className="flex-1 min-w-0"> {/* Prevent text overflow */}
          <h2 className="text-xl font-bold text-white truncate">{player.gamerTag}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-white/60 text-xs">Last active: {player.lastActive}</span>
            {player.lookingForTeammate && (
              <span className="px-2 py-0.5 bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/30 rounded-full text-xs whitespace-nowrap group-hover:bg-cyber-primary/30 transition-colors duration-300">Looking for teammates</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Player Info Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5 bg-cyber-darker/30 p-3 rounded-md border border-cyber-primary/10 group-hover:border-cyber-primary/20 transition-all duration-300">
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-2 w-10">Game:</span>
          <span className="text-white truncate">{player.game}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-2 w-10">Rank:</span>
          <span className="text-white truncate">{player.rank}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-2 w-10">Role:</span>
          <span className="text-white truncate">{player.role}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-2 w-10">Region:</span>
          <span className="text-white truncate">{player.region}</span>
        </div>
      </div>
      
      {/* Bio */}
      <div className="mb-5 bg-cyber-darker/20 p-3 rounded-md border border-cyber-primary/5 group-hover:border-cyber-primary/15 transition-all duration-300">
        <h3 className="text-xs text-white/60 mb-1">Bio</h3>
        <p className="text-white/80 text-sm line-clamp-2">{player.bio}</p>
      </div>
      
      {/* Actions */}
      <div className="flex space-x-3">
        <Button
          onClick={handleSendRequest}
          disabled={requestSent}
          className={cn(
            "flex-1 text-sm py-2 transition-all duration-300",
            requestSent 
              ? "bg-cyber-primary/10 text-cyber-primary/50 border-cyber-primary/20 cursor-not-allowed" 
              : "bg-cyber-primary/20 border border-cyber-primary/40 hover:bg-cyber-primary/40 hover:border-cyber-primary/60 hover:shadow-md hover:shadow-cyber-primary/20"
          )}
        >
          {requestSent ? (
            <>Request Sent</>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Send Request
            </>
          )}
        </Button>
        
        <Link
          to={`/messages/${player.id}`}
          className="cyber-button flex items-center justify-center p-2 hover:bg-cyber-primary/30 hover:border-cyber-primary/50 transition-all duration-300 hover:shadow-md hover:shadow-cyber-primary/20"
        >
          <MessageCircle className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;
