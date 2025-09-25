import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

const UpdatesSection = () => {
  return (
    <section className="py-16 bg-metro-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Updates from Kochi Metro
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest project developments and system enhancements
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card shadow-lg-custom border-none overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Video Section */}
              <div className="relative bg-gray-900 aspect-video lg:aspect-auto">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-sm">Click to play project demo</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-bold text-foreground mb-3">
                    IntelliDocs AI Launch
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Revolutionizing document management for Smart India Hackathon
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <p className="text-foreground leading-relaxed">
                    Our latest innovation brings AI-powered document intelligence to transportation management. 
                    Experience seamless compliance tracking, automated summaries, and role-based alerts.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Enhanced AI processing capabilities
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Real-time compliance monitoring
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Multi-language support integration
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;