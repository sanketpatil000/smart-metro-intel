import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import ImpactSection from "@/components/ImpactSection";
import UpdatesSection from "@/components/UpdatesSection";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DepartmentsSection />
      <ImpactSection />
      <UpdatesSection />
      <CategorySection />
      <Footer />
    </div>
  );
};

export default Index;
