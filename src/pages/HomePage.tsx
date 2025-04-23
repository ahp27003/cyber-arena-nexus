
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Gamepad, Users, Trophy, MessageCircle } from 'lucide-react';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-cyber-darker overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        
        {/* Header Navigation */}
        <nav className="container mx-auto flex items-center justify-between py-6 px-6 relative z-10">
          <div className="flex items-center">
            <Gamepad className="h-8 w-8 text-cyber-primary mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyber-primary via-cyber-blue to-cyber-accent bg-clip-text text-transparent animate-background-shine">
              CYBER NEXUS
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-cyber-primary transition-colors duration-300">
              Features
            </a>
            <a href="#community" className="text-white/80 hover:text-cyber-primary transition-colors duration-300">
              Community
            </a>
            <Link to="/login" className="text-white/80 hover:text-cyber-primary transition-colors duration-300">
              Login
            </Link>
            <Link to="/register">
              <Button variant="default" className="bg-cyber-primary hover:bg-cyber-primary/90">
                Register Now
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Link to="/login">
              <Button variant="outline" className="border-cyber-primary/30 text-cyber-primary">
                Login
              </Button>
            </Link>
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="container mx-auto px-6 pt-12 pb-24">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyber-primary via-cyber-blue to-cyber-accent bg-clip-text text-transparent animate-background-shine">
              Find Your Perfect Gaming Team
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
              Connect with skilled players, form elite teams, and dominate the competitive scene together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-cyber-primary hover:bg-cyber-primary/80 text-white px-8 py-6 text-lg">
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-cyber-primary/30 hover:bg-cyber-primary/10 text-white px-8 py-6 text-lg">
                <Link to="/app/players">
                  Browse Players
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyber-darker to-transparent"></div>
      </header>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-cyber-darker to-cyber-dark relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-white via-cyber-primary/90 to-white bg-clip-text text-transparent">
              Elite Gaming Features
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Everything you need to build your dream team and dominate the competition.
            </p>
          </div>
          
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
                  <MessageCircle className="text-cyber-primary" />
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
      </section>
      
      {/* Community Section */}
      <section id="community" className="py-24 bg-cyber-dark relative">
        <div className="absolute inset-0 cyber-grid-bg opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-white via-cyber-accent/90 to-white bg-clip-text text-transparent">
              Join Our Elite Community
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Connect with thousands of gamers ready to team up and dominate.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-cyber-darker/50 border border-cyber-primary/20 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-y-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyber-primary mb-2">10k+</div>
                <p className="text-sm text-white/60">Active Players</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyber-primary mb-2">5k+</div>
                <p className="text-sm text-white/60">Teams Formed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyber-primary mb-2">20+</div>
                <p className="text-sm text-white/60">Supported Games</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-cyber-accent hover:bg-cyber-accent/80 text-white px-8 py-6 text-lg">
                <Link to="/register">
                  Join Now
                  <Trophy className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-cyber-darker border-t border-cyber-primary/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Gamepad className="h-6 w-6 text-cyber-primary mr-2" />
              <span className="text-xl font-bold text-cyber-primary">CYBER NEXUS</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-8 items-center">
              <Link to="/login" className="text-white/60 hover:text-cyber-primary mb-4 md:mb-0">Login</Link>
              <Link to="/register" className="text-white/60 hover:text-cyber-primary mb-4 md:mb-0">Register</Link>
              <a href="#features" className="text-white/60 hover:text-cyber-primary mb-4 md:mb-0">Features</a>
              <a href="#community" className="text-white/60 hover:text-cyber-primary">Community</a>
            </div>
          </div>
          
          <div className="border-t border-cyber-primary/10 mt-8 pt-8 text-center text-white/40 text-sm">
            <p>© 2025 Cyber Arena Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
