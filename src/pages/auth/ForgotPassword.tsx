
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error('Failed to send password reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="cyber-card">
          <div className="mb-8 text-center">
            <div className="inline-flex mb-2 p-3 rounded-full bg-cyber-primary/10">
              <Gamepad className="h-10 w-10 text-cyber-primary animate-pulse-glow" />
            </div>
            <h1 className="text-3xl font-bold text-white neon-text">Reset Password</h1>
            <p className="mt-2 text-white/60">Enter your email to receive a password reset link</p>
          </div>
          
          {!isSubmitted ? (
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
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cyber-button w-full py-3"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-6">
              <div className="inline-flex p-3 rounded-full bg-cyber-primary/10">
                <svg className="h-10 w-10 text-cyber-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Check your email</h3>
                <p className="text-white/60">
                  We've sent a password reset link to<br />
                  <span className="text-white">{email}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-4">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="cyber-button"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center flex items-center justify-center space-x-1 text-sm">
            <ArrowLeft className="h-4 w-4 text-cyber-primary" />
            <Link to="/login" className="text-cyber-primary hover:text-cyber-blue">
              Back to Login
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

export default ForgotPassword;
