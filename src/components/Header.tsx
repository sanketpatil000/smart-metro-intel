import { Globe, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const handleLoginClick = () => {
    // Navigate to login page - placeholder for now
    console.log("Navigate to login");
  };

  const handleLanguageChange = (language: string) => {
    console.log(`Language changed to: ${language}`);
    // Implement language switching logic
  };

  const menuItems = [
    "Dashboard",
    "Document Feed", 
    "Search Hub",
    "Compliance Tracker",
    "Admin"
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.seeklogo.com/logo-png/45/1/kochi-metro-logo-png_seeklogo-459977.png"
            alt="Kochi Metro Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-foreground">
            IntelliDocs AI
          </span>
        </div>

        {/* Navigation Menu - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={handleLoginClick}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Select language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('ml')}>
                മലയാളം
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Login Button */}
          <Button 
            onClick={handleLoginClick}
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
            size="sm"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;