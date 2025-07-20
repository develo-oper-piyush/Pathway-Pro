import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, TrendingUp, DollarSign } from "lucide-react";
import Header from "@/components/layout/Header";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  overview: string;
  difficulty_level: string;
  estimated_duration: string;
  salary_range: string;
  growth_outlook: string;
}

const Explore = () => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [filteredPaths, setFilteredPaths] = useState<CareerPath[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const { data, error } = await supabase
          .from('career_paths')
          .select('*')
          .order('title');
        
        if (error) throw error;
        setCareerPaths(data || []);
        setFilteredPaths(data || []);
      } catch (error) {
        console.error('Error fetching career paths:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerPaths();
  }, []);

  useEffect(() => {
    let filtered = careerPaths;

    if (searchTerm) {
      filtered = filtered.filter(path =>
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter(path => path.difficulty_level === difficultyFilter);
    }

    setFilteredPaths(filtered);
  }, [searchTerm, difficultyFilter, careerPaths]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onAuthClick={() => {}} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthClick={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Explore Career Paths
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover career opportunities tailored to your interests and skills
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search career paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Career Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <Card key={path.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <Badge className={getDifficultyColor(path.difficulty_level || '')}>
                    {path.difficulty_level}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {path.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {path.estimated_duration && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {path.estimated_duration}
                    </div>
                  )}
                  {path.salary_range && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {path.salary_range}
                    </div>
                  )}
                  {path.growth_outlook && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {path.growth_outlook}
                    </div>
                  )}
                  <div className="pt-4">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPaths.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No career paths found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;