import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import metroHero from "@/assets/metro-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${metroHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          From Files to 
          <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Foresight
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
          AI-powered summaries, compliance tracking, role-based alerts.
        </p>

        <Button 
          size="lg"
          className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-hero transition-all duration-300 hover:scale-105"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {/* Floating Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold">5,000+</div>
            <div className="text-sm text-gray-200">Documents Processed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold">70%</div>
            <div className="text-sm text-gray-200">Faster Review Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold">99%</div>
            <div className="text-sm text-gray-200">Compliance Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;