import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto"
        >
          <span className="font-serif text-[150px] font-bold leading-none bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
            404
          </span>
          <h1 className="font-serif text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8">
            The page you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button variant="hero" size="lg">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
