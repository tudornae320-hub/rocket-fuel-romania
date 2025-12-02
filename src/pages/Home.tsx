import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DictionaryTooltip } from "@/components/Tooltip";
import { ArrowDoodle, CircleDoodle, StarDoodle, SquiggleDoodle } from "@/components/Doodles";
import { RocketFollower } from "@/components/RocketFollower";
import { ScrollableMentors } from "@/components/ScrollableMentors";
import { Lightbulb, MapPin, Calendar, Coffee, Presentation, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import arrowRight from "@/assets/arrow-right.png";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [openDay, setOpenDay] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Animated Rocket Follower */}
      <RocketFollower />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 no-pattern">
        {/* Background Image with Dark Gradient */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground} 
            alt="Startup Weekend" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/80 via-dark-grey/70 to-dark-grey/90" />
        </div>
        
        {/* Gradient Blend at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex items-center justify-between gap-12">
          {/* Left Side - Title and Info */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in text-white uppercase tracking-tight">
              Startup Weekend Bucharest
            </h1>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-white">
                <Calendar className="w-6 h-6 text-primary" />
                <span>10-12 October</span>
              </div>
              <div className="flex items-center gap-3 text-lg md:text-xl text-off-white/90">
                <MapPin className="w-5 h-5 text-primary" />
                <a href="https://maps.app.goo.gl/DWoupMfrzjf1dEh1A" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Builders House
                </a>
              </div>
              <p className="text-lg md:text-xl text-off-white/80 mt-4">
                powered by <span className="font-bold text-primary">Stripe</span>
              </p>
            </div>
          </div>
          
          {/* Right Side - Vertical Line with Arrow */}
          <div className="hidden md:flex flex-row items-center gap-4 min-w-[100px]">
            <a 
              href="#about" 
              className="text-white font-semibold text-lg hover:text-primary transition-colors cursor-pointer uppercase tracking-wide"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Learn More
            </a>
            <div className="h-[400px] w-1 bg-white/30 relative flex items-center justify-center">
              <div className="absolute left-1/2 translate-x-1 flex items-center justify-center animate-bob-horizontal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No talk. All Action! */}
      <section id="about" className="py-20 relative">
        <SquiggleDoodle className="top-10 right-20 opacity-30" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              No talk. All action!
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Startup Weekend brings together those interested in startups with co-founders, mentors and experts.
              Participants put all their energy into their projects to find out after <strong>54 hours</strong> whether 
              the business idea has a chance on the market. The event is open to everyone – regardless of whether they have their own idea or not.
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              Get inspired, develop new skills, and network with creative minds!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Workshops & Mentorship</h3>
              <p className="text-muted-foreground">
                Get feedback on your business idea, from launch strategy to pricing models and pitching skills from our Mentors and Experts during dedicated mentorship hours!
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Presentation className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Pitch your concept</h3>
              <p className="text-muted-foreground">
                If you have an idea for a startup, you can pitch it on Friday, and convince your peers to join the ride! Don't worry if you don't have an idea, you can join any of the ideas pitched!
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Build & win</h3>
              <p className="text-muted-foreground">
                During the weekend you will validate your idea, build an MVP, define the business model, train your pitch and present in front of our expert jury to win awesome prizes!
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Coffee className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Fuel the journey</h3>
              <p className="text-muted-foreground">
                We make sure that you have unlimited coffee, 7 meals, snacks and other goodies during the weekend, so you have the energy to build something great!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 54 Hours to Build */}
      <section className="py-20 bg-muted/50 relative no-pattern">
        <CircleDoodle className="top-20 left-10 opacity-20" />
        <StarDoodle className="bottom-20 right-10 opacity-20" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              54 hours to build a startup
            </h2>
            <p className="text-xl mb-4">
              <strong>Learn how to think, work, and build like a startup in 54 thrilling hours.</strong>
            </p>
            <p className="text-lg text-muted-foreground">
              <a href="https://www.techstars.com/communities" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Techstars Startup Weekend</a> is an exciting and immersive foray into the world of startups. 
              Over an action-packed three days, you'll meet the very best mentors, investors, co-founders and sponsors 
              to show you how to get more done faster – and, maybe even <strong>start that business.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Mentors & Speakers */}
      <section id="mentors" className="py-20 relative">
        <ArrowDoodle className="top-10 left-20 opacity-30" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Speakers & Mentors
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn from the best in the industry
            </p>
          </div>
          
          <ScrollableMentors />

          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-8">Jury</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Aleodor Tabarcea", role: "Engineering Manager", company: "Stripe" },
              { name: "Eduard Burghelia", role: "Venture Partner", company: "V7 Capital" },
              { name: "Florin Visa", role: "Partner", company: "Early Game Ventures" },
            ].map((jury, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">{jury.name}</h3>
                  <p className="text-sm text-muted-foreground">{jury.role}</p>
                  <p className="text-sm font-medium text-secondary">{jury.company}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-20 bg-muted/50 relative no-pattern">
        <SquiggleDoodle className="bottom-10 left-20 opacity-20" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Agenda
            </h2>
            <p className="text-lg text-muted-foreground">
              Your 54-hour journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Friday */}
            <Collapsible open={openDay === "friday"} onOpenChange={(isOpen) => setOpenDay(isOpen ? "friday" : null)}>
              <Card className="hover-lift cursor-pointer h-full flex flex-col">
                <CollapsibleTrigger className="w-full text-left p-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Friday</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openDay === "friday" ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                {openDay === "friday" && (
                  <CollapsibleContent forceMount>
                    <CardContent className="pt-0 px-6 pb-6 space-y-4">
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">18:00 – 18:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Registration</h4>
                            <p className="text-sm text-muted-foreground">Welcome to Startup Weekend! Check in, grab your badge, and meet the crew.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">18:30 – 19:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Dinner & networking</h4>
                            <p className="text-sm text-muted-foreground">Fuel up and mingle! Share ideas and chat with potential teammates.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">19:00 – 19:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Welcome</h4>
                            <p className="text-sm text-muted-foreground">Our Techstars facilitator walks you through the weekend.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">19:30 – 20:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Pitches</h4>
                            <p className="text-sm text-muted-foreground">60 seconds to share your idea and rally a team.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">20:00 – 20:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Vote & form teams</h4>
                            <p className="text-sm text-muted-foreground">Vote on favorite ideas and join a team.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">20:30 – 21:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Startup Ideation Workshop</h4>
                            <p className="text-sm text-muted-foreground">Shape great startup ideas with Alex Dascalu (Founder Institute).</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">21:30 – Late</div>
                          <div>
                            <h4 className="font-bold mb-1">Start building!</h4>
                            <p className="text-sm text-muted-foreground">Dive into brainstorming, planning, and MVP madness.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                )}
              </Card>
            </Collapsible>

            {/* Saturday */}
            <Collapsible open={openDay === "saturday"} onOpenChange={(isOpen) => setOpenDay(isOpen ? "saturday" : null)}>
              <Card className="hover-lift cursor-pointer h-full flex flex-col">
                <CollapsibleTrigger className="w-full text-left p-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Saturday</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openDay === "saturday" ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                {openDay === "saturday" && (
                  <CollapsibleContent forceMount>
                    <CardContent className="pt-0 px-6 pb-6 space-y-4">
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">09:00 – 09:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Breakfast</h4>
                            <p className="text-sm text-muted-foreground">Start strong with breakfast at the venue.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">10:30 – 11:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Workshop: GTM Strategy</h4>
                            <p className="text-sm text-muted-foreground">Learn go-to-market strategy with Alex Gavril, CEO ▲ promocrat.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">13:00 – 14:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Lunch</h4>
                            <p className="text-sm text-muted-foreground">Take a well-earned break and recharge.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">14:00 – 17:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Mentoring sessions</h4>
                            <p className="text-sm text-muted-foreground">Get feedback and support from mentors one-on-one.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">18:00 – 18:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Talk: The story of Planable</h4>
                            <p className="text-sm text-muted-foreground">Behind-the-scenes with Nicolae Gudumac (Founder & CTO).</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">19:00 – 19:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Dinner</h4>
                            <p className="text-sm text-muted-foreground">Refuel and chat with other teams.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">21:00 – Late</div>
                          <div>
                            <h4 className="font-bold mb-1">Night Sprint</h4>
                            <p className="text-sm text-muted-foreground">Build, iterate, repeat. Venue stays open late.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                )}
              </Card>
            </Collapsible>

            {/* Sunday */}
            <Collapsible open={openDay === "sunday"} onOpenChange={(isOpen) => setOpenDay(isOpen ? "sunday" : null)}>
              <Card className="hover-lift cursor-pointer h-full flex flex-col">
                <CollapsibleTrigger className="w-full text-left p-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Sunday</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openDay === "sunday" ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                {openDay === "sunday" && (
                  <CollapsibleContent forceMount>
                    <CardContent className="pt-0 px-6 pb-6 space-y-4">
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">09:30 – 10:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Breakfast</h4>
                            <p className="text-sm text-muted-foreground">Grab breakfast and prep for the final sprint.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">10:30 – 11:30</div>
                          <div>
                            <h4 className="font-bold mb-1">Pitching Workshop</h4>
                            <p className="text-sm text-muted-foreground">Craft a compelling pitch with Cosmin Pirvu from Veridion.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">12:00 – 13:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Pitch Practice</h4>
                            <p className="text-sm text-muted-foreground">Test your pitch, get feedback, boost confidence.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">13:00 – 14:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Lunch</h4>
                            <p className="text-sm text-muted-foreground">Fuel up one last time before the big moment.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">14:00 – 15:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Pitch Prep & Tech Check</h4>
                            <p className="text-sm text-muted-foreground">Final polish and make sure everything works.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">15:00 – 17:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Final presentations</h4>
                            <p className="text-sm text-muted-foreground">5 min pitch + 5 min Q&A with the jury. Show what you built!</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-[80px] text-sm font-semibold text-primary">17:00 – 19:00</div>
                          <div>
                            <h4 className="font-bold mb-1">Awards & After Party</h4>
                            <p className="text-sm text-muted-foreground">Celebrate an unforgettable weekend together!</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                )}
              </Card>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Sponsors & Partners */}
      <section id="partners" className="py-20 relative">
        <CircleDoodle className="top-10 right-20 opacity-20" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sponsors & Partners
            </h2>
            <p className="text-lg text-muted-foreground">
              Supported by the best
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {["Stripe", "Veridion", "Adobe", "Techstars", "VSFA", "BOS Romania", "PROW", "Entrepreneurship Academy", 
              "AmplifyONG", "Brewtifi", "VIP Romania", "V7 Capital", "DevMind", "Best Bucharest", "RAU", "Launch.ro"].map((partner, index) => (
              <div key={index} className="w-32 h-32 bg-background border border-border rounded-lg flex items-center justify-center hover-lift">
                <span className="text-sm font-semibold text-center px-4">{partner}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary/10">
              Get involved!
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 no-pattern">
        <div className="absolute inset-0 opacity-10" />
        <ArrowDoodle className="top-10 left-20 animate-float" />
        <ArrowDoodle className="bottom-10 right-20 animate-float" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to build something great?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Join us for 54 hours of intense building, learning, and networking. Limited spots available!
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-12">
            Get your ticket now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
