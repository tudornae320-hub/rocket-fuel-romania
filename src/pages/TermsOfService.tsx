import { ScrollToTop } from "@/components/ScrollToTop";

const TermsOfService = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-4 mb-20 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: October 2026
          </p>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">1. About the event</h2>
              <p>
                Startup Weekend Bucharest is a 54-hour event where participants form teams, build
                prototypes, and pitch ideas. By registering, you agree to participate in good faith
                and respect fellow participants, mentors, and organizers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">2. Tickets & payments</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Tickets are sold through Stripe and are non-refundable except where required by law.</li>
                <li>You may transfer your ticket to another person — just let us know in advance.</li>
                <li>The organizer reserves the right to refuse entry or remove a participant for misconduct.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">3. Intellectual property</h2>
              <p>
                Anything you build during the event belongs to your team. Startup Weekend Romania
                and Startup Weekend Bucharest claim no ownership of your work. By pitching, you
                grant us permission to share photos and videos from the event that may include you.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">4. Conduct</h2>
              <p>
                We expect respectful, inclusive behaviour at all times. Harassment, discrimination,
                or theft of ideas will not be tolerated and may result in removal from the event.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">5. Liability</h2>
              <p>
                The organizers provide the event "as is." We are not liable for lost items, missed
                opportunities, or outcomes related to your participation. Bring your own laptop and
                tools.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">6. Changes</h2>
              <p>
                We may update these terms for future editions. The latest version will always be
                posted here with the date above.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">7. Contact</h2>
              <p>
                Questions? Email hi@startupweekendbucharest.com or message us on WhatsApp at
                +40 750 728 423.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfService;
