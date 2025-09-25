import { Mail, Phone, Linkedin, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    "Dashboard",
    "Compliance Tracker", 
    "Search Hub",
    "Document Feed",
    "Admin Panel"
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" }
  ];

  return (
    <footer className="bg-metro-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://images.seeklogo.com/logo-png/45/1/kochi-metro-logo-png_seeklogo-459977.png"
                alt="Kochi Metro Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">IntelliDocs AI</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              AI-powered document management solution designed for Smart India Hackathon, 
              inspired by Kochi Metro Rail Limited's commitment to innovation and efficiency.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary" />
                <span>contact@intellidocs.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 484-2346-789</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-primary transition-colors hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Connect With Us</h3>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 bg-white/10 hover:bg-primary hover:scale-110 transition-all duration-300"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              Follow us for updates on document management innovations and metro technology.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 IntelliDocs AI. All rights reserved.
            </p>
            <p className="text-primary font-medium text-sm">
              Built for Smart India Hackathon | Inspired by Kochi Metro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;