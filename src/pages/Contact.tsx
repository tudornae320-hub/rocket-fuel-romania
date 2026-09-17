import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { ArrowDoodle, CircleDoodle } from "@/components/Doodles";

const Contact = () => {
  return (
    <div className="min-h-screen pt-24">
      <ArrowDoodle className="top-32 right-10 opacity-20" />
      <CircleDoodle className="top-40 left-10 opacity-20" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Hai să vorbim<span className="text-gradient">!</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Avem întrebări? Idei? Vrei să colaborăm? Suntem aici pentru tine.
        </p>
      </section>

      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover-lift">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Trimite-ne un mesaj</h2>
              
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Nume</Label>
                  <Input id="name" placeholder="Numele tău" className="mt-2" />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplu.ro" className="mt-2" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subiect</Label>
                  <Input id="subject" placeholder="Despre ce vrei să discutăm?" className="mt-2" />
                </div>
                
                <div>
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Scrie mesajul tău aici..." 
                    className="mt-2 min-h-[150px]"
                  />
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Trimite mesajul
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <p className="text-muted-foreground">hello@swromania.ro</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Răspundem în max 24 de ore
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Telefon</h3>
                    <p className="text-muted-foreground">+40 123 456 789</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Luni - Vineri, 10:00 - 18:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Locații</h3>
                    <p className="text-muted-foreground">
                      București • Cluj-Napoca
                      <br />
                      Iași • Timișoara
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none hover-lift">
              <CardContent className="p-8 text-center">
                <h3 className="font-bold text-xl mb-3">Urmărește-ne</h3>
                <p className="text-muted-foreground mb-4">
                  Fii la curent cu toate evenimentele
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">Facebook</span>
                    F
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">Instagram</span>
                    IG
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">LinkedIn</span>
                    in
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
