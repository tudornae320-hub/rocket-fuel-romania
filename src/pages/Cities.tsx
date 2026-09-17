import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { CircleDoodle, StarDoodle } from "@/components/Doodles";

const Cities = () => {
  const [selectedCity] = useState("cluj");

  const cityData = {
    cluj: {
      name: "Cluj-Napoca",
      dates: "14-16 Noiembrie 2024",
      location: "Impact Hub Cluj",
      videoUrl: "https://example.com/cluj-video.mp4",
    },
  };

  const agenda = {
    friday: [
      { time: "18:00", title: "Check-in & Welcome", description: "Înregistrare și bun venit participanți" },
      { time: "19:00", title: "Pitch Your Ideas", description: "60 de secunde pentru a prezenta ideea ta" },
      { time: "20:00", title: "Team Formation", description: "Formarea echipelor pe baza ideilor votate" },
      { time: "21:00", title: "Start Working", description: "Echipele încep să lucreze la proiecte" },
    ],
    saturday: [
      { time: "09:00", title: "Breakfast & Check-in", description: "Micul dejun și pregătire pentru ziua 2" },
      { time: "10:00", title: "Mentoring Sessions", description: "Sesiuni de mentoring cu experți" },
      { time: "13:00", title: "Lunch Break", description: "Pauză de prânz și networking" },
      { time: "14:00", title: "Development Sprint", description: "Continuarea dezvoltării produsului" },
      { time: "18:00", title: "Evening Mentoring", description: "Feedback și îndrumare de la mentori" },
    ],
    sunday: [
      { time: "09:00", title: "Final Sprint", description: "Ultimele ore de dezvoltare" },
      { time: "13:00", title: "Lunch", description: "Pauză de masă" },
      { time: "14:00", title: "Pitch Preparation", description: "Pregătirea prezentărilor finale" },
      { time: "16:00", title: "Final Presentations", description: "Pitch-uri în fața juriului" },
      { time: "18:00", title: "Awards & Closing", description: "Anunțarea câștigătorilor și închidere" },
    ],
  };

  return (
    <div className="min-h-screen pt-24">
      <CircleDoodle className="top-32 right-10 opacity-20" />
      <StarDoodle className="top-40 left-10 opacity-20" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 p-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Startup Weekend
            <span className="block text-primary">{cityData[selectedCity].name}</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{cityData[selectedCity].dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>{cityData[selectedCity].location}</span>
            </div>
          </div>
          
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold">
            Înscrie-te acum
          </Button>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Agenda evenimentului</h2>
        
        <Tabs defaultValue="friday" className="w-full">
          <TabsList className="grid w-full md:w-auto md:mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="friday" className="font-semibold">Vineri</TabsTrigger>
            <TabsTrigger value="saturday" className="font-semibold">Sâmbătă</TabsTrigger>
            <TabsTrigger value="sunday" className="font-semibold">Duminică</TabsTrigger>
          </TabsList>
          
          <TabsContent value="friday">
            <div className="space-y-4">
              {agenda.friday.map((item, idx) => (
                <Card key={idx} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-primary font-bold min-w-[80px]">
                        <Clock className="w-4 h-4" />
                        {item.time}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="saturday">
            <div className="space-y-4">
              {agenda.saturday.map((item, idx) => (
                <Card key={idx} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-primary font-bold min-w-[80px]">
                        <Clock className="w-4 h-4" />
                        {item.time}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sunday">
            <div className="space-y-4">
              {agenda.sunday.map((item, idx) => (
                <Card key={idx} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-primary font-bold min-w-[80px]">
                        <Clock className="w-4 h-4" />
                        {item.time}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gata să începi?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nu pierde șansa de a face parte din această experiență unică. Locurile sunt limitate!
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12">
            Salvează-ți locul
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Cities;
