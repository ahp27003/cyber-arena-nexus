
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Gamepad, Users, Trophy, MessageCircle, ChevronDown, Twitter, Star } from 'lucide-react';

// Dummy data for testimonials and live activity
const testimonials = [
  {
    name: 'ShadowStriker',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Found my dream team here! The matchmaking is next-level.',
    rating: 5,
  },
  {
    name: 'PixelQueen',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'The community is super positive and helpful. Love the design!',
    rating: 5,
  },
  {
    name: 'NeoSamurai',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    text: 'Real-time chat and verified profiles make teaming up easy.',
    rating: 4,
  },
];

const liveActivity = [
  'RogueWolf joined "Valorant Vipers"',
  'PixelQueen earned "MVP" badge',
  'NeoSamurai started a new team',
  'ShadowStriker sent a team invite',
  'BlazeRunner reached Diamond rank',
];

// Error Boundary for debugging
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<null | Error>(null);
  return error ? (
    <div style={{ color: 'red', padding: 20 }}>
      <h2>Something went wrong in HomePage.</h2>
      <pre>{error.message}</pre>
    </div>
  ) : (
    <ErrorCatcher onError={setError}>{children}</ErrorCatcher>
  );
}

class ErrorCatcher extends React.Component<{ onError: (e: Error) => void, children: React.ReactNode }> {
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }
  render() {
    return this.props.children;
  }
}

const HomePage = () => {
  // Debug output to confirm render
  console.log('HomePage rendered');
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activityIdx, setActivityIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const featuresRef = useRef<HTMLElement>(null);

  // Animate activity ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIdx((idx) => (idx + 1) % liveActivity.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((idx) => (idx + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-cyber-darker overflow-x-hidden relative">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        
        {/* Header Navigation */}
        <nav className={`container mx-auto flex items-center justify-between py-6 px-6 relative z-10 transition-all duration-300 ${scrolled ? 'bg-cyber-darker/80 backdrop-blur-md fixed top-0 left-0 right-0 shadow-lg' : ''}`}>
          <div className="flex items-center">
            <Gamepad className={`h-8 w-8 text-cyber-primary mr-2 transition-transform duration-500 ${isLoaded ? 'rotate-0' : 'rotate-180'}`} />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyber-primary via-cyber-blue to-cyber-accent bg-clip-text text-transparent animate-background-shine">
              CYBER NEXUS
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={scrollToFeatures}
              className="text-white/80 hover:text-cyber-primary transition-colors duration-300 flex items-center gap-1"
            >
              Features
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
            <a href="#community" className="text-white/80 hover:text-cyber-primary transition-colors duration-300 relative group">
              Community
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-primary transition-all duration-300 group-hover:w-full"></span>
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
        <div className="container mx-auto px-6 pt-12 pb-24 relative">
          {/* Live activity ticker */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20 flex items-center gap-2 bg-cyber-dark/80 px-4 py-2 rounded-full shadow-lg border border-cyber-primary/30 animate-fade-in">
            <span className="inline-block w-2 h-2 rounded-full bg-cyber-accent animate-pulse"></span>
            <span className="text-sm text-cyber-accent font-semibold">Live:</span>
            <span className="text-sm text-white/80 font-mono transition-all duration-500 animate-slide-in">{liveActivity[activityIdx]}</span>
          </div>
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyber-primary via-cyber-blue to-cyber-accent bg-clip-text text-transparent animate-background-shine relative inline-block">
              <span className="absolute -inset-1 blur-xl bg-cyber-primary/20 rounded-full animate-pulse-glow opacity-70"></span>
              <span className="block animate-typewriter whitespace-nowrap overflow-hidden border-r-4 border-cyber-accent pr-2" style={{ animationDelay: '0.5s' }}>
                Find Your Perfect Gaming Team
              </span>
            </h1>
            <p className={`text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Connect with skilled players, form elite teams, and dominate the competitive scene together.
            </p>
            {/* Social proof avatars */}
            <div className="flex justify-center gap-2 mb-8">
              {[32, 44, 65, 12, 78].map((n, i) => (
                <img
                  key={n}
                  src={`https://randomuser.me/api/portraits/men/${n}.jpg`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-cyber-primary shadow-md hover:scale-110 hover:border-cyber-accent transition-transform duration-300"
                  style={{ zIndex: 10 - i, marginLeft: i === 0 ? 0 : -12 }}
                />
              ))}
              <span className="ml-3 text-sm text-white/60 self-center">Trusted by top teams</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Animated call-to-action buttons */}
              <Button asChild className="bg-cyber-primary hover:bg-cyber-primary/80 text-white px-8 py-6 text-lg group relative overflow-hidden">
                <Link to="/register">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyber-primary via-cyber-blue to-cyber-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                  Get Started
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-cyber-primary/30 hover:bg-cyber-primary/10 text-white px-8 py-6 text-lg relative overflow-hidden group">
                <Link to="/app/players">
                  <span className="absolute inset-0 w-0 h-full bg-cyber-primary/10 transition-all duration-500 group-hover:w-full"></span>
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
      <section ref={featuresRef} id="features" className="py-24 bg-gradient-to-b from-cyber-darker to-cyber-dark relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-white via-cyber-primary/90 to-white bg-clip-text text-transparent">
              Elite Gaming Features
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Everything you need to build your dream team and dominate the competition.
            </p>
          </div>
          {/* Animated Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="cyber-card group relative overflow-hidden hover:border-cyber-primary/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyber-primary/20 animate-fade-in-up">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyber-primary/10 rounded-full blur-2xl z-0 animate-float-fast" />
              <div className="p-6 relative z-10">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4 group-hover:bg-cyber-primary/30 transition-all duration-500 group-hover:scale-110 animate-pop">
                  <Users className="text-cyber-primary group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Matchmaking</h3>
                <p className="text-white/60">
                  Find players that match your skill level, playstyle, and gaming schedule.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="cyber-card group relative overflow-hidden hover:border-cyber-primary/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyber-primary/20 animate-fade-in-up delay-150">
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyber-accent/10 rounded-full blur-2xl z-0 animate-float-slow" />
              <div className="p-6 relative z-10">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4 group-hover:bg-cyber-accent/30 transition-all duration-500 group-hover:scale-110 animate-pop">
                  <MessageCircle className="text-cyber-primary group-hover:animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Chat</h3>
                <p className="text-white/60">
                  Communicate seamlessly with potential teammates through our built-in chat system.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="cyber-card group relative overflow-hidden hover:border-cyber-primary/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyber-primary/20 animate-fade-in-up delay-300">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-cyber-blue/10 rounded-full blur-2xl z-0 animate-float-fast" />
              <div className="p-6 relative z-10">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4 group-hover:bg-cyber-blue/30 transition-all duration-500 group-hover:scale-110 animate-pop">
                  <Shield className="text-cyber-primary group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Verified Profiles</h3>
                <p className="text-white/60">
                  Trust our community with verified ranks and authenticated gaming profiles.
                </p>
              </div>
            </div>
          </div>
          {/* Animated Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-fade-in-up">
              <div className="text-5xl font-bold text-cyber-primary mb-2 counter" data-target="10000">10k+</div>
              <p className="text-sm text-white/60">Active Players</p>
            </div>
            <div className="text-center animate-fade-in-up delay-150">
              <div className="text-5xl font-bold text-cyber-accent mb-2 counter" data-target="5000">5k+</div>
              <p className="text-sm text-white/60">Teams Formed</p>
            </div>
            <div className="text-center animate-fade-in-up delay-300">
              <div className="text-5xl font-bold text-cyber-blue mb-2 counter" data-target="20">20+</div>
              <p className="text-sm text-white/60">Supported Games</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-20 bg-cyber-dark/95 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-blue bg-clip-text text-transparent">What Our Gamers Say</h2>
            <div className="relative p-8 rounded-lg bg-cyber-darker/80 border border-cyber-primary/20 shadow-lg animate-fade-in-up">
              <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-cyber-accent shadow-md" />
              <div className="flex justify-center mb-2">
                {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-cyber-accent fill-cyber-accent" />
                ))}
              </div>
              <p className="text-lg text-white/80 mb-4 italic">"{testimonials[testimonialIdx].text}"</p>
              <span className="text-cyber-primary font-semibold">{testimonials[testimonialIdx].name}</span>
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
          
          <div className="max-w-4xl mx-auto bg-cyber-darker/50 border border-cyber-primary/20 rounded-lg p-8 backdrop-blur-sm transform transition-all duration-700 hover:border-cyber-primary/40 hover:shadow-lg hover:shadow-cyber-primary/10">
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
              <Button asChild className="bg-cyber-accent hover:bg-cyber-accent/80 text-white px-8 py-6 text-lg relative overflow-hidden group">
                <Link to="/register">
                  <span className="absolute -inset-1 blur-lg bg-cyber-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
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

// Wrap HomePage in ErrorBoundary for debugging
const WrappedHomePage = (props: any) => (
  <ErrorBoundary>
    <HomePage {...props} />
  </ErrorBoundary>
);

export default WrappedHomePage;
