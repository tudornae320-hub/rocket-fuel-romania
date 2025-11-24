import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SquiggleDoodle, ArrowDoodle } from "@/components/Doodles";
import { Handshake, Zap, Award } from "lucide-react";

const Partners = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16 text-center relative">
        <SquiggleDoodle className="top-0 right-20 opacity-20" />
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Parteneri & <span className="text-gradient">Sponsori</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Împreună construim ecosistemul startup din România
        </p>
      </section>

      {/* Main Partner */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-4">POWERED BY</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Stripe</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tehnologia care face posibil viitorul antreprenorial în România
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          De ce să devii partener?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover-lift">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Networking direct</h3>
              <p className="text-muted-foreground">
                Acces la talente și idei inovatoare din toată țara
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Brand Visibility</h3>
              <p className="text-muted-foreground">
                Expunere în fața comunității tech și startup
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Impact Social</h3>
              <p className="text-muted-foreground">
                Contribuie la dezvoltarea ecosistemului antreprenorial
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Partenerii noștri
        </h2>
        
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">Main Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="hover-lift">
                  <CardContent className="p-8 flex items-center justify-center h-32">
                    <div className="text-center text-muted-foreground font-semibold">
                      Partner Logo {i}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-secondary">Community Partners</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover-lift">
                  <CardContent className="p-6 flex items-center justify-center h-24">
                    <div className="text-xs text-muted-foreground font-semibold">
                      Logo {i}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16 relative">
        <ArrowDoodle className="top-10 left-10 opacity-20" />
        <ArrowDoodle className="bottom-10 right-10 opacity-20 rotate-180" />
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vrei să fii partener?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hai să construim împreună viitorul startup-urilor din România
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-12">
            Contactează-ne
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Partners;
