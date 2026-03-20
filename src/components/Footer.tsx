import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 bg-card border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-primary fill-primary" />
          <span className="font-display text-lg font-semibold text-foreground">Live with Sithirtha</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          You matter. Your feelings are valid. We're here to help you navigate through life's challenges.
        </p>
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Help</span>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          If you're in crisis, please call your local emergency number or a crisis helpline immediately.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
