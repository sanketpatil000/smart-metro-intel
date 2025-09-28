import { Globe, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLanguageChange = (language: string) => {
    console.log(`Language changed to: ${language}`);
    // Implement language switching logic
  };

  const menuItems = [
    { name: "Dashboard", path: "/main-dashboard" },
    { name: "Document Feed", path: "/document-feed" }, 
    { name: "Search Hub", path: "/search-hub" },
    { name: "Compliance Tracker", path: "/compliance-tracker" },
    { name: "Admin", path: "/admin" }
  ];

  return null;
};

export default Header;