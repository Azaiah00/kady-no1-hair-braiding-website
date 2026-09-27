# Kady No 1 Hair Braiding — spec website

A finished, static spec website for **Kady No1 Hair Braiding LLC**, 7601 Brook Rd, Ste F, Richmond, VA 23227.
Designed and built by Couture House Co. as a pitch for the owner and ready to launch as-is once the items in
`LAUNCH-NOTES.md` are confirmed.

- Design concept: **"Parting Lines"**: rust, cream, ink, gold and marble; DM Serif Display + Figtree (self-hosted).
- Motion: the Kady No1 line-art portrait draws itself as you scroll the hero; braided "parting line" dividers draw
  outward from a centre part; photos open with a vertical part; marble sheen glides across the salon section.
  Everything respects `prefers-reduced-motion`, and all content is visible without JavaScript.
- No build step, no frameworks, no third-party scripts or fonts.

## Pages
| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, trust strip, signature styles, salon, how booking works, gallery teaser, review themes, quick facts, FAQ |
| `styles.html` | Full service menu with Booksy prices and durations, grouped by style |
| `gallery.html` | Filterable gallery with an accessible lightbox |
| `visit.html` | Address, hours, directions, parking, booking policies, prep guide, visit FAQ |
| `contact.html` | Netlify style-request form plus call / text / Instagram / Booksy options |
| `404.html` | Branded not-found page |

Also: `robots.txt`, `sitemap.xml`, `llms.txt` (fact sheet for AI answer engines), `site.webmanifest`, `netlify.toml`.

## Preview locally
Double-click `index.html`, or (recommended, so fonts and the 404 page behave like production):

```bash
cd kady-no1-hair-braiding
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Netlify
1. Create a new site in Netlify and drag this folder onto "Deploy manually" (or connect a Git repo containing it).
   No build command; publish directory is the folder root (already set in `netlify.toml`).
2. In **Site configuration > Forms**, enable form detection. The `style-request` form is picked up automatically on
   deploy. Add an email notification to the owner's inbox.
3. Add the custom domain (below) under **Domain management** and enable HTTPS.
4. Submit `https://kadyno1braiding.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
5. Update the Google Business Profile, Instagram bio and Booksy profile "website" field to the new domain.

## Domain
Proposed: **kadyno1braiding.com** (register at any registrar and point it to Netlify). All canonical, Open Graph and
sitemap URLs already use this domain; if a different domain is chosen, search-and-replace `kadyno1braiding.com`.

## Editing
All pages are plain HTML. Styles live in `assets/css/site.css`, behaviour in `assets/js/site.js`, photos in `assets/img/`.
Prices appear in `styles.html`, the home page quick facts/FAQ, the JSON-LD blocks and `llms.txt`; update all of them
together when prices change.
