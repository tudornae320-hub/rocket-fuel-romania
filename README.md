# Startup Weekend Bucharest

{
  "project": "Startup Weekend Romania Website",
  "goal": "Create a modern, fun, techy, doodle-inspired landing website for Startup Weekend Romania, using ONLY the provided colors and design style.",
  "style": {
    "colors": {
      "primary_blue": "#59D3FC",
      "secondary_blue": "#554DDE",
      "off_white": "#FBF8F0",
      "dark_grey": "#2A2929"
    },
    "description": "Use these colors for backgrounds, accents, buttons, doodles, hover effects. Maintain a clean white/off-white base and highlight sections with vivid blue sky (#59D3FC) and majorelle blue (#554DDE). Dark grey (#2A2929) for text and subtle UI accents.",
    "visual_identity": {
      "general_style": "Modern, fun, techy, energetic, sketchy/brutalist canvas style.",
      "doodles": "Use doodle elements similar to the ones in the uploaded images — arrows, squiggles, circles, stars, highlights, crosses, sketch-like marks. Must look hand-drawn, uneven, dynamic. Use them around cards, titles, separators, scroll animations.",
      "hover_effects": "Subtle scale-up, color shifts, doodle reveal animations.",
      "animations": "Fluid, smooth, non-intrusive. Doodles animate slightly on scroll. A rocket animation travels across the hero section while the user scrolls.",
      "typography": "Bold, modern, uppercase titles + clean sans-serif body text. Friendly tone."
    }
  },
  "tone_of_voice": {
    "rules": [
      "Friendly, relaxed, fun, motivational",
      "Common language, no corporate jargon",
      "Short, punchy sentences",
      "Energetic and inclusive",
      "Add humor lightly",
      "Explain premium/startup terms using a tooltip dictionary system"
    ],
    "dictionary_feature": {
      "trigger": "hover-on-word",
      "examples": {
        "Pitching": "Când prezinți ideea ta în 1 minut.",
        "MVP": "Versiunea cea mai simplă și rapidă a produsului tău.",
        "Mentorship": "Oameni super deștepți și cu experiență care îți dau feedback."
      }
    },
    "tagline_examples": [
      "Dacă n-ai o idee, nu-i nimic, au alții.",
      "Aim for the stars, and your startup might just build the rocket.",
      "Your startup is the stage; it's your time to be the star."
    ]
  },
  "core_message": {
    "what_startup_weekend_means": [
      "Networking real cu participanții",
      "Ieșire din zona de confort",
      "Dezvoltare profesională și personală",
      "Construim business-uri reale, nu doar idei pe hârtie",
      "Inspirație și motivație",
      "Ideile tale chiar contează",
      "Networking cu mentori, juriu, sponsori"
    ],
    "idea_to_transmit": [
      "Motivație de a porni cu ideea ta la drum",
      "Safe space: toate ideile sunt binevenite",
      "Cunoști oameni noi",
      "Îți testezi ideea",
      "Înveți să lucrezi în echipă",
      "Primești feedback real de la mentori",
      "Networking & oportunități reale"
    ]
  },
  "structure": {
    "pages": [
      {
        "page": "Home",
        "sections": [
          {
            "name": "Hero",
            "elements": {
              "video_background": "Trailer-style montage from previous Startup Weekend editions. Autoplay muted.",
              "main_title": "Startup Weekend Romania, powered by Stripe",
              "subtitle": "Un weekend, o idee, o echipă. Hai să construim împreună.",
              "rocket_animation": "A moving animated rocket that travels diagonally as the user scrolls. Leaves doodle trails (arrows, squiggles, lines).",
              "background_canvas": "Light off-white with dotted/dashed sketch grid similar to your reference images."
            },
            "animation": "Smooth fade transition as the user scrolls down from video to the next section."
          },
          {
            "name": "Upcoming Events",
            "design": {
              "layout": "Grid cards for each city.",
              "emotion": "Create FOMO — highlight upcoming dates and limited spots.",
              "doodles": "Arrows pointing toward cards, hand-drawn circles, squiggles."
            },
            "card_content_template": {
              "city": "ex: Cluj / Iași / București / Timișoara",
              "dates": "ex: 14–16 Nov",
              "cta": "Save your spot"
            }
          },
          {
            "name": "Tech & Startups Globally",
            "design": {
              "content": "Short facts about global startup scene & why Startup Weekend matters.",
              "cards": "Flip animation on hover",
              "card_front": "Image + short title",
              "card_back": "Full text, benefits, doodles fade out to reveal clean background"
            }
          },
          {
            "name": "Past Editions",
            "design": {
              "structure": "Timeline / roadmap with years and cities",
              "hover": "When hovering a city, show key highlights, photos, stats",
              "doodles": "Underlined dates, arrows pointing forward, subtle hand-drawn circles"
            }
          },
          {
            "name": "Footer",
            "design": {
              "style": "Modern, simple, clean",
              "content": ["Social media", "Email", "Partners", "Credits"]
            }
          }
        ]
      },
      {
        "page": "Cities",
        "intro_animation": "Keep/Adapt current ROMANIA reveal animation.",
        "sections": [
          {
            "name": "Hero City Section",
            "elements": {
              "big_video": "Full-width video of the specific city edition",
              "title": "Startup Weekend [City]",
              "cta_button": "Register Now"
            }
          },
          {
            "name": "Save Your Spot",
            "content": "Clear CTA emphasizing limited seats"
          },
          {
            "name": "Agenda",
            "tabs": ["Friday", "Saturday", "Sunday"],
            "interaction": "On click, reveal animated slide-down agenda for each day."
          },
          {
            "name": "Mentors",
            "layout": "Scrollable hover cards",
            "hover_effect": "Reveal description, company, role"
          },
          {
            "name": "Jury",
            "similar_to": "Mentors"
          },
          {
            "name": "Sponsors",
            "layout": "Logo grid with links"
          }
        ]
      },
      {
        "page": "Partners",
        "sections": [
          {
            "name": "Header",
            "title": "Partners & Sponsors",
            "animated_band": "Scrolling horizontal band of logos across the top"
          },
          {
            "name": "Why Partner",
            "content": "Explain value to ecosystem & support"
          },
          {
            "name": "Partners by Category",
            "categories": [
              "Main Partners",
              "Community Partners",
              "Media Partners",
              "Tech Partners"
            ]
          },
          {
            "name": "Be Our Partner",
            "cta": "Partnership contact form"
          }
        ]
      },
      {
        "page": "Mentors",
        "sections": [
          {
            "name": "Mentors Video Section",
            "video": "Authentic clips of mentors mentoring, laughing, interacting"
          },
          {
            "name": "Cities & Mentors",
            "design": "Filters by city, each city reveals mentors"
          },
          {
            "name": "Become a Mentor",
            "cta": "Sign up as a mentor"
          }
        ]
      },
      {
        "page": "Contact",
        "sections": [
          {
            "name": "Team Video Intro",
            "video": "Video of organizing team in action"
          },
          {
            "name": "Zigzag Team Layout",
            "layout": "Left-right alternating photos + bios"
          },
          {
            "name": "Contact Section",
            "style": "Cute, friendly, warm",
            "elements": ["Contact form", "Direct email", "Socials"]
          }
        ]
      }
    ]
  },
  "content_to_showcase": {
    "real_projects": "Highlight startups that emerged from Startup Weekend editions.",
    "testimonials": {
      "participants": "Short quotes, fun style",
      "mentors": "Value-based feedback",
      "partners": "Support messages"
    },
    "benefits": [
      "Lucrezi cu mentori reali",
      "Testezi idei live",
      "Cunoști comunități startup",
      "Poți continua proiectul după weekend"
    ]
  },
  "interactivity": {
    "doodles_react_to_scroll": "Slight movement / parallax",
    "rocket_scroll_path": "Changes direction slightly depending on scroll speed",
    "hover_dictionary": "Tooltips on premium words"
  }
}

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://doodle-rocket-launch.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d5d4dfdf-c3e9-4054-9d0c-dfd6f7ef4d71).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `past-editions-updates` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
