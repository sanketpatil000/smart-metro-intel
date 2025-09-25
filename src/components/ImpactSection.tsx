import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, Zap } from "lucide-react";

const ImpactSection = () => {
  const metrics = [
    {
      icon: FileText,
      value: "5,000+",
      label: "Documents Processed",
      description: "Successfully analyzed and processed"
    },
    {
      icon: Clock,
      value: "70%",
      label: "Faster Review Time",
      description: "Reduction in document review cycles"
    },
    {
      icon: CheckCircle,
      value: "99%",
      label: "Compliance Accuracy",
      description: "Automated compliance verification"
    },
    {
      icon: Zap,
      value: "24/7",
      label: "Real-time Alerts",
      description: "Continuous monitoring and notifications"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Impact & Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable improvements in document management efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className="text-center bg-gradient-card shadow-card hover:shadow-lg-custom transition-all duration-300 border-none group hover:scale-105"
            >
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <metric.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <div className="font-semibold text-foreground mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;