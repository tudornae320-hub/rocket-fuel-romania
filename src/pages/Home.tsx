import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DictionaryTooltip } from "@/components/Tooltip";
import { ArrowDoodle, CircleDoodle, StarDoodle, SquiggleDoodle } from "@/components/Doodles";
import { RocketFollower } from "@/components/RocketFollower";
import { Lightbulb, MapPin, Calendar, Coffee, Presentation, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import arrowRight from "@/assets/arrow-right.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Animated Rocket Follower */}
      <RocketFollower />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
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
            <div className="h-[400px] w-0.5 bg-white/30 relative flex items-center justify-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="px-4">
                <img src={arrowRight} alt="Arrow" className="w-8 h-8 opacity-80" />
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
      <section className="py-20 bg-muted/50 relative">
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {[
              { name: "Nicolae Gudumac", role: "Founder & CTO", company: "Planable" },
              { name: "Bogdan Iordache", role: "GP", company: "Underline VC" },
              { name: "Anca Bercă", role: "Product Manager", company: "Bitdefender" },
              { name: "Alex Gavril", role: "CEO", company: "▲ promocrat" },
              { name: "Alex Dascalu", role: "Lead Director", company: "Founder Institute CEE" },
              { name: "Alexandru Anghel", role: "Co-founder", company: "Solo" },
              { name: "Anca Marcu", role: "CFO", company: "AMSIMCEL" },
              { name: "AnaMaria Onică", role: "CEO", company: "VOXivers" },
              { name: "Auras Tanase", role: "Growth Marketeer", company: "Veridion" },
              { name: "Ioana Serban", role: "Fractional CMO", company: "TechMarketers" },
              { name: "Tudor Petracovici", role: "Full Stack Engineer", company: "Veridion" },
              { name: "Alex Nicoară", role: "Co-founder", company: "Soulmag.ai" },
              { name: "Daniel Deaconu", role: "Founder", company: "The Simplifier" },
            ].map((mentor, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-1">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">{mentor.role}</p>
                  <p className="text-sm font-medium text-primary">{mentor.company}</p>
                </CardContent>
              </Card>
            ))}
          </div>

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
      <section id="agenda" className="py-20 bg-muted/50 relative">
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
          
          <Tabs defaultValue="friday" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="friday">Friday</TabsTrigger>
              <TabsTrigger value="saturday">Saturday</TabsTrigger>
              <TabsTrigger value="sunday">Sunday</TabsTrigger>
            </TabsList>
            
            <TabsContent value="friday" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">18:00 – 18:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Registration</h4>
                        <p className="text-muted-foreground">Welcome to Startup Weekend! Check in, grab your badge, and meet the crew. The weekend starts now.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">18:30 – 19:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Dinner & networking</h4>
                        <p className="text-muted-foreground">Fuel up and mingle! Share ideas, chat with potential teammates, and get into the startup mindset over good food.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">19:00 – 19:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Welcome</h4>
                        <p className="text-muted-foreground">Our Techstars facilitator will walk you through what to expect this weekend. Spoiler: it's going to be intense, fun, and unforgettable.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">19:30 – 20:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Pitches</h4>
                        <p className="text-muted-foreground">Here's your shot! The facilitator explains the rules, then it's pitch time. You've got 60 seconds to share your idea and rally a team.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">20:00 – 20:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Vote for top pitches and form teams</h4>
                        <p className="text-muted-foreground">Everyone votes on their favorite ideas. The top pitches move forward — and the real game begins. Join a team or recruit your own.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">20:30 – 21:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Startup Ideation Workshop</h4>
                        <p className="text-muted-foreground">A hands-on session with Alex Dascalu (Founder Institute), designed to help aspiring entrepreneurs shape great startup ideas using expert feedback, powerful AI tools, and a proven step-by-step process.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">21:30 – Late</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Start building!</h4>
                        <p className="text-muted-foreground">Claim your workspace, meet your new teammates, and dive into brainstorming, planning, and MVP madness.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saturday" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">09:00 – 09:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Breakfast</h4>
                        <p className="text-muted-foreground">Start strong with breakfast at the venue. You've got a big day ahead.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">10:30 – 11:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Workshop: GTM Strategy</h4>
                        <p className="text-muted-foreground">Join Alex Gavril, CEO ▲ promocrat, for a hands-on session on how to take your startup from idea to first customers. Learn how to craft a sharp go-to-market plan, validate your audience, and position your product for real traction.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">13:00 – 14:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Lunch</h4>
                        <p className="text-muted-foreground">Take a well-earned break and recharge with some good food.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">14:00 – 17:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Mentoring sessions</h4>
                        <p className="text-muted-foreground">Meet one-on-one with mentors to get feedback, ideas, and support. Ask anything — they're here to help you move faster and smarter.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">18:00 – 18:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Talk: The story of Planable</h4>
                        <p className="text-muted-foreground">A behind-the-scenes look at building a startup that scaled, from early hustle to real traction, with Nicolae Gudumac (Founder & CTO)</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">19:00 – 19:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Dinner</h4>
                        <p className="text-muted-foreground">Refuel, chat with other teams, and get ready for the evening grind.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">21:00 – Late</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Night Sprint: Build, Iterate, Repeat</h4>
                        <p className="text-muted-foreground">Check in with your team, ask for help if needed, and keep pushing forward. The venue stays open late — stay as long as your energy (or caffeine) lasts.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sunday" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">09:30 – 10:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Breakfast</h4>
                        <p className="text-muted-foreground">Grab some breakfast, check in with your team, and get ready for the final sprint!</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">10:30 – 11:30</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Pitching Workshop</h4>
                        <p className="text-muted-foreground">Learn how to craft a clear, compelling pitch that gets attention fast. In this hands-on session, Cosmin Pirvu from Veridion will walk you through practical frameworks for storytelling, structuring your message, and delivering it with confidence.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">12:00 – 13:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Pitch Practice</h4>
                        <p className="text-muted-foreground">Test your pitch in a safe space. Get feedback, tweak your story, and boost your confidence before showtime.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">13:00 – 14:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Lunch</h4>
                        <p className="text-muted-foreground">Fuel up one last time before the big moment.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">14:00 – 15:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Pitch Prep & Rehearsal, Tech Check</h4>
                        <p className="text-muted-foreground">Final polish for your slides and delivery. Make sure everything works and your team's ready to shine.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">15:00 – 17:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Final presentations</h4>
                        <p className="text-muted-foreground">Time to pitch like a pro! Each team gets 5 minutes to present their startup and 5 minutes for Q&A with the jury. Show what you've built, why it matters, and leave it all on stage.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="min-w-[100px] font-semibold text-primary">17:00 – 19:00</div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Dinner, awards, wrap up and after party!</h4>
                        <p className="text-muted-foreground">Celebrate everything you've built — the ideas, the teamwork, the late nights, and the breakthroughs. Enjoy a well-earned meal, cheer each other on, and close out an unforgettable weekend together.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
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
