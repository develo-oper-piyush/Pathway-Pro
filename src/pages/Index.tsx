import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AuthModal from "@/components/auth/AuthModal";
import CareerPathCard from "@/components/career/CareerPathCard";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [careerPaths, setCareerPaths] = useState<any[]>([]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  const sampleCareerPaths = [
    {
      title: "Full Stack Developer",
      description: "Build end-to-end web applications using modern technologies like React, Node.js, and databases.",
      difficultyLevel: "intermediate",
      estimatedDuration: "12-18 months",
      salaryRange: "$70K - $120K",
      growthOutlook: "High"
    },
    {
      title: "Data Scientist",
      description: "Analyze complex data to extract insights and build predictive models using Python, R, and machine learning.",
      difficultyLevel: "advanced",
      estimatedDuration: "18-24 months",
      salaryRange: "$90K - $150K",
      growthOutlook: "Very High"
    },
    {
      title: "UX/UI Designer",
      description: "Create beautiful and intuitive user experiences for digital products using design tools and user research.",
      difficultyLevel: "beginner",
      estimatedDuration: "8-12 months",
      salaryRange: "$60K - $100K",
      growthOutlook: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthClick={handleAuthClick} />
      
      <main>
        <HeroSection onGetStarted={handleAuthClick} />
        <FeaturesSection />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Popular{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Career Paths
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore some of the most in-demand career paths in today's job market.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleCareerPaths.map((path, index) => (
                <CareerPathCard
                  key={index}
                  {...path}
                  onExplore={() => {
                    if (!user) {
                      setAuthModalOpen(true);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;
