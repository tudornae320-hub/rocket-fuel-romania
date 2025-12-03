import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DictionaryTooltip } from "@/components/Tooltip";
import { ArrowDoodle, CircleDoodle, StarDoodle, SquiggleDoodle } from "@/components/Doodles";
import { RocketFollower } from "@/components/RocketFollower";
import { ScrollableMentors } from "@/components/ScrollableMentors";
import { ScrollableSponsors } from "@/components/ScrollableSponsors";
import { InteractiveJuryGrid } from "@/components/InteractiveJuryGrid";
import { Lightbulb, MapPin, Calendar, Coffee, Presentation, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import arrowRight from "@/assets/arrow-right.png";
import { AgendaPills } from "@/components/AgendaPills";

const Home = () => {
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
          
          <InteractiveJuryGrid />
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-20 bg-muted/50 relative no-pattern">
        <SquiggleDoodle className="bottom-10 left-20 opacity-20" />
        
        <div className="container mx-auto px-4">
          <AgendaPills />
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
          
          <ScrollableSponsors />
          
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
