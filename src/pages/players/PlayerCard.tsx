
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
    <div className="cyber-card relative">
      {/* Match score indicator */}
      {player.matchScore !== undefined && (
        <div className={cn(
          "absolute -top-3 -right-3 px-3 py-1 rounded-full border text-sm font-semibold",
          player.matchScore >= 90 && 'bg-emerald-500/20 border-emerald-500/50',
          player.matchScore >= 75 && player.matchScore < 90 && 'bg-cyber-primary/20 border-cyber-primary/50',
          player.matchScore >= 50 && player.matchScore < 75 && 'bg-cyber-blue/20 border-cyber-blue/50',
          player.matchScore >= 25 && player.matchScore < 50 && 'bg-amber-500/20 border-amber-500/50',
          player.matchScore < 25 && 'bg-red-500/20 border-red-500/50',
        )}>
          <span className={matchScoreDetails.color}>{player.matchScore}% {matchScoreDetails.label}</span>
        </div>
      )}
      
      {/* Player Header */}
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-blue flex items-center justify-center mr-4">
          <span className="font-bold text-white">{player.gamerTag.charAt(0).toUpperCase()}</span>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-white">{player.gamerTag}</h2>
          <div className="flex items-center">
            <span className="text-white/60 text-xs">Last active: {player.lastActive}</span>
            {player.lookingForTeammate && (
              <span className="ml-2 px-2 py-0.5 bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/30 rounded-full text-xs">Looking for teammates</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Player Info Grid */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-1">Game:</span>
          <span className="text-white">{player.game}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-1">Rank:</span>
          <span className="text-white">{player.rank}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-1">Role:</span>
          <span className="text-white">{player.role}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/60 text-xs mr-1">Region:</span>
          <span className="text-white">{player.region}</span>
        </div>
      </div>
      
      {/* Bio */}
      <div className="mb-4">
        <p className="text-white/80 text-sm line-clamp-2">{player.bio}</p>
      </div>
      
      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          onClick={handleSendRequest}
          disabled={requestSent}
          className={cn(
            "flex-1 text-sm",
            requestSent 
              ? "bg-cyber-primary/10 text-cyber-primary/50 border-cyber-primary/20 cursor-not-allowed" 
              : "bg-cyber-primary/30 border border-cyber-primary/50 hover:bg-cyber-primary/50"
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
          className="cyber-button flex items-center justify-center"
        >
          <MessageCircle className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;
