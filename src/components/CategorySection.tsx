import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Scale, 
  Calculator, 
  Wrench, 
  Settings 
} from "lucide-react";

const CategorySection = () => {
  const categories = [
    {
      name: "HR",
      docCount: 120,
      icon: Users,
      color: "bg-green-500",
      description: "Human resources policies and procedures"
    },
    {
      name: "Legal",
      docCount: 85,
      icon: Scale,
      color: "bg-purple-500",
      description: "Legal documents and compliance files"
    },
    {
      name: "Finance",
      docCount: 230,
      icon: Calculator,
      color: "bg-orange-500",
      description: "Financial reports and budget documents"
    },
    {
      name: "Engineering",
      docCount: 450,
      icon: Wrench,
      color: "bg-blue-500",
      description: "Technical specifications and blueprints"
    },
    {
      name: "Maintenance",
      docCount: 310,
      icon: Settings,
      color: "bg-red-500",
      description: "Maintenance schedules and service records"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore documents organized by department with intelligent categorization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="bg-gradient-card shadow-card hover:shadow-lg-custom transition-all duration-300 hover:scale-105 border-none cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {category.name}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {category.docCount} docs
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;