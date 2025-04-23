
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const [email, setEmail] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation
      if (!email || !password || !gamerTag || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (gamerTag.length < 3) {
        throw new Error('Gamer tag must be at least 3 characters');
      }
      
      // Mock successful registration
      const mockUser = {
        id: '1',
        email,
        gamerTag,
        createdAt: new Date().toISOString()
      };
      
      // Store auth token and user data
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Registration successful!');
      navigate('/profile/setup');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="cyber-card">
          <div className="mb-8 text-center">
            <div className="inline-flex mb-2 p-3 rounded-full bg-cyber-primary/10">
              <Gamepad className="h-10 w-10 text-cyber-primary animate-pulse-glow" />
            </div>
            <h1 className="text-3xl font-bold text-white neon-text">Join NEXUS</h1>
            <p className="mt-2 text-white/60">Create your account to find teammates</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
              <input
                id="email"
                type="email"
                required
                className="cyber-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="gamerTag" className="text-sm font-medium text-white/80">Gamer Tag</label>
              <input
                id="gamerTag"
                type="text"
                required
                className="cyber-input w-full"
                value={gamerTag}
                onChange={(e) => setGamerTag(e.target.value)}
                placeholder="YourGamertag"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white/80">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="cyber-input w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="cyber-input w-full pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`cyber-button w-full py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-white/60">Already have an account?</span>
            {' '}
            <Link to="/login" className="text-cyber-primary hover:text-cyber-blue">
              Login
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-white/40">
          <p>© 2025 Cyber Arena Nexus. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
