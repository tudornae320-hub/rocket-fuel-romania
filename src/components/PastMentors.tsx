import { Card, CardContent } from "@/components/ui/card";

import nicolaeGudumac from "@/assets/mentors/nicolae-gudumac.jpg";
import bogdanIordache from "@/assets/mentors/bogdan-iordache.jpeg";
import ancaBerca from "@/assets/mentors/anca-berca.jpg";
import alexGavril from "@/assets/mentors/alex-gavril.jpg";
import alexDascalu from "@/assets/mentors/alex-dascalu.jpg";
import alexandruAnghel from "@/assets/mentors/alexandru-anghel.jpg";
import ancaMarcu from "@/assets/mentors/anca-marcu.jpg";
import anamariaOnica from "@/assets/mentors/anamaria-onica.jpeg";
import aurasTanase from "@/assets/mentors/auras-tanase.jpg";
import ioanaSerban from "@/assets/mentors/ioana-serban.jpg";
import tudorPetracovici from "@/assets/mentors/tudor-petracovici.jpg";
import alexNicoara from "@/assets/mentors/alex-nicoara.jpg";
import danielDeaconu from "@/assets/mentors/daniel-deaconu.jpg";

const pastMentors = [
  { name: "Nicolae Gudumac", role: "Founder & CTO", company: "Planable", image: nicolaeGudumac },
  { name: "Bogdan Iordache", role: "GP", company: "Underline VC", image: bogdanIordache },
  { name: "Anca Bercă", role: "Product Manager", company: "Bitdefender", image: ancaBerca },
  { name: "Alex Gavril", role: "CEO", company: "▲ promocrat", image: alexGavril },
  { name: "Alex Dascalu", role: "Lead Director", company: "Founder Institute CEE", image: alexDascalu },
  { name: "Alexandru Anghel", role: "Co-founder", company: "Solo", image: alexandruAnghel },
  { name: "Anca Marcu", role: "CFO", company: "AMSIMCEL", image: ancaMarcu },
  { name: "AnaMaria Onică", role: "CEO", company: "VOXivers", image: anamariaOnica },
  { name: "Auras Tanase", role: "Growth Marketeer", company: "Veridion", image: aurasTanase },
  { name: "Ioana Serban", role: "Fractional CMO", company: "TechMarketers", image: ioanaSerban },
  { name: "Tudor Petracovici", role: "Full Stack Engineer", company: "Veridion", image: tudorPetracovici },
  { name: "Alex Nicoară", role: "Co-founder", company: "Soulmag.ai", image: alexNicoara },
  { name: "Daniel Deaconu", role: "Founder", company: "The Simplifier", image: danielDeaconu },
  { name: "Cosmin Bolocan", role: "Co-founder", company: "Brewtifi", image: cosminBolocan },
];

export const PastMentors = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
          Past Mentors
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The amazing people who shaped previous editions
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pastMentors.map((mentor, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:!border-primary hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-0">
              <div className="relative w-full h-[180px] overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 border-t border-[#000000]">
                <h3 className="font-bold text-base text-foreground">{mentor.name}</h3>
                <p className="text-sm text-secondary font-medium">{mentor.company}</p>
                <p className="text-sm text-muted-foreground mt-2">{mentor.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
