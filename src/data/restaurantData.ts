import { MenuItem, GalleryItem, Testimonial, FAQItem } from '@/types';

export const RESTAURANT_INFO = {
  name: "The Garden Table",
  tagline: "Where Seasonal Ingredients Meet Timeless Craft",
  est: "2012",
  location: "Kensington, London",
  address: "42 Kensington Church Street, London W8 4DB",
  phone: "+44 (0) 20 7946 0888",
  email: "reservations@thegardentable.co.uk",
  hours: {
    lunch: "Wed – Sun: 12:00 PM – 3:00 PM",
    dinner: "Tue – Sun: 5:30 PM – 11:00 PM",
    bar: "Tue – Sun: 5:00 PM – Midnight",
    closed: "Mondays (Private Hire available)"
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    michelin: "https://guide.michelin.com"
  },
  whatsapp: "+442079460888"
};

export const SIGNATURE_DISHES: MenuItem[] = [
  { id: "sig-1", name: "Loch Fyne Wild Salmon & Sorrel", category: "mains", description: "Pan-roasted Scottish salmon with garden sorrel emulsion, heirloom pickled radishes, and crispy sea purslane.", price: 38, dietary: ["GF", "DF"], image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200", isSignature: true, pairingNote: "Pair with 2021 Chablis 1er Cru 'Montée de Tonnerre'" },
  { id: "sig-2", name: "Dry-Aged Wagyu & Truffle Emulsion", category: "mains", description: "45-day aged Lake District Wagyu ribeye, smoked bone marrow potato mousseline, black perigord truffle jus.", price: 54, dietary: ["GF"], image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200", isSignature: true, pairingNote: "Pair with 2018 Barolo DOCG, Massolino" },
  { id: "sig-3", name: "Morel & Wild Herb Botanical Risotto", category: "starters", description: "Acquerello aged carnaroli rice, hand-foraged Kent morels, 24-month parmesan froth, wild garlic oil.", price: 28, dietary: ["V", "GF"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=1200", isSignature: true, pairingNote: "Pair with 2020 Meursault, Domaine des Comtes Lafon" },
  { id: "sig-4", name: "Crisp Mille-Feuille & Wild Berries", category: "desserts", description: "Caramelized puff pastry layers, Tahitian vanilla bean chantilly, Scottish wild strawberries, elderflower gelée.", price: 18, dietary: ["V"], image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1200", isSignature: true, pairingNote: "Pair with 2017 Château d'Yquem Sauternes" }
];

export const ALL_MENU_ITEMS: MenuItem[] = [
  ...SIGNATURE_DISHES,
  { id: "m-1", name: "Heirloom Tomato & Whipped Ricotta", category: "starters", description: "Heritage Isle of Wight tomatoes, house-made sheep milk ricotta, bronze fennel, cold-pressed green olive oil.", price: 19, dietary: ["V", "GF"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200", pairingNote: "Pair with Sancerre Blanc 2022" },
  { id: "m-2", name: "Orkney Scallop Crudo", category: "starters", description: "Hand-dived raw scallops, pickled green strawberries, finger lime pearls, dashi oil, shiso blossom.", price: 26, dietary: ["GF", "DF", "RAW"], image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200", pairingNote: "Pair with Nyetimber Classic Cuvée MV" },
  { id: "m-3", name: "Salt-Baked Heritage Beetroot", category: "starters", description: "Golden and Chioggia beets, whipped smoked goat curd, candied hazelnuts, blackberry balsamic reduction.", price: 17, dietary: ["V", "GF"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200", pairingNote: "Pair with Austrian Grüner Veltliner" },
  { id: "m-4", name: "Cornish Turbot & Champagne Velouté", category: "mains", description: "Line-caught turbot cooked on the bone, braised leek hearts, brown butter emulsion, Oscietra caviar.", price: 46, dietary: ["GF"], image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200", pairingNote: "Pair with Puligny-Montrachet 2021" },
  { id: "m-5", name: "Rhubarb & Botanical Pavlova", category: "desserts", description: "Crisp brown sugar meringue, Yorkshire forced rhubarb compote, lemon thyme cream, pistachio soil.", price: 16, dietary: ["V", "GF"], image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1200", pairingNote: "Pair with Royal Tokaji 5 Puttonyos" },
  { id: "m-6", name: "70% Single-Origin Dark Chocolate Dome", category: "desserts", description: "Valrhona smoked dark chocolate, salted miso caramel core, smoked sea salt flakes, roasted barley gelato.", price: 19, dietary: ["V"], image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1200", pairingNote: "Pair with 20 Year Old Tawny Port" },
  { id: "m-7", name: "Kensington Smokehouse Old Fashioned", category: "botanical-cellar", description: "Oak barrel-aged bourbon, homemade charred fig syrup, aromatic bitters, cedar wood mist.", price: 18, dietary: ["VG", "GF"], image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1c?auto=format&fit=crop&q=80&w=1200", pairingNote: "Signature cocktail distilled in-house" },
  { id: "m-8", name: "Garden Botanist French 75", category: "botanical-cellar", description: "Botanical London dry gin, pressed English pear, fresh verbena, topped with Billecart-Salmon Brut Rosé.", price: 21, dietary: ["VG", "GF"], image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1c?auto=format&fit=crop&q=80&w=1200" },
  { id: "m-9", name: "Rare Geisha Pour-Over & Botanical Infusion", category: "botanical-cellar", description: "Single-estate Panama Geisha coffee or house-foraged garden mint & chamomile tisane served in hand-thrown ceramics.", price: 9, dietary: ["VG", "GF"], image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g-1", title: "The Botanical Dining Glasshouse", category: "Interior", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[4/3]", caption: "Natural daylight filtering into our restored Kensington glasshouse." },
  { id: "g-2", title: "Culinary Precision at the Pass", category: "Food", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[3/4]", caption: "Executive Chef Arthur Vance plating the wild salmon course." },
  { id: "g-3", title: "Main Dining Salon", category: "Interior", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[4/3]", caption: "Bespoke brass fixtures, linen draping, and velvet banquettes." },
  { id: "g-4", title: "Lake District Wagyu Tenderloin", category: "Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[4/3]", caption: "Served with hand-gathered black truffles and herb emulsification." },
  { id: "g-5", title: "The Garden Bar & Aperitifs", category: "Events", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[3/4]", caption: "Pre-dinner botanical infusions and vintage biodynamic wine list." },
  { id: "g-6", title: "Smoked Botanical Cocktails", category: "Food", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1c?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[4/3]", caption: "Crafted with house shrubs, botanicals, and hand-cut ice." },
  { id: "g-7", title: "Private Hearth Tasting Dinners", category: "Events", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[4/3]", caption: "Intimate 8-course wine pairing evenings for up to 18 guests." },
  { id: "g-8", title: "Artisanal Mille-Feuille", category: "Food", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1200", aspect: "aspect-[3/4]", caption: "Delicate caramel pastry sheets with Tahitian vanilla crème." }
];

export const TIMELINE_STORIES = [
  { year: "2012", title: "The Seed in Kensington", description: "Founded by Chef Arthur Vance with a simple philosophy: cooking should be an intimate conversation between soil, season, and craft." },
  { year: "2016", title: "Walled Garden Expansion", description: "We acquired our 4-acre biodynamic supplier farm in Kent, allowing same-day morning harvests to reach our kitchen pass by lunch." },
  { year: "2019", title: "Michelin Recognition", description: "Awarded our Michelin star and the Michelin Green Star for sustainable gastronomy and zero-waste botanical practices." },
  { year: "2024", title: "The Glasshouse Revival", description: "Unveiling our redesigned Victorian greenhouse salon with brass fixtures, bespoke tableware, and an expanded rare cellar." }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t-1", author: "Eleanor St. Claire", role: "Culinary Critic, The Sunday Times", rating: 5, quote: "The Garden Table achieves that rarest of gastronomic feats: dishes of breathtaking complexity that still taste like the earth they came from.", source: "The Sunday Times", date: "May 2024" },
  { id: "t-2", author: "Lord Henry Cavendish", role: "Private Member", rating: 5, quote: "From the delicate Loch Fyne Salmon to the warm, attentive sommelier guidance, every evening here feels like an unhurried sanctuary in central London.", source: "Verified Guest", date: "October 2024" },
  { id: "t-3", author: "Chef Michel Roux", role: "Michelin Guide Contributor", rating: 5, quote: "Vance's mastery of herbaceous broths and micro-seasonal balance is peerless. One of Britain’s most essential dining rooms.", source: "Michelin Guide Review", date: "August 2024" },
  { id: "t-4", author: "Claire & Julian Bennett", role: "Anniversary Celebration", rating: 5, quote: "We celebrated our 10th anniversary at the Glasshouse table. The attention to dietary requirements without compromising flavor was simply unmatched.", source: "Google 5-Star Review", date: "January 2025" }
];

export const FAQ_ITEMS: FAQItem[] = [
  { id: "faq-1", category: "Dining & Dress", question: "What is your dress code?", answer: "We recommend smart-casual attire. While jacket and tie are not required, athletic wear, beachwear, and flip-flops are not permitted in our dining rooms." },
  { id: "faq-2", category: "Reservations", question: "How far in advance can I reserve a table?", answer: "Reservations open 60 days in advance on the 1st of each month at 9:00 AM GMT. For private hire and parties of 7 or more, please contact our events team directly." },
  { id: "faq-3", category: "Dietary", question: "Can you accommodate strict allergies and vegan diets?", answer: "Yes, our culinary team prepares full plant-based (VG), gluten-free (GF), and dairy-free (DF) tasting menus with 24 hours prior notice. Please indicate all allergies when booking." },
  { id: "faq-4", category: "Takeaway & Ordering", question: "How does the online takeaway & delivery service work?", answer: "Our curated takeaway menu is packaged in heat-retaining, compostable insulated boxes. Collection is available from our Kensington concierge within 35 minutes, and courier delivery within 4 miles." },
  { id: "faq-5", category: "Corkage & Cellar", question: "Do you allow corkage for special vintage bottles?", answer: "We welcome guests bringing their own special bottles up to 2 bottles per table (750ml). Corkage is £45 per bottle, waived if you purchase a bottle from our rare cellar list." },
  { id: "faq-6", category: "Location & Parking", question: "Is valet parking available nearby?", answer: "We offer complimentary valet parking for dinner guests on Kensington Church Street from 6:00 PM onwards. High Street Kensington underground station is a 4-minute walk." }
];
