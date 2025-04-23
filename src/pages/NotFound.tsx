
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-darker">
      <div className="cyber-card p-8 max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4 text-cyber-primary">404</h1>
        <p className="text-xl text-white/70 mb-8">
          Oops! The page you're looking for doesn't exist in this dimension.
        </p>
        
        <div className="grid gap-4">
          <Button asChild variant="default" className="bg-cyber-primary hover:bg-cyber-primary/90">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-cyber-primary/30">
            <Link to="/app/profile">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
