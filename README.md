# Rishabh & Naina · Royal Reception Digital Invitation

A luxury digital reception invitation card, engineered with authentic bespoke typography, hand-painted watercolor textures, and mobile-first full-bleed presentation inspired by [nsinvite.vercel.app](https://nsinvite.vercel.app/).

---

## 👑 Key Design & Architecture Highlights

1. **Gate with Interactive Gold Foil Scratch Card**:
   - Guests are welcomed by an authentic royal monogram crest (**R & N**) within a Baroque acanthus cartouche.
   - Interactive gold metallic scratch-to-reveal canvas reveals the reception date (`12.10.26 · Sunday, 12 October 2026`).
   - Smoothly reveals the "Open the Invitation" button with gentle haptic/visual feedback.

2. **Fixed Card Stage & Continuous Reel Window**:
   - Instead of breaking apart into generic floating web blocks, the card maintains its royal physical parchment form.
   - Pinned top wistaria foliage (`assets/bg-top.jpg`) and bottom waterfront architecture (`assets/bg-bottom.jpg`) with warm cream parchment (`#F5ECD7`).
   - The central **Reel** features a dynamic CSS mask (`-webkit-mask-image: linear-gradient(...)`), smoothly dissolving scrolling words under the foliage and above the skyline.

3. **Authentic Classical Soundtrack**:
   - Smooth audio unlock upon gate entry with classical wedding instrumental sitar & flute audio (`assets/music.mp3`).
   - Floating audio toggle with speaker icon and state remembered via `localStorage`.

4. **Structured Sections for Reception**:
   - **0 · Invocation & Hero**: Sacred Ganesha painting (`assets/ganesha.png`), Vedic shloka in `Tiro Devanagari Marathi`, couple names with gold italic ampersand, and animated scroll cue.
   - **1 · Our Families**: Blessings from the Groom's and Bride's parents and grandparents, divided by royal lotus ornaments.
   - **2 · The Grand Reception**: Auspicious date, time (8:00 PM onwards), venue, dress code (Formal / Black Tie & Haute Couture Saree), and direct "Add to Calendar" button.
   - **3 · RSVP & Hospitality**: WhatsApp RSVP form with custom attendance radio options and direct link.
   - **4 · The Venue**: Illuminated palace portrait, route notes, and direct one-click links to Google Maps and Apple Maps.

5. **Personalization via URL**:
   - Append `?guest=The+Sharma+Family` or `?name=Aakash` to personalize both the gate, invitation hero, and RSVP name field.
