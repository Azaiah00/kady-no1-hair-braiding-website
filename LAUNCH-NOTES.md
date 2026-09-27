# Launch notes — Kady No1 Hair Braiding

Everything below must be confirmed with the owner before the site goes live. Nothing on the site was invented;
where a fact came from a third-party listing it is noted here so it can be verified.

## 1. Facts to confirm
- [ ] **Hours**: site shows Mon–Fri 8am–8pm, Sat 6am–9pm, Sun 8am–6pm by appointment (from the Fresha listing).
      Booksy currently shows different daily hours (e.g. 10am–7pm) and says "we still take appointments before or after
      hours, just call." Confirm the real hours; they appear in the footer, visit page, quick facts, FAQ, JSON-LD and llms.txt.
- [ ] **Google rating**: 4.3 from 290 reviews (home page, trust strip, review section, aggregateRating JSON-LD, llms.txt).
      Re-check the live numbers at launch. (Booksy shows its own 4.2 from 216 reviews; not used on the site.)
- [ ] **All prices and durations**: taken from the Booksy menu (September 2026) and shown on styles.html, home page
      signature styles ("From $160" etc.), quick facts, FAQ, JSON-LD offer catalog and llms.txt. Confirm every line, and
      confirm which services include braiding hair (the site repeats Booksy's own notes: "We provide you the hair", "You
      bring your curly hair", etc.).
- [ ] **"Hair provided on most braid and loc styles"** (trust strip), derived from the Booksy service notes.
- [ ] **Dreadlocks $60 / 1 hr 30 min**: confirm what this service covers (starts, retwist or both) and whether separate
      loc-start and retwist prices should be listed. The site says "Loc service; details confirmed at booking."
- [ ] **Loc starts and maintenance**: from the owner's caption "We starts and maintain locks."
- [ ] **Color braids** ("Tell us your shade when you book"): confirm colored hair is available and whether it costs extra.
- [ ] **Parking**: site says "On-site parking is available," based on the Booksy amenities list. Confirm, and add any
      detail (lot in front, number of spaces, overflow).
- [ ] **Wheelchair accessibility, child-friendly, Wi-Fi**: from Booksy amenities; shown in the visit FAQ, prep guide and JSON-LD.
- [ ] **Texting**: contact page offers "Text (804) 261-0313" (sms: link). Confirm the number receives texts, or remove it.
- [ ] **Walk-ins welcome** (Instagram bio) and **Sundays by appointment** (Instagram post): confirm still current.
- [ ] **Area wording**: "Brook Road corridor, North Richmond, near the Henrico line" — confirm the owner is happy with it.

## 2. Policies to supply (placeholders written as reassurance, no numbers invented)
- [ ] **Lateness policy**: currently "Call us right away so we can adjust your appointment." Add a grace period
      (e.g. minutes allowed) if the salon has one.
- [ ] **Deposit / cancellation policy**: site says any requirement "is shown on Booksy before you confirm." Add specifics
      if the owner wants them on the site. No deposit amounts are stated anywhere.
- [ ] **Price confirmation**: site states "your braider confirms the total with you before the first part" and add-ons
      are listed on Booksy. Confirm this matches how the salon works (it answers the price-change concern in reviews).
- [ ] **Prep guide** (visit.html and styles.html): "We recommend arriving washed, blown out and detangled" and the
      Detangle & Blow Dry / Shampoo & Blow Dry add-ons. Confirm the recommendation.

## 3. Photos and credits
- All photos are from the business's own public Instagram/Facebook (@kadyno1hairbraiding). The owner must approve
  and license their use on the website, and confirm every client pictured has consented to appear.
- Photos avoid featuring children's faces and heavy promo text. The kids' braids section uses an illustrated panel
  instead of a photo; swap in an approved photo if the owner has one (face not the focus).
- Interior photos come from short-video stills and are low resolution (540–640 px wide). A 20-minute professional shoot
  of the salon (marble floor, gold chairs, arched mirrors, chandelier) plus 8–10 finished styles would lift the site further.
- Logo: the raster logo was cropped from the Instagram profile picture; the animated line drawing is a new vector
  interpretation inspired by it. Request the original logo file (SVG/AI/PNG) and confirm approval of the line-art version.

## 4. Items to swap or set up
- [ ] **Booking deep links**: every "Book this style" button goes to the Booksy business page. If the owner prefers,
      replace with per-service Booksy links.
- [ ] **Contact form**: a Netlify Form (`style-request`), with honeypot spam protection and client-side validation. It works
      only once deployed on Netlify; enable form notifications to the owner's email in Netlify.
- [ ] **Email address**: none was provided, so none is shown and none is in the schema. Add one if the owner wants it.
- [ ] **Google Maps**: the directions link uses a Maps search URL for the business name and address. Swap in the exact
      Google Business Profile link once confirmed.
- [ ] **Staff**: Booksy lists staff first names, but per brief no owner name or stylist count is shown. Add a team section
      only with the owner's approval.

## 5. Domain
- Proposed domain: **kadyno1braiding.com** (used for canonical, Open Graph, sitemap, robots and llms.txt).
- After launch: submit the sitemap in Google Search Console, update the Google Business Profile, Booksy and Instagram
  website fields, and request a few new Google reviews linking to the site.


## Live preview domain (updated 27 Sep 2026)
The site is live at https://kady-no1-hair-braiding-website.netlify.app/ and every canonical URL, Open Graph/Twitter tag, JSON-LD URL, sitemap.xml, robots.txt and llms.txt now points there, so text-message and social link previews show this address.
When the owner's own domain (kadyno1braiding.com) is connected in Netlify, find-and-replace `kady-no1-hair-braiding-website.netlify.app` with `kadyno1braiding.com` across the .html/.xml/.txt/.toml files, then redeploy.
