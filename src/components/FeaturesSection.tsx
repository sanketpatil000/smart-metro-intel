import { FileText, Shield, Bell, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Automated Summaries",
      description: "AI-driven summaries to quickly grasp content and extract key insights from complex documents."
    },
    {
      icon: Shield,
      title: "Compliance Tracking", 
      description: "Monitor compliance with automated checks and ensure regulatory requirements are always met."
    },
    {
      icon: Bell,
      title: "Role-based Alerts",
      description: "Timely, relevant alerts per role to keep teams informed of critical updates and deadlines."
    },
    {
      icon: Database,
      title: "Knowledge Hub",
      description: "Centralized repository for documents with intelligent categorization and search capabilities."
    }
  ];

  return (
    <section className="py-16 bg-metro-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your document management with intelligent AI-powered features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-card shadow-card hover:shadow-lg-custom transition-all duration-300 hover:scale-105 border-none"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;