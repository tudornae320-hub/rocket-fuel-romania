import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { ArrowDoodle, CircleDoodle } from "@/components/Doodles";

const CONTACT_EMAIL = "hi@startupweekendbucharest.com";
const WHATSAPP_URL = "https://wa.me/+40750728423";
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/p/Techstars-Startup-Weekend-Bucharest-100084807730010/",
  instagram: "https://www.instagram.com/startupweekendromania/",
  linkedin: "https://www.linkedin.com/company/techstars-startup-weekend-romania/",
};

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject || "Mesaj de pe site"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

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

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Nume</Label>
                  <Input id="name" name="name" placeholder="Numele tău" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="email@exemplu.ro" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="subject">Subiect</Label>
                  <Input id="subject" name="subject" placeholder="Despre ce vrei să discutăm?" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Scrie mesajul tău aici..."
                    className="mt-2 min-h-[150px]"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
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
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
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
                    <h3 className="font-bold text-lg mb-2">Telefon / WhatsApp</h3>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +40 750 728 423
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scrie-ne pe WhatsApp oricând
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
                    <h3 className="font-bold text-lg mb-2">Locație</h3>
                    <p className="text-muted-foreground">București, România</p>
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
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <span className="sr-only">Facebook</span>
                      <Facebook className="w-5 h-5" />
                    </Button>
                  </a>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <span className="sr-only">Instagram</span>
                      <Instagram className="w-5 h-5" />
                    </Button>
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </a>
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
