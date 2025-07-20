import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  Award 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Personalized Assessment",
      description: "Complete skill assessments to discover your strengths and identify career paths that match your interests and abilities."
    },
    {
      icon: BookOpen,
      title: "Interactive Roadmaps",
      description: "Visual career roadmaps with step-by-step guidance, milestones, and skill requirements for your chosen path."
    },
    {
      icon: Lightbulb,
      title: "Project Suggestions",
      description: "Get hands-on project recommendations tailored to your skill level and career goals to build real experience."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with peers, mentors, and industry professionals who share similar career interests and goals."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics, achievements, and skill progression over time."
    },
    {
      icon: Award,
      title: "Curated Resources",
      description: "Access carefully selected courses, articles, and materials from trusted sources to accelerate your learning."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and resources 
            you need to discover, plan, and pursue your ideal career path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;