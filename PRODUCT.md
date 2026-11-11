# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain HTML, CSS, and vanilla JavaScript at the repository root. No framework and no build step. Deployed by GitHub Pages from `main` at `https://mohammedbagowabair.github.io/Kalei-Color-Art-Shop-Website/`.

## Users

Artist prospects evaluating a sellable shop demo, and visitors who browse the fictional shop and start an order on WhatsApp.

## Product Purpose

A demo storefront for the fictional contemporary artist brand Kalei. It shows original art and prints with prices and sends the visitor to WhatsApp to order or ask a question. Success is a clear, priced catalog and a working WhatsApp handoff for a named piece.

## Positioning

A colourful shop demo with visible USD prices and WhatsApp-only ordering. Sibling demos are a dark editorial gallery (price on request) and a paper sketchbook studio. This one is a priced, filterable shop.

## Operating Context

Visitors filter and sort works, open a quick view, and continue the conversation on WhatsApp. There is no cart, checkout, or payment.

## Capabilities and Constraints

- Brand: Kalei. Artist name chosen for this demo: Kalei Solano (fictional).
- Sections: hero, shop gallery, print sizes, about, FAQ, contact.
- Gallery filters: style (Abstract, Pop, Geometric, Illustration) and format (Originals, Prints). Sort by price low/high.
- Quick view: keyboard navigation, Escape, focus management.
- Every piece shows a USD price. Visible note: "Demo prices for illustration only."
- Every piece card and the quick view include an Order on WhatsApp link. A general contact button and a floating WhatsApp button use the same number.
- WhatsApp number, the only one allowed: 967783964784. Links use `https://wa.me/967783964784?text=` with a message that names the piece, format, and price.
- FAQ topics (shipping, framing, commissions) are placeholders that point to WhatsApp. No invented policies.
- Artwork: 10–12 royalty-free Unsplash or Pexels photographs, stored in the repo as optimized WebP with srcset, width, height, and lazy loading. Footer credits sources and states that the artist is fictional and the site is a demo.
- Prices on the pieces are demo prices the brief asked to show. They are not a real offer.

## Brand Commitments

Vivid and playful-premium. Saturated multi-colour palette (electric blue, coral, sunflower, mint on off-white), chunky geometric or grotesk display type, colour-blocked sections, blob and shape SVG accents, bento-grid layout, hover tilts and colour-shift micro-interactions, and a marquee strip. Artwork spans abstract, pop, geometric, colour-field, and illustration. Must look clearly different from the dark editorial gallery and the paper sketchbook studio.

## Evidence on Hand

Stock photographs downloaded into `images/works/`, credited in the footer. No real artist biography, exhibition history, shipping policy, framing policy, or commission terms. Those stay as WhatsApp questions.

## Product Principles

- Show a price on every piece, and label the prices as a demo.
- Ordering leaves the site for WhatsApp. Nothing is charged here.
- Do not invent policies. Unanswered practical questions go to WhatsApp.
- The artist and the works' authorship are fictional; the photographs are credited stock stand-ins.
- The shop has to stay usable on a 360px screen and by keyboard.

## Accessibility & Inclusion

Responsive from 360px up, no horizontal scroll. Visible focus, semantic HTML, text alternatives, contrast that holds on the bright palette, and `prefers-reduced-motion` respected. Target Lighthouse performance and SEO of 90 or above.
