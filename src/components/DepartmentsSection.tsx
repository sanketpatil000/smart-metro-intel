import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Users, 
  Scale, 
  Calculator, 
  Settings, 
  Activity 
} from "lucide-react";

const DepartmentsSection = () => {
  const departments = [
    { name: "Engineering", icon: Wrench, color: "bg-blue-500" },
    { name: "HR", icon: Users, color: "bg-green-500" },
    { name: "Legal", icon: Scale, color: "bg-purple-500" },
    { name: "Finance", icon: Calculator, color: "bg-orange-500" },
    { name: "Maintenance", icon: Settings, color: "bg-red-500" },
    { name: "Operations", icon: Activity, color: "bg-indigo-500" }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Departments
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access department-specific document management and compliance tracking
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
          {departments.map((dept, index) => (
            <div key={index} className="flex flex-col items-center">
              <Button
                size="lg"
                className={`w-20 h-20 rounded-full ${dept.color} hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl mb-3`}
              >
                <dept.icon className="w-8 h-8 text-white" />
              </Button>
              <span className="text-sm font-medium text-foreground text-center">
                {dept.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;