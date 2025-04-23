
import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Gamepad, Users, Zap, Trophy, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effect for parallax and animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cyber-darker overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="fixed w-full z-50 backdrop-blur-lg bg-cyber-darker/80 border-b border-cyber-primary/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Gamepad className="text-cyber-primary h-8 w-8 animate-pulse-glow" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-blue bg-clip-text text-transparent">
              CYBER NEXUS
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/players" className="text-white/80 hover:text-cyber-primary transition-colors">
              Find Players
            </Link>
            <Link to="/login" className="text-white/80 hover:text-cyber-primary transition-colors">
              Login
            </Link>
            <Button asChild className="bg-cyber-primary hover:bg-cyber-primary/90">
              <Link to="/register">Join Now</Link>
            </Button>
          </div>
          
          <div className="flex md:hidden">
            <Button asChild variant="ghost" className="text-white">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-16">
        {/* Animated background grid */}
        <div 
          className="absolute inset-0 cyber-grid-bg opacity-10"
          style={{
            backgroundSize: `${40 + scrollY * 0.05}px ${40 + scrollY * 0.05}px`,
            backgroundPosition: `${scrollY * 0.1}px ${scrollY * 0.1}px`
          }}
        />
        
        {/* Glowing orb effects */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-cyber-primary/30 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-cyber-blue/20 blur-[80px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-blue bg-clip-text text-transparent animate-background-shine">
                Find Your Perfect Gaming Teammate
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Connect with elite players that match your skill level, schedule, and gaming style. Dominate the competitive scene together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-cyber-primary hover:bg-cyber-primary/80 text-white px-8 py-7 text-lg"
              >
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-cyber-primary/30 hover:bg-cyber-primary/10 text-white px-8 py-7 text-lg"
              >
                <Link to="/players">Browse Players</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-cyber-darker to-cyber-dark relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Choose <span className="text-cyber-primary">CYBER NEXUS</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our advanced platform helps you find the perfect gaming partners based on your specific preferences, skill level, and gaming habits.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="cyber-card hover:border-cyber-primary/30 transition-all duration-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4">
                  <Zap className="text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Matchmaking</h3>
                <p className="text-white/60">
                  Our AI-powered system finds players that match your skill level, playstyle, and gaming schedule.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="cyber-card hover:border-cyber-primary/30 transition-all duration-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4">
                  <Shield className="text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Verified Profiles</h3>
                <p className="text-white/60">
                  All player ranks and gaming profiles are authenticated to ensure you're matching with legitimate teammates.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="cyber-card hover:border-cyber-primary/30 transition-all duration-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyber-primary/20 flex items-center justify-center mb-4">
                  <Trophy className="text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Skill Advancement</h3>
                <p className="text-white/60">
                  Track your progress and improvement as you play with better teammates and advance through the ranks.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="cyber-card border-cyber-primary/30 p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Ready to find your ultimate gaming team?
              </h2>
              <p className="text-white/70 mb-8">
                Join thousands of players who have found their perfect gaming partners through CYBER NEXUS.
              </p>
              <Button 
                asChild 
                className="bg-cyber-primary hover:bg-cyber-primary/90 text-white px-8 py-6 text-lg"
              >
                <Link to="/register">
                  Create Your Account
                  <Heart className="ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyber-primary/20 bg-cyber-dark/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <Gamepad className="text-cyber-primary h-6 w-6" />
                <span className="text-lg font-bold text-white">CYBER NEXUS</span>
              </Link>
              <p className="text-white/40 text-sm mt-2">
                © 2025 Cyber Arena Nexus. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-8">
              <Link to="/login" className="text-white/60 hover:text-cyber-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-white/60 hover:text-cyber-primary transition-colors">
                Register
              </Link>
              <Link to="/players" className="text-white/60 hover:text-cyber-primary transition-colors">
                Find Players
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
