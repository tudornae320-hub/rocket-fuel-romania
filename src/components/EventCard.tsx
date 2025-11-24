import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, MapPin } from "lucide-react";
import { ArrowDoodle } from "./Doodles";

interface EventCardProps {
  city: string;
  dates: string;
  location?: string;
  spotsLeft?: number;
}

export const EventCard = ({ city, dates, location, spotsLeft }: EventCardProps) => {
  return (
    <Card className="relative overflow-hidden hover-lift hover:shadow-lg transition-all duration-300 border-2 border-border hover:border-primary group">
      <ArrowDoodle className="top-2 right-2 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">{city}</h3>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{dates}</span>
          </div>
          
          {location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-secondary" />
              <span>{location}</span>
            </div>
          )}
          
          {spotsLeft && (
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {spotsLeft} locuri rămase
            </div>
          )}
          
          <Button 
            variant="default" 
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
          >
            Salvează locul tău
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
