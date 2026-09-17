import { ScrollToTop } from "@/components/ScrollToTop";

const PrivacyPolicy = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-4 mb-20 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: October 2026
          </p>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">1. Who we are</h2>
              <p>
                Startup Weekend Bucharest is organized by the Startup Weekend Romania community.
                This policy explains how we collect, use, and protect your information when you use
                our website at startupweekendbucharest.com.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">2. What we collect</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Contact details you share via our contact form or email (name, email, message).</li>
                <li>Payment information is processed securely by Stripe; we never store your card details.</li>
                <li>Basic analytics about how visitors use the site (anonymous, aggregated).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">3. How we use it</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To respond to your questions and partnership requests.</li>
                <li>To send you event-related updates if you opted in.</li>
                <li>To improve the website and future events.</li>
              </ul>
              <p className="mt-2">
                We do not sell or share your data with third parties for marketing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">4. How long we keep it</h2>
              <p>
                We keep your messages only as long as needed to respond and follow up on the
                event. You can ask us to delete your data at any time by emailing
                hi@startupweekendbucharest.com.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">5. Your rights</h2>
              <p>
                You can request access to, correction of, or deletion of your personal data at
                any time. Contact us at hi@startupweekendbucharest.com or via WhatsApp at
                +40 750 728 423.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">6. Contact</h2>
              <p>
                Questions about this policy? Write to hi@startupweekendbucharest.com and we'll
                get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
