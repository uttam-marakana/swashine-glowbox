export const company = {
  name: "Swashine Glowbox",
  parent: "Swastik Industries",
  tagline: "Premium LED Glowboxes | Made in India",
  description:
    "Manufacturer of premium LED glowboxes, custom signage and retail display solutions from Rajkot, Gujarat.",
  address:
    "Gate 2, Pan Business Park, Behind Kishan Petrol Pump, Opp. Laxmi Loader, Rajkot, Gujarat – 360022",
  phone: "+91 88663 67360",
  whatsapp: "918866367360",
  email: "swastik.ind01@gmail.com",
  instagram: "https://instagram.com/swashine_glowbox",
  facebook: "https://facebook.com/Swastik.ind",
  founder: {
    name: "Shyam V. Vaghasiya",
    role: "Public Face & Marketing Head",
    bio: "Marketing, Business networking, Customer outreach & Strategic partnerships.",
  },
};

export const orderNotes = [
  "Print charge and GST will be applicable",
  "Shipping charge will be calculated at dispatch",
  "Full payment needed for order confirmation",
  "Delivery time will be 5 to 6 days after payment received",
  "There will be no refund for order cancellation",
];

// Vite: string paths like "/src/assets/..." do NOT load — resolve via import.meta.glob
const productImageModules = import.meta.glob(
  "../assets/images/products/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" },
);

/** @param {string} relativePath under products/ e.g. "p1-18x24/file.png" */
function resolveProductImage(relativePath) {
  const normalized = relativePath.replace(/^\/+/, "").replace(/\\/g, "/");
  const entry = Object.entries(productImageModules).find(([key]) => {
    const k = key.replace(/\\/g, "/");
    return k.endsWith("/" + normalized) || k.endsWith(normalized);
  });
  if (entry) return entry[1];
  return `/images/products/${normalized}`;
}

function gallery(paths) {
  return paths
    .map((p) => {
      const rel = String(p)
        .replace(/^\/src\/assets\/images\/products\//, "")
        .replace(/^\/images\/products\//, "")
        .replace(/^src\/assets\/images\/products\//, "");
      return resolveProductImage(rel);
    })
    .filter(Boolean);
}

const img = {
  p1: gallery([
    "p1-18x24/18x24-inch-glowbox-img1.png",
    "p1-18x24/18-24-inch-img2.png",
    "p1-18x24/18-24-inch-img3.png",
    "p1-18x24/18-24-inch-img4.png",
    "p1-18x24/18-24-inch-img5.png",
    "p1-18x24/18-24-inch-img6.png",
  ]),
  p2: gallery([
    "p2-24x36/36x24-inch-glowbox-img1.png",
    "p2-24x36/36x24-inch-img1.png",
    "p2-24x36/36x24-inch-img2.png",
    "p2-24x36/36x24-inch-img3.png",
    "p2-24x36/36x24-inch-img4.png",
    "p2-24x36/36x24-inch-img5.png",
  ]),
  p3: gallery([
    "p3-24x42/24x42-inch-glowbox-img1.png",
    "p3-24x42/42x24-inch-img1.png",
    "p3-24x42/42x24-inch-img2.png",
    "p3-24x42/42x24-inch-img3.png",
    "p3-24x42/42x24-inch-img4.png",
    "p3-24x42/42x24-inch-img5.png",
  ]),
  p4: gallery([
    "p4-18x12/18x12-inch-glowbox-img.png",
    "p4-18x12/18x12_product_img1.png",
    "p4-18x12/18x12_product_img2.png",
    "p4-18x12/18x12_product_img3.png",
    "p4-18x12/18x12_product_img4.png",
    "p4-18x12/18x12_product_img5.png",
  ]),
  p5: gallery([
    "p5-a4-tabletop/a4-tabletop-img1.png",
    "p5-a4-tabletop/a4-tabletop-img2.png",
    "p5-a4-tabletop/a4-tabletop-img3.png",
    "p5-a4-tabletop/a4-tabletop-img4.png",
    "p5-a4-tabletop/a4-tabletop-img5.png",
  ]),
  p6: gallery([
    "p6-arch/arch_img.png",
    "p6-arch/arch_img1.png",
    "p6-arch/arch_img2.png",
    "p6-arch/arch_img3.png",
  ]),
  p7: gallery([
    "p7-a5-tabletop/a5-tabletop-img1.png",
    "p7-a5-tabletop/a5-tabletop-img2.png",
    "p7-a5-tabletop/a5-tabletop-img3.png",
    "p7-a5-tabletop/a5-tabletop-img4.png",
    "p7-a5-tabletop/a5-tabletop-img5.png",
  ]),
  p8: gallery([
    "p8-custom/custom_size_img1.png",
    "p8-custom/custom_size_img2.png",
    "p8-custom/custom_size_img3.png",
    "p8-custom/custom_size_img4.png",
    "p8-custom/custom_size_img5.png",
    "p8-custom/custom_size_img6.png",
    "p8-custom/custom_size_img7.png",
    "p8-custom/custom_size_img8.png",
  ]),
};

export const products = [
  {
    id: 1,
    slug: "18x24-inch-led-glowbox",
    name: "18×24 Inch LED Glowbox",
    category: "Standard",
    size: "18 × 24 inches",
    sizeKey: "18x24",
    priceRange: "mid",
    priceLabel: "₹4,000 – ₹7,000",
    description:
      "Popular mid-size LED glowbox with black aluminium frame and SWASHINE branding. Ideal for retail displays, menus, temples and office branding.",
    features: [
      "Black aluminium frame",
      "SWASHINE logo",
      "Top-slot tool-free poster change",
      "Industrial SMPS",
      "Wall mounting hardware",
    ],
    includes: "Frame + Power supply + Cord",
    badge: "Popular",
    image: img.p1[0],
    gallery: img.p1,
    type: "wall",
  },
  {
    id: 2,
    slug: "24x36-inch-led-glowbox",
    name: "24×36 Inch LED Glowbox",
    category: "Standard",
    size: "24 × 36 inches",
    sizeKey: "24x36",
    priceRange: "mid",
    priceLabel: "₹6,000 – ₹10,000",
    description:
      "Large format LED glowbox perfect for commercial branding, restaurant menus, temple displays and shopfront signage.",
    features: [
      "Black aluminium frame",
      "SWASHINE logo",
      "High brightness LEDs",
      "Tool-free poster change",
      "Commercial grade",
    ],
    includes: "Frame + Power supply + Cord",
    badge: null,
    image: img.p2[0],
    gallery: img.p2,
    type: "wall",
  },
  {
    id: 3,
    slug: "24x42-inch-led-glowbox",
    name: "24×42 Inch LED Glowbox",
    category: "Large Format",
    size: "24 × 42 inches",
    sizeKey: "24x42",
    priceRange: "high",
    priceLabel: "₹8,000 – ₹14,000",
    description:
      "Extra-large illuminated display for impactful wall installations — wedding photos, landscapes, commercial posters and more.",
    features: [
      "Black aluminium frame",
      "Extra large size",
      "Even illumination",
      "Tool-free poster change",
    ],
    includes: "Frame + Power supply + Cord",
    badge: "Large",
    image: img.p3[0],
    gallery: img.p3,
    type: "wall",
  },
  {
    id: 4,
    slug: "12x18-inch-led-glowbox",
    name: "12×18 Inch LED Glowbox",
    category: "Compact",
    size: "12 × 18 inches",
    sizeKey: "12x18",
    priceRange: "low",
    priceLabel: "₹2,500 – ₹4,500",
    description:
      "Compact LED glowbox ideal for ice-cream parlours, cafés, small menus, deity frames and home décor.",
    features: [
      "Compact size",
      "Black aluminium frame",
      "SWASHINE logo",
      "Tool-free poster change",
    ],
    includes: "Frame + Power supply + Cord",
    badge: null,
    image: img.p4[0],
    gallery: img.p4,
    type: "wall",
  },
  {
    id: 5,
    slug: "a4-table-top-led-glowbox",
    name: "A4 Table Top LED Glowbox",
    category: "Desktop",
    size: "A4 (≈ 210 × 297 mm)",
    sizeKey: "a4",
    priceRange: "low",
    priceLabel: "₹1,500 – ₹3,000",
    description:
      "Battery-operated free-standing table-top illuminated display. Perfect for counters, reception desks, cafés and product showcases.",
    features: [
      "A4 size",
      "Battery operated",
      "Free-standing base",
      "Interchangeable print",
      "Compact footprint",
    ],
    includes: "Standee unit + Base + Battery",
    badge: "Battery",
    image: img.p5[0],
    gallery: img.p5,
    type: "desktop",
  },
  {
    id: 6,
    slug: "arch-glowbox",
    name: "Arch Glowbox",
    category: "Premium",
    size: "24 × 36 inches",
    sizeKey: "24x36",
    priceRange: "high",
    priceLabel: "₹9,000 – ₹15,000",
    description:
      "Signature arched-top premium glowbox. Perfect for temples, religious décor, boutique stores and statement wall displays.",
    features: [
      "Unique arch shape",
      "Premium finish",
      "Includes power supply",
      "Includes print",
      "1 Year SMPS warranty",
    ],
    includes: "Frame + Power supply + Print",
    badge: "Bestseller",
    image: img.p6[0],
    gallery: img.p6,
    type: "arch",
    note: "Excluding GST",
  },
  {
    id: 7,
    slug: "a5-table-top-led-glowbox",
    name: "A5 Table Top LED Glowbox",
    category: "Portable",
    size: "A5",
    sizeKey: "a5",
    priceRange: "low",
    priceLabel: "₹1,200 – ₹2,500",
    description:
      "Battery-operated portable table-top glowbox with 4–5 hour backup. Ideal for events, counters and mobile displays.",
    features: [
      "Battery backup 4–5 hours",
      "Type-C charging",
      "ON/OFF button",
      "Battery indicator lights",
      "Portable",
    ],
    includes: "Unit + Base + Battery",
    badge: "Battery",
    image: img.p7[0],
    gallery: img.p7,
    type: "desktop",
  },
  {
    id: 8,
    slug: "custom-size-glowbox",
    name: "Custom Size Glowbox",
    category: "Custom / Jumbo",
    size: "Up to 2 × 6 ft",
    sizeKey: "custom",
    priceRange: "high",
    priceLabel: "₹900 / sq ft",
    description:
      "Fully customized large format glowbox. Maximum size 2 × 6 ft. Priced at ₹900 per sq ft. Ideal for floor standees, mall displays and large commercial branding.",
    features: [
      "Fully custom size",
      "Maximum 2 × 6 ft",
      "Floor standee options",
      "Commercial grade",
    ],
    includes: "Frame + Power supply (Print, shipping & GST extra)",
    badge: "Custom",
    image: img.p8[0],
    gallery: img.p8,
    type: "custom",
    note: "Print, shipping and GST not included",
  },
];

export const catalogs = [
  {
    id: 1,
    title: "Swashine Product Catalogue 2026",
    description:
      "Full product range — wall frames, arch, table-top and custom sizes with specifications.",
    pages: "12 pages",
    type: "PDF",
    file: null,
    whatsappNote: "Please send me the full product catalogue PDF",
  },
  {
    id: 2,
    title: "Arch Glowbox Collection",
    description:
      "Premium arched designs for temples, boutiques and statement wall displays.",
    pages: "4 pages",
    type: "PDF",
    file: null,
    whatsappNote: "Please send me the Arch Glowbox catalogue",
  },
  {
    id: 3,
    title: "Table Top & Portable Range",
    description: "A4 & A5 tabletop glowboxes — both battery-operated.",
    pages: "3 pages",
    type: "PDF",
    file: null,
    whatsappNote: "Please send me the Table Top catalogue",
  },
  {
    id: 4,
    title: "Price List (Retail & Dealer)",
    description:
      "Current pricing for standard sizes. Custom quotes on request.",
    pages: "2 pages",
    type: "PDF",
    file: null,
    whatsappNote: "Please send me the latest price list",
  },
];

export const sizeFilters = [
  { key: "all", label: "All Sizes" },
  { key: "12x18", label: "12×18 in" },
  { key: "18x24", label: "18×24 in" },
  { key: "24x36", label: "24×36 in" },
  { key: "24x42", label: "24×42 in" },
  { key: "a4", label: "A4" },
  { key: "a5", label: "A5" },
  { key: "custom", label: "Custom / Jumbo" },
];

export const priceFilters = [
  { key: "all", label: "All Prices" },
  { key: "low", label: "Under ₹5,000" },
  { key: "mid", label: "₹5,000 – ₹10,000" },
  { key: "high", label: "₹10,000+" },
];

export const features = [
  {
    icon: "Zap",
    title: "Ultra Bright LEDs",
    desc: "High brightness with even illumination and low power consumption.",
  },
  {
    icon: "RefreshCw",
    title: "Tool-Free Poster Change",
    desc: "Innovative top-slot system. Change graphics in seconds without tools.",
  },
  {
    icon: "Shield",
    title: "Premium Build",
    desc: "Heavy-duty aluminium frame + scratch-resistant acrylic.",
  },
  {
    icon: "Ruler",
    title: "Any Size Possible",
    desc: "Expert custom manufacturing from A5 to 2 × 6 ft jumbo formats.",
  },
];

export const stats = [
  { value: "8+", label: "Product Variants" },
  { value: "1 Yr", label: "SMPS Warranty" },
  { value: "5–6", label: "Days Delivery" },
  { value: "100%", label: "Made in India" },
];

export const useCases = [
  {
    title: "Temples & Religious",
    desc: "Arch & standard glowboxes for deity frames and mandir décor.",
  },
  {
    title: "Retail & Showrooms",
    desc: "Product displays, brand boards and window lighting.",
  },
  {
    title: "Restaurants & Cafés",
    desc: "Menu boards, ice-cream parlour displays and counters.",
  },
  {
    title: "Offices & Events",
    desc: "Reception branding, exhibitions and portable table-top units.",
  },
];

export const beforeAfter = [
  {
    title: "Temple Display",
    beforeLabel: "OFF",
    afterLabel: "ON",
    description: "See the dramatic difference when your glowbox lights up.",
  },
  {
    title: "Retail Menu Board",
    beforeLabel: "OFF",
    afterLabel: "ON",
    description:
      "High brightness turns ordinary prints into eye-catching displays.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Choose product / size",
    desc: "Pick a standard size or use the custom calculator (max 2 × 6 ft at ₹900/sq ft).",
  },
  {
    step: "02",
    title: "Share artwork",
    desc: "Send print-ready files on WhatsApp, or ask us to print. See Artwork Guidelines for specs.",
  },
  {
    step: "03",
    title: "Confirm & pay",
    desc: "We share final quote (print + GST + shipping). Full payment confirms the order.",
  },
  {
    step: "04",
    title: "Manufacture & deliver",
    desc: "Made in Rajkot. Typical delivery 5–6 days after payment.",
  },
];

export const installationTips = [
  {
    title: "Wall-mounted frames",
    desc: "Use the included mounting hardware on a solid wall. Keep power socket nearby for the SMPS cord.",
  },
  {
    title: "Table-top (A4 / A5)",
    desc: "Place on counter or desk. Battery models: charge via Type-C; backup about 4–5 hours.",
  },
  {
    title: "Poster change",
    desc: "Top-slot / tool-free system — slide the print in from the top. No screws needed for graphic change.",
  },
  {
    title: "Arch & large formats",
    desc: "Two-person handling recommended. Ensure level mounting and secure cable management.",
  },
];

export const industries = [
  {
    title: "Temples & Religious",
    desc: "Arch glowboxes and deity frames with rich illumination.",
    emoji: "🛕",
    query: "Temple / religious glowbox",
  },
  {
    title: "Retail & Showrooms",
    desc: "Brand boards, product displays and window lighting.",
    emoji: "🛍️",
    query: "Retail display glowbox",
  },
  {
    title: "Cafés & Restaurants",
    desc: "Menu boards and counter displays that stay bright all day.",
    emoji: "☕",
    query: "Café menu glowbox",
  },
  {
    title: "Ice-cream & QSR",
    desc: "Compact 12×18 and table-top units for flavour boards.",
    emoji: "🍦",
    query: "Ice cream parlour menu board",
  },
  {
    title: "Corporate offices",
    desc: "Reception branding and lobby statement pieces.",
    emoji: "🏢",
    query: "Office reception glowbox",
  },
  {
    title: "Exhibitions & Events",
    desc: "Portable and custom sizes for stalls and launches.",
    emoji: "🎪",
    query: "Exhibition glowbox display",
  },
];

export const warrantyPoints = [
  {
    title: "1 Year SMPS warranty",
    desc: "Power supply covered against manufacturing defects.",
  },
  {
    title: "Aluminium frame build",
    desc: "Durable black / silver frames designed for daily commercial use.",
  },
  {
    title: "Made in Gujarat",
    desc: "Manufactured in Rajkot under Swastik Industries.",
  },
  {
    title: "What is not covered",
    desc: "Physical damage, water damage, misuse, or print fading from customer artwork issues.",
  },
];

export const caseStudies = [
  {
    title: "Temple arch display",
    place: "Gujarat",
    result: "Arch 24×36 with deity print — high visibility in mandir hall.",
  },
  {
    title: "Machine tools branding",
    place: "Industrial client",
    result: "Multiple illuminated boards for brand + GST contact panels.",
  },
  {
    title: "Café menu boards",
    place: "QSR / ice-cream",
    result: "12×18 and table-top units for flavour and price lists.",
  },
  {
    title: "Retail window lighting",
    place: "Showroom",
    result: "18×24 and 24×36 frames for seasonal campaigns.",
  },
];

export const faqs = [
  {
    q: "What is the maximum custom size?",
    a: "Up to 2 × 6 ft. Custom work is charged at ₹900 per sq ft (print, shipping and GST extra unless stated).",
  },
  {
    q: "Is print included in the price?",
    a: "Usually print is extra unless the product says “includes print” (e.g. Arch Glowbox packages). Always confirm on WhatsApp.",
  },
  {
    q: "How long is delivery?",
    a: "Typically 5–6 days after full payment is received. Shipping time may vary by city.",
  },
  {
    q: "Do A4 and A5 table-tops use battery?",
    a: "Yes. Both are battery-operated. A5 offers about 4–5 hours backup with Type-C charging.",
  },
  {
    q: "Is there a warranty?",
    a: "1 year warranty on the SMPS (power supply) against manufacturing defects.",
  },
  {
    q: "Can I change the poster myself?",
    a: "Yes. Our frames use a tool-free top-slot system so you can change graphics in seconds.",
  },
  {
    q: "Do you supply dealers / distributors?",
    a: "Yes. Use the Dealer page or WhatsApp us with your city and expected volume for trade pricing.",
  },
];

export const sizeCompare = [
  {
    size: "A5 Table Top",
    bestFor: "Counters, events, portable promos",
    type: "Battery desktop",
    price: "₹1,200 – ₹2,500",
  },
  {
    size: "A4 Table Top",
    bestFor: "Reception, cafés, product showcase",
    type: "Battery desktop",
    price: "₹1,500 – ₹3,000",
  },
  {
    size: "12 × 18 in",
    bestFor: "Small menus, home & temple frames",
    type: "Wall frame",
    price: "₹2,500 – ₹4,500",
  },
  {
    size: "18 × 24 in",
    bestFor: "Retail, offices, popular mid-size",
    type: "Wall frame",
    price: "₹4,000 – ₹7,000",
  },
  {
    size: "24 × 36 in",
    bestFor: "Menus, branding, commercial walls",
    type: "Wall frame",
    price: "₹6,000 – ₹10,000",
  },
  {
    size: "24 × 42 in",
    bestFor: "Large posters, impact displays",
    type: "Large frame",
    price: "₹8,000 – ₹14,000",
  },
  {
    size: "Arch 24 × 36",
    bestFor: "Temples, boutique statement pieces",
    type: "Premium arch",
    price: "₹9,000 – ₹15,000",
  },
  {
    size: "Custom up to 2×6 ft",
    bestFor: "Floor standees, malls, bulk branding",
    type: "Custom / jumbo",
    price: "₹900 / sq ft",
  },
];

export const artworkGuidelines = [
  {
    title: "File types",
    desc: "Prefer PDF, PNG, JPG, or AI. High-resolution PDF is best for print.",
  },
  {
    title: "Resolution",
    desc: "Aim for 150–300 DPI at final print size. Avoid low-res social media screenshots.",
  },
  {
    title: "Colour",
    desc: "RGB is fine for review; we process for print. Keep important text inside a safe margin.",
  },
  {
    title: "Bleed & margins",
    desc: "Keep critical logos/text at least 0.5 inch inside the edge. Ask us if you need a template for your size.",
  },
  {
    title: "How to send",
    desc: "WhatsApp to +91 88663 67360 or email swastik.ind01@gmail.com with product size in the message.",
  },
];

export const videoHighlights = [
  {
    title: "ON / OFF illumination",
    desc: "See brightness difference when the glowbox is powered.",
    tag: "Demo",
  },
  {
    title: "Tool-free poster change",
    desc: "Top-slot system — change graphics in seconds.",
    tag: "Feature",
  },
  {
    title: "Arch glowbox install",
    desc: "Premium arch frames for temples and boutiques.",
    tag: "Product",
  },
];

export const reviews = [
  {
    name: "Retail owner, Rajkot",
    text: "Menu boards are bright and changing posters is genuinely tool-free. Good finish.",
    rating: 5,
  },
  {
    name: "Temple committee",
    text: "Arch glowbox looks premium. Print quality and lighting both excellent.",
    rating: 5,
  },
  {
    name: "Café manager",
    text: "A4 table-top on battery is perfect for counter offers during peak hours.",
    rating: 4,
  },
  {
    name: "Showroom brand",
    text: "Ordered multiple sizes. Packaging was safe and delivery as promised.",
    rating: 5,
  },
];

export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/how-it-works", label: "How it works" },
  { path: "/catalogs", label: "Catalogs" },
  { path: "/dealers", label: "Dealers" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact" },
];

export const footerLinks = [
  { path: "/about", label: "About Us" },
  { path: "/gallery", label: "Gallery" },
  { path: "/reviews", label: "Reviews" },
  { path: "/custom", label: "Custom Order" },
  { path: "/products", label: "Products" },
  { path: "/faq", label: "FAQ" },
];
