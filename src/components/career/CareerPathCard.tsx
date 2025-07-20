import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, TrendingUp, ArrowRight } from "lucide-react";

interface CareerPathCardProps {
  title: string;
  description: string;
  difficultyLevel: string;
  estimatedDuration: string;
  salaryRange: string;
  growthOutlook: string;
  onExplore: () => void;
}

const CareerPathCard = ({
  title,
  description,
  difficultyLevel,
  estimatedDuration,
  salaryRange,
  growthOutlook,
  onExplore,
}: CareerPathCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <Badge className={getDifficultyColor(difficultyLevel)}>
              {difficultyLevel}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{estimatedDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span>{salaryRange}</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>{growthOutlook}</span>
            </div>
          </div>
          
          <Button 
            onClick={onExplore}
            variant="outline" 
            className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
          >
            Explore Path
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPathCard;