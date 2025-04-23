
import { ArrowRight, Users, MessageSquare, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-cyber-darker overflow-hidden relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5" />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyber-primary via-cyber-blue to-cyber-accent bg-clip-text text-transparent animate-background-shine">
              Find Your Perfect Gaming Teammate
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8">
              Connect with skilled players, form elite teams, and dominate the competitive scene together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-cyber-primary hover:bg-cyber-primary/80 text-white px-8 py-6 text-lg"
              >
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-cyber-primary/30 hover:bg-cyber-primary/10 text-white px-8 py-6 text-lg"
              >
                <Link to="/players">Browse Players</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-cyber-darker to-cyber-dark">
        <div className="container mx-auto px-4 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="cyber-card group hover:border-cyber-primary/40 transition-all duration-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4 group-hover:bg-cyber-primary/30 transition-colors">
                  <Users className="text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Matchmaking</h3>
                <p className="text-white/60">
                  Find players that match your skill level, playstyle, and gaming schedule.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="cyber-card group hover:border-cyber-primary/40 transition-all duration-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4 group-hover:bg-cyber-primary/30 transition-colors">
                  <MessageSquare className="text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Chat</h3>
                <p className="text-white/60">
                  Communicate seamlessly with potential teammates through our built-in chat system.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="cyber-card group hover:border-cyber-primary/40 transition-all duration-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4 group-hover:bg-cyber-primary/30 transition-colors">
                  <Shield className="text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Verified Profiles</h3>
                <p className="text-white/60">
                  Trust our community with verified ranks and authenticated gaming profiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
