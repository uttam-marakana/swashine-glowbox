export const company = {
  name: "Swashine Glowbox",
  parent: "Swastik Industries",
  tagline: "Premium LED Glowboxes | Made in India",
  description: "Manufacturer of premium LED glowboxes, custom signage and retail display solutions from Rajkot, Gujarat.",
  address: "Gate 2, Pan Business Park, Behind Kishan Petrol Pump, Opp. Laxmi Loader, Rajkot, Gujarat – 360022",
  phone: "+91 88663 67360",
  whatsapp: "918866367360",
  email: "swastik.ind01@gmail.com",
  instagram: "https://instagram.com/swashine_glowbox",
  facebook: "https://facebook.com/Swastik.ind",
  founder: {
    name: "Shyam V. Vaghasiya",
    role: "Public Face & Marketing Head",
    bio: "Marketing, Business networking, Customer outreach & Strategic partnerships."
  }
};

export const orderNotes = [
  "Print charge and GST will be applicable",
  "Shipping charge will be calculated at dispatch",
  "Full payment needed for order confirmation",
  "Delivery time will be 5 to 6 days after payment received",
  "There will be no refund for order cancellation",
];

// Image paths – add more files under each product folder to expand gallery
const img = {
  p1: [
    "/src/assets/images/products/p1-18x24/18x24-inch-glowbox-img1.png",
  ],
  p2: [
    "/src/assets/images/products/p2-24x36/36x24-inch-glowbox-img1.png",
  ],
  p4: [
    "/src/assets/images/products/p4-12x18/18x12-inch-glowbox-img1_2.png",
    "/src/assets/images/products/p4-12x18/18x12-inch-glowbox-img1_1.png",
    "/src/assets/images/products/p4-12x18/18x12-inch-glowbox-img1_3.png",
  ],
  p8: [
    "/src/assets/images/products/p8-custom/image.png",
  ],
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
    description: "Popular mid-size LED glowbox with black aluminium frame and SWASHINE branding. Ideal for retail displays, menus, temples and office branding.",
    features: ["Black aluminium frame", "SWASHINE logo", "Top-slot tool-free poster change", "Industrial SMPS", "Wall mounting hardware"],
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
    description: "Large format LED glowbox perfect for commercial branding, restaurant menus, temple displays and shopfront signage.",
    features: ["Black aluminium frame", "SWASHINE logo", "High brightness LEDs", "Tool-free poster change", "Commercial grade"],
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
    description: "Extra-large illuminated display for impactful wall installations — wedding photos, landscapes, commercial posters and more.",
    features: ["Black aluminium frame", "Extra large size", "Even illumination", "Tool-free poster change"],
    includes: "Frame + Power supply + Cord",
    badge: "Large",
    image: null,
    gallery: [],
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
    description: "Compact LED glowbox ideal for ice-cream parlours, cafés, small menus, deity frames and home décor.",
    features: ["Compact size", "Black aluminium frame", "SWASHINE logo", "Tool-free poster change"],
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
    description: "Free-standing table-top illuminated display. Perfect for counters, reception desks, cafés and product showcases.",
    features: ["A4 size", "Free-standing base", "Interchangeable print", "Compact footprint"],
    includes: "Standee unit + Base",
    badge: "Desktop",
    image: null,
    gallery: [],
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
    description: "Signature arched-top premium glowbox. Perfect for temples, religious décor, boutique stores and statement wall displays.",
    features: ["Unique arch shape", "Premium finish", "Includes power supply", "Includes print", "1 Year SMPS warranty"],
    includes: "Frame + Power supply + Print",
    badge: "Bestseller",
    image: null,
    gallery: [],
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
    description: "Portable rechargeable table-top glowbox with battery backup. Ideal for events, counters and mobile displays.",
    features: ["Battery backup 4–5 hours", "Type-C charging", "ON/OFF button", "Battery indicator lights", "Portable"],
    includes: "Unit + Base + Battery",
    badge: "Battery",
    image: null,
    gallery: [],
    type: "desktop",
  },
  {
    id: 8,
    slug: "custom-size-glowbox",
    name: "Custom Size Glowbox",
    category: "Custom / Jumbo",
    size: "Up to 2 × 8 ft",
    sizeKey: "custom",
    priceRange: "high",
    priceLabel: "On Request",
    description: "Fully customized large format glowbox. Maximum size 2×8 ft. Ideal for floor standees, mall displays and large commercial branding.",
    features: ["Fully custom size", "Maximum 2 × 8 ft", "Floor standee options", "Commercial grade"],
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
    description: "Full product range — wall frames, arch, table-top and custom sizes with specifications.",
    pages: "12 pages",
    type: "PDF",
    // Replace with real PDF path when available
    file: null,
    whatsappNote: "Please send me the full product catalogue PDF",
  },
  {
    id: 2,
    title: "Arch Glowbox Collection",
    description: "Premium arched designs for temples, boutiques and statement wall displays.",
    pages: "4 pages",
    type: "PDF",
    file: null,
    whatsappNote: "Please send me the Arch Glowbox catalogue",
  },
  {
    id: 3,
    title: "Table Top & Portable Range",
    description: "A4 / A5 desktop standees including battery-powered models.",
    pages: "3 pages",
    type: "PDF",
    file: null,
    whatsappNote: "Please send me the Table Top catalogue",
  },
  {
    id: 4,
    title: "Price List (Retail & Dealer)",
    description: "Current pricing for standard sizes. Custom quotes on request.",
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
  { icon: "Zap", title: "Ultra Bright LEDs", desc: "High brightness with even illumination and low power consumption." },
  { icon: "RefreshCw", title: "Tool-Free Poster Change", desc: "Innovative top-slot system. Change graphics in seconds without tools." },
  { icon: "Shield", title: "Premium Build", desc: "Heavy-duty aluminium frame + scratch-resistant acrylic." },
  { icon: "Ruler", title: "Any Size Possible", desc: "Expert custom manufacturing from A5 to 2×8 ft jumbo formats." },
];

export const stats = [
  { value: "8+", label: "Product Variants" },
  { value: "1 Yr", label: "SMPS Warranty" },
  { value: "5–6", label: "Days Delivery" },
  { value: "100%", label: "Made in India" },
];

export const useCases = [
  { title: "Temples & Religious", desc: "Arch & standard glowboxes for deity frames and mandir décor." },
  { title: "Retail & Showrooms", desc: "Product displays, brand boards and window lighting." },
  { title: "Restaurants & Cafés", desc: "Menu boards, ice-cream parlour displays and counters." },
  { title: "Offices & Events", desc: "Reception branding, exhibitions and portable table-top units." },
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
    description: "High brightness turns ordinary prints into eye-catching displays.",
  },
];

export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/catalogs", label: "Catalogs" },
  { path: "/about", label: "About Us" },
  { path: "/gallery", label: "Gallery" },
  { path: "/custom", label: "Custom Order" },
  { path: "/contact", label: "Contact" },
];
