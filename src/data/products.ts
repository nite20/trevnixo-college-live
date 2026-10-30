import { CategoryItem, CategoryName, Product } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Smart ambient gadgets, audio essentials & daily tech upgrades.',
    iconName: 'Zap',
    featuredProductCount: 2,
  },
  {
    id: 'auto-bike',
    name: 'Auto & Bike',
    slug: 'auto',
    description: 'Car care essentials, magnetic mounts & cockpit accessories.',
    iconName: 'Car',
    featuredProductCount: 2,
  },
  {
    id: 'home',
    name: 'Home',
    slug: 'home',
    description: 'Aesthetic diffusers, minimalist lamps & everyday upgrades.',
    iconName: 'Home',
    featuredProductCount: 3,
  },
  {
    id: 'travel',
    name: 'Travel',
    slug: 'travel',
    description: 'Luggage organizers, packable gear & seamless journeys.',
    iconName: 'Luggage',
    featuredProductCount: 1,
  },
  {
    id: 'fitness',
    name: 'Fitness',
    slug: 'fitness',
    description: 'Workout resistance bands, push-up handles & active packs.',
    iconName: 'Activity',
    featuredProductCount: 3,
  },
  {
    id: 'for-him',
    name: 'For Him',
    slug: 'him',
    description: 'Sharp grooming kits, classic eyewear & masculine staples.',
    iconName: 'User',
    featuredProductCount: 2,
  },
  {
    id: 'for-her',
    name: 'For Her',
    slug: 'her',
    description: 'Minimal watches, curated bags & timeless daily wear.',
    iconName: 'Heart',
    featuredProductCount: 2,
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    slug: 'jewellery',
    description: 'Everyday hoop earrings, organizer vaults & timeless accents.',
    iconName: 'Sparkles',
    featuredProductCount: 2,
  },
  {
    id: 'grocery-utility',
    name: 'Grocery & Utility',
    slug: 'grocery',
    description: 'Pantry organizers, deep-clean brushes & practical hacks.',
    iconName: 'ShoppingBag',
    featuredProductCount: 2,
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Casual premium sneakers & sneaker care essentials.',
    iconName: 'Footprints',
    featuredProductCount: 2,
  },
  {
    id: 'clothes',
    name: 'Clothes',
    slug: 'clothes',
    description: 'Oversized heavy cotton casuals and everyday comfort.',
    iconName: 'Shirt',
    featuredProductCount: 1,
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Cryo ice rollers, cosmetic travel pouches & glow rituals.',
    iconName: 'Smile',
    featuredProductCount: 2,
  },
];

// Helper to resolve category slug aliases
export function normalizeCategorySlug(rawSlug: string): string {
  const s = (rawSlug || '').toLowerCase().trim();
  if (s === 'auto-bike' || s === 'auto_bike' || s === 'auto.html' || s === 'auto-bike.html') return 'auto';
  if (s === 'him' || s === 'for-him' || s === 'him.html') return 'him';
  if (s === 'her' || s === 'for-her' || s === 'her.html') return 'her';
  if (s === 'grocery-utility' || s === 'grocery' || s === 'utility' || s === 'grocery.html') return 'grocery';
  if (s === 'electronics.html') return 'electronics';
  if (s === 'clothes.html') return 'clothes';
  if (s === 'shoes.html') return 'shoes';
  if (s === 'home.html') return 'home';
  if (s === 'beauty.html') return 'beauty';
  if (s === 'fitness.html') return 'fitness';
  if (s === 'travel.html') return 'travel';
  if (s === 'jewellery.html') return 'jewellery';
  return s;
}

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  const normalized = normalizeCategorySlug(slug);
  return CATEGORIES.find(
    (c) => c.slug === normalized || c.id === normalized || c.name.toLowerCase() === normalized
  );
}

// 24 CENTRAL PRODUCTS PRESERVED EXACTLY AS SPECIFIED
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Smart LED Strip Light',
    category: 'Electronics',
    categorySlug: 'electronics',
    price: 499,
    mrp: 999,
    image: '/src/assets/images/trevnixo_smart_lighting_1791015744319.jpg',
    rating: 4.6,
    reviewCount: 184,
    shortDesc: 'Ambient RGB smart strip with music sync and adhesive backing for desks and TVs.',
    description:
      'Transform any bedroom, gaming den, or TV entertainment console with customizable RGB ambiance. Features high-density SMD LEDs, sound-reactive music sync, easy peel-and-stick backing, and a convenient inline controller.',
    highlights: [
      'Multi-color RGB ambient lighting modes',
      'Sound & music reactive pulse sensor',
      'Ultra-strong 3M adhesive backing',
      'USB powered — compatible with TV ports & powerbanks',
    ],
    specs: {
      Length: '2 Meters',
      Power: 'USB 5V/2A',
      Control: 'Inline remote & dynamic modes',
      Warranty: '6 Months Brand Warranty',
    },
    isTrending: true,
    isProblemSolver: true,
    tags: ['led', 'strip light', 'smart light', 'rgb', 'room decor', 'tv backlight', 'electronics'],
    inStock: true,
  },
  {
    id: 2,
    name: 'Magnetic Car Phone Holder',
    category: 'Auto & Bike',
    categorySlug: 'auto',
    price: 299,
    mrp: 599,
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 96,
    shortDesc: 'Ultra-strong neodymium magnetic vent mount for secure, bump-proof navigation.',
    description:
      'Engineered with 6 aerospace-grade N52 neodymium magnets to keep your smartphone steadfast over potholes, speed breakers, and sharp turns. Soft silicone grip protects car AC vents from scratches.',
    highlights: [
      '6X strong N52 neodymium magnetic ring',
      '360° spherical rotation for portrait or landscape GPS',
      'Anti-slip silicone padded vent clamp',
      'Universal metal plates included for any phone case',
    ],
    specs: {
      MountType: 'AC Air Vent Clip',
      Compatibility: 'All 4.0 - 7.0 inch smartphones',
      Material: 'Zinc Alloy + ABS Silicone',
      Weight: '68 grams',
    },
    isTrending: true,
    isProblemSolver: true,
    tags: ['car holder', 'phone mount', 'magnetic', 'auto', 'bike', 'navigation', 'car accessories'],
    inStock: true,
  },
  {
    id: 3,
    name: 'Portable Mini Blender',
    category: 'Home',
    categorySlug: 'home',
    price: 699,
    mrp: 1299,
    image: '/src/assets/images/trevnixo_portable_blender_1791015757016.jpg',
    rating: 4.7,
    reviewCount: 218,
    shortDesc: 'Rechargeable personal smoothie & protein shake blender with stainless steel 6-leaf blade.',
    description:
      'Blend fresh fruit smoothies, protein shakes, or baby purees anywhere on the go. Equipped with a powerful 20,000 RPM copper motor, durable 6-leaf 304 stainless steel blades, and a rechargeable 1500mAh USB battery.',
    highlights: [
      '6-blade 304 food-grade stainless steel system',
      'USB rechargeable with up to 12 blends per charge',
      'BPA-free PCTG sports bottle container',
      'Magnetic safety interlock prevents accidental start',
    ],
    specs: {
      Capacity: '380 ml',
      Battery: '1500 mAh Lithium-ion',
      ChargingTime: '2.5 Hours via Type-C',
      MotorSpeed: '20,000 RPM',
    },
    isTrending: true,
    isProblemSolver: true,
    tags: ['blender', 'mini blender', 'juicer', 'smoothie', 'portable', 'home', 'kitchen', 'protein'],
    inStock: true,
  },
  {
    id: 4,
    name: 'Premium Travel Organizer',
    category: 'Travel',
    categorySlug: 'travel',
    price: 399,
    mrp: 799,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 78,
    shortDesc: 'Water-resistant multi-compartment travel organizer for cables, chargers & grooming essentials.',
    description:
      'Keep charging cables, power banks, SSDs, passports, and earphones tangle-free and systematically organized. Crafted from tear-resistant cationic 300D polyester with padded internal dividers and elastic retention loops.',
    highlights: [
      'Dual-layer partitioned cable and tech storage',
      'Splash-proof cationic oxford textile exterior',
      'Reinforced smooth dual-zipper closure',
      'Compact profile fits neatly into backpacks or luggage',
    ],
    specs: {
      Dimensions: '24 x 18 x 5 cm',
      Material: 'Water-repellent 300D Polyester',
      Weight: '190 grams',
      Pockets: '8 Elastic slots + 3 mesh zipper pouches',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['travel', 'organizer', 'cable organizer', 'pouch', 'electronics case', 'luggage'],
    inStock: true,
  },
  {
    id: 5,
    name: 'Minimalist Desk Lamp',
    category: 'Home',
    categorySlug: 'home',
    price: 799,
    mrp: 1499,
    image: '/src/assets/images/trevnixo_smart_lighting_1791015744319.jpg',
    rating: 4.8,
    reviewCount: 164,
    shortDesc: 'Touch-dimmable aesthetic desk lamp with 3 color temperatures and flicker-free eye care.',
    description:
      'Designed for focused late-night work, reading, or cozy ambiance. Features a matte anodized finish, 3 calibrated color temperatures (Warm 3000K, Natural 4500K, Cool White 6500K), and stepless touch brightness adjustment.',
    highlights: [
      'Eye-care flicker-free diffused LED panel',
      '3 color temperatures with stepless dimming',
      'Sleek architectural folding arm',
      'Touch-sensitive base with memory recall',
    ],
    specs: {
      Brightness: 'Up to 600 Lumens',
      ColorTemp: '3000K - 6500K',
      PowerInput: '5V Type-C cord included',
      Finish: 'Matte Space Gray',
    },
    isTrending: true,
    isProblemSolver: false,
    tags: ['desk lamp', 'lamp', 'study light', 'home', 'decor', 'minimalist', 'led light'],
    inStock: true,
  },
  {
    id: 6,
    name: 'Fitness Resistance Bands',
    category: 'Fitness',
    categorySlug: 'fitness',
    price: 349,
    mrp: 699,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 132,
    shortDesc: 'Set of 5 color-coded natural latex exercise loop bands for home workout and glute activation.',
    description:
      'Progressive resistance levels ranging from Light (10 lbs) to Extra Heavy (40 lbs). Made of 100% skin-friendly natural Malaysian latex for elasticity and durability without snapping or rolling up.',
    highlights: [
      '5 distinct resistance levels included',
      '100% natural snap-resistant Malaysian latex',
      'Includes travel storage pouch and workout guide',
      'Ideal for glutes, legs, arms, and mobility rehab',
    ],
    specs: {
      Levels: 'X-Light, Light, Medium, Heavy, X-Heavy',
      Material: 'Eco Natural Latex',
      Dimensions: '30 cm x 5 cm loop',
      Package: '5 Bands + Drawstring Carry Bag',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['fitness', 'workout', 'resistance bands', 'gym', 'exercise', 'mobility'],
    inStock: true,
  },
  {
    id: 7,
    name: 'Classic Sunglasses',
    category: 'For Him',
    categorySlug: 'him',
    price: 449,
    mrp: 899,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviewCount: 88,
    shortDesc: 'Timeless square polarized sunglasses with UV400 protection and scratch-resistant lenses.',
    description:
      'A sharp, masculine silhouette that complements every face structure. Features TAC polarized lenses to eliminate glare while driving or outdoors, combined with lightweight reinforced polycarbonate frames.',
    highlights: [
      'UV400 100% ultraviolet eye protection',
      'Glare-reducing TAC polarized lenses',
      'Durable reinforced stainless steel hinges',
      'Comes with hard protective case and lens cloth',
    ],
    specs: {
      FrameType: 'Wayfarer Square',
      FrameMaterial: 'Polycarbonate + Alloy Core',
      LensColor: 'Smoke Black Polarized',
      Weight: '28 grams',
    },
    isTrending: false,
    isProblemSolver: false,
    tags: ['sunglasses', 'eyewear', 'for him', 'men', 'shades', 'polarized', 'fashion'],
    inStock: true,
  },
  {
    id: 8,
    name: "Elegant Women's Handbag",
    category: 'For Her',
    categorySlug: 'her',
    price: 899,
    mrp: 1799,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 147,
    shortDesc: 'Structured vegan leather shoulder bag with premium gold-tone hardware and adjustable strap.',
    description:
      'Sophisticated everyday tote and shoulder bag crafted from pebbled vegan leather. Spacious interior easily holds your tablet, wallet, cosmetic pouch, keys, and phone with dedicated secure zipper pockets.',
    highlights: [
      'Supple scratch-resistant pebbled vegan leather',
      'Gold-toned rust-resistant alloy hardware',
      'Adjustable and detachable crossbody strap',
      'Magnetic top snap + internal zipper privacy pocket',
    ],
    specs: {
      Dimensions: '28 x 21 x 11 cm',
      HandleDrop: '14 cm + 110 cm shoulder strap',
      Color: 'Classic Sand Rose',
      Closure: 'Zipper and Magnetic flap',
    },
    isTrending: true,
    isProblemSolver: false,
    tags: ['handbag', 'bag', 'tote', 'women', 'for her', 'fashion', 'vegan leather', 'purse'],
    inStock: true,
  },
  {
    id: 9,
    name: 'Jewellery Storage Box',
    category: 'Jewellery',
    categorySlug: 'jewellery',
    price: 499,
    mrp: 999,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 194,
    shortDesc: 'Double-layer velvet jewellery organizer with ring rolls, necklace hooks & removable dividers.',
    description:
      'Prevent precious necklaces from tangling and earrings from getting lost. Features a plush velvet-lined interior with 6 necklace hooks, 8 ring rolls, 9 earring slots, and modular compartments.',
    highlights: [
      'Plush anti-tarnish soft velvet interior',
      'Dual-tier layout with customizable dividers',
      'Secure brass snap-lock closure',
      'Compact vanity design suitable for travel',
    ],
    specs: {
      Dimensions: '16.5 x 11.5 x 5.5 cm',
      Exterior: 'PU Leather',
      Interior: 'Anti-scratch Velvet',
      Weight: '220 grams',
    },
    isTrending: true,
    isProblemSolver: true,
    tags: ['jewellery', 'storage', 'organizer', 'box', 'ring box', 'earrings', 'vanity'],
    inStock: true,
  },
  {
    id: 10,
    name: 'Kitchen Storage Organizer',
    category: 'Grocery & Utility',
    categorySlug: 'grocery',
    price: 299,
    mrp: 599,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 82,
    shortDesc: 'Stackable transparent food-grade pantry storage bins with integrated easy-pull front handle.',
    description:
      'Instantly tidy up crowded refrigerator shelves, kitchen cabinets, or snack pantries. Crystal-clear design makes contents immediately identifiable, while high-rim walls prevent jars and bottles from tipping over.',
    highlights: [
      '100% BPA-free food-safe PET construction',
      'Stackable modular design saves vertical shelf space',
      'Built-in front ergonomic pull handle',
      'Easy wipe-clean surface with anti-slip bottom ribbing',
    ],
    specs: {
      Dimensions: '31 x 15 x 9 cm',
      Material: 'BPA-free Shatter-resistant PET',
      DishwasherSafe: 'Hand wash recommended with mild soap',
      Capacity: '2.8 Liters',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['kitchen', 'storage', 'organizer', 'pantry', 'fridge organizer', 'grocery', 'utility'],
    inStock: true,
  },
  {
    id: 11,
    name: 'Wireless Earbuds',
    category: 'Electronics',
    categorySlug: 'electronics',
    price: 999,
    mrp: 1999,
    image: '/src/assets/images/trevnixo_wireless_earbuds_1791015773075.jpg',
    rating: 4.7,
    reviewCount: 340,
    shortDesc: 'Bluetooth 5.3 wireless earbuds with environmental noise cancellation and 30-hour playback.',
    description:
      'Immerse in deep dynamic bass and crystal-clear voice calls. Features instantaneous auto-pairing, ENC quad-microphones for voice isolation, IPX5 sweat resistance, and low-latency gaming audio mode.',
    highlights: [
      'Ultra-stable Bluetooth 5.3 with instant pairing',
      '13mm composite titanium drivers for crisp bass',
      'Quad-mic Environmental Noise Cancellation (ENC)',
      'Up to 30 hours total battery with fast Type-C charging',
    ],
    specs: {
      BatteryBuds: '5.5 Hours playback per charge',
      BatteryCase: '300 mAh (3 full recharges)',
      Waterproof: 'IPX5 Sweat & Splash Proof',
      Latency: '45ms Gaming Low-Latency Mode',
    },
    isTrending: true,
    isProblemSolver: false,
    tags: ['earbuds', 'wireless earbuds', 'audio', 'bluetooth', 'headphones', 'electronics', 'tws'],
    inStock: true,
  },
  {
    id: 12,
    name: 'Casual Premium Sneakers',
    category: 'Shoes',
    categorySlug: 'shoes',
    price: 1199,
    mrp: 2299,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 160,
    shortDesc: 'Lightweight breathable lifestyle sneakers with cushioned memory foam insole and gripped outsole.',
    description:
      'Engineered for all-day city walks and casual weekend styling. Features a breathable engineered mesh upper, plush memory foam cushioning, and shock-absorbing EVA rubber outsole for traction.',
    highlights: [
      'Breathable knit mesh upper keeps feet dry',
      'High-rebound memory foam footbed',
      'Anti-slip flex groove rubber sole',
      'Featherweight construction (approx. 240g)',
    ],
    specs: {
      Closure: 'Lace-Up',
      SoleMaterial: 'Dual-density EVA + TPR',
      UpperMaterial: 'Engineered Air-Mesh',
      Fit: 'Standard True-to-Size',
    },
    isTrending: true,
    isProblemSolver: false,
    tags: ['sneakers', 'shoes', 'footwear', 'casual shoes', 'running', 'mens shoes'],
    inStock: true,
  },
  {
    id: 13,
    name: 'Oversized Casual T-Shirt',
    category: 'Clothes',
    categorySlug: 'clothes',
    price: 499,
    mrp: 999,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 115,
    shortDesc: '240 GSM heavy combed cotton boxy oversized t-shirt with ribbed crew neck and pre-shrunk finish.',
    description:
      'The modern street-style staple. Cut from heavyweight 240 GSM 100% bio-washed combed cotton with dropped shoulders, a relaxed boxy drape, and shape-retaining ribbed collar that never sags.',
    highlights: [
      'Heavyweight 240 GSM 100% bio-washed cotton',
      'Pre-shrunk fabric to prevent post-wash shrinkage',
      'Relaxed dropped-shoulder street silhouette',
      'Colorfast reactive dye retains deep rich tone',
    ],
    specs: {
      Fit: 'Oversized Boxy Cut',
      Fabric: '100% Combed Bio-Washed Cotton',
      Neckline: '1.25" Ribbed Crew Neck',
      Care: 'Machine wash cold inside out',
    },
    isTrending: true,
    isProblemSolver: false,
    tags: ['tshirt', 'clothes', 'oversized', 'tee', 'cotton', 'apparel', 'streetwear'],
    inStock: true,
  },
  {
    id: 14,
    name: 'Aroma Diffuser',
    category: 'Home',
    categorySlug: 'home',
    price: 599,
    mrp: 1199,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 142,
    shortDesc: 'Ultrasonic cool-mist aromatherapy diffuser with warm ambient LED glow and auto shut-off.',
    description:
      'Infuse your living room or workspace with natural essential oils and soothing humidity. Operates at a whisper-quiet <25dB with ultrasonic atomization and smart waterless automatic safety shut-off.',
    highlights: [
      'Ultra-fine ultrasonic cool mist technology',
      'Warm ambient soothing light modes',
      'Waterless automatic power shut-off sensor',
      'Whisper-quiet operation (<25 dB)',
    ],
    specs: {
      TankCapacity: '300 ml',
      CoverageArea: 'Up to 250 sq. ft.',
      TimerModes: '1h / 3h / Continuous',
      Power: '5V USB Cord Included',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['diffuser', 'aroma', 'essential oils', 'home', 'humidifier', 'wellness', 'decor'],
    inStock: true,
  },
  {
    id: 15,
    name: 'Multi Purpose Cleaning Brush',
    category: 'Grocery & Utility',
    categorySlug: 'grocery',
    price: 199,
    mrp: 399,
    image: 'https://images.unsplash.com/photo-1585670270608-b4be4fbcf05d?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 94,
    shortDesc: '3-in-1 crevice and groove cleaning brush with stiff angled bristles and hidden scraper tool.',
    description:
      'Solves the frustration of dirty window tracks, tile grout, sink edges, and stove corners. High-density polypropylene angled bristles lift stubborn grime without scratching surfaces, paired with a pop-out detail scraper.',
    highlights: [
      'Angled narrow head reaches tight 2mm gaps',
      'Stiff durable PP bristles resist deformation',
      'Built-in tail scraper for baked-on grime',
      'Hanging hole for fast ventilation and drying',
    ],
    specs: {
      Dimensions: '21 x 2.5 x 1.5 cm',
      Material: 'High-density PP + Nylon bristles',
      Color: 'Minimalist Ash White',
      Weight: '45 grams',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['cleaning brush', 'brush', 'utility', 'grocery', 'kitchen cleaning', 'crevice brush'],
    inStock: true,
  },
  {
    id: 16,
    name: 'Beard Grooming Kit',
    category: 'For Him',
    categorySlug: 'him',
    price: 549,
    mrp: 1099,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 110,
    shortDesc: 'Complete 4-piece beard care set with nourishing argan oil, wooden comb, balm & trim shears.',
    description:
      'Maintain a soft, healthy, well-shaped beard without itching or unruly stray hairs. Includes 100% organic cold-pressed argan oil, styling conditioning balm, dual-action sandalwood comb, and precision stainless steel scissors.',
    highlights: [
      'Infused with pure Argan & Jojoba essential oils',
      'Eliminates beard dandruff and skin dryness',
      'Static-free hand-carved sandalwood comb',
      'Comes packaged in a compact luxury travel tin',
    ],
    specs: {
      OilVolume: '30 ml Glass Dropper',
      BalmWeight: '60 grams',
      CombMaterial: 'Natural Sandalwood',
      Scissors: 'Surgical-grade Stainless Steel',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['beard kit', 'grooming', 'men grooming', 'for him', 'beard oil', 'comb'],
    inStock: true,
  },
  {
    id: 17,
    name: "Women's Minimal Watch",
    category: 'For Her',
    categorySlug: 'her',
    price: 799,
    mrp: 1599,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 156,
    shortDesc: 'Slim rose gold quartz watch with sunray minimalist dial and magnetic Milanese mesh strap.',
    description:
      'Effortless everyday sophistication. Features a svelte 7mm case profile, reliable Japanese quartz movement, scratch-resistant mineral crystal glass, and a fully adjustable magnetic mesh bracelet.',
    highlights: [
      'Ultra-thin 7mm case profile for daily comfort',
      'Magnetic Milanese loop adjusts to any wrist size',
      'Precision Japanese Miyota quartz movement',
      '3 ATM daily splash and handwash water resistance',
    ],
    specs: {
      CaseDiameter: '32 mm',
      CaseThickness: '7 mm',
      StrapWidth: '14 mm',
      Plating: 'Ion-plated Rose Gold',
    },
    isTrending: true,
    isProblemSolver: false,
    tags: ['watch', 'womens watch', 'for her', 'minimal watch', 'wrist watch', 'accessories'],
    inStock: true,
  },
  {
    id: 18,
    name: 'Everyday Hoop Earrings',
    category: 'Jewellery',
    categorySlug: 'jewellery',
    price: 299,
    mrp: 699,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 89,
    shortDesc: '18K gold-plated hypoallergenic lightweight chunky huggie hoops for sensitive ears.',
    description:
      'The quintessential everyday earring you never need to take off. Finished in thick 18K gold vacuum plating over 316L surgical stainless steel for a tarnish-free, waterproof, and nickel-free shine.',
    highlights: [
      '18K vacuum gold PVD plating — tarnish resistant',
      '100% nickel-free and hypoallergenic for sensitive ears',
      'Secure click-top clasp that stays locked',
      'Feather-light hollow tube design for zero earlobe drag',
    ],
    specs: {
      Diameter: '20 mm',
      TubeThickness: '4 mm',
      BaseMetal: '316L Surgical Stainless Steel',
      Weight: '4.2 grams per pair',
    },
    isTrending: false,
    isProblemSolver: false,
    tags: ['earrings', 'jewellery', 'hoop earrings', 'gold plated', 'accessories', 'for her'],
    inStock: true,
  },
  {
    id: 19,
    name: 'Face Ice Roller',
    category: 'Beauty',
    categorySlug: 'beauty',
    price: 249,
    mrp: 499,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 178,
    shortDesc: 'Cryo facial ice roller to depuff morning eyes, tighten pores, and boost lymphatic drainage.',
    description:
      'Awaken tired skin with the rejuvenating power of cryo-therapy. Filled with cooling gel beads that stay ice-cold for over 30 minutes, helping reduce facial puffiness, calm redness, and soothe tension headaches.',
    highlights: [
      'Stays icy cold for 30+ minutes after freezing',
      'Instantly reduces morning eye bags and puffiness',
      'Ergonomic non-slip handle for smooth facial contours',
      'Food-grade silicone and BPA-free gel cylinder',
    ],
    specs: {
      Dimensions: '19 x 8.5 x 5 cm',
      Material: 'ABS Handle + Gel Ice Roller Head',
      FreezingTime: '15-20 minutes in freezer',
      Weight: '130 grams',
    },
    isTrending: true,
    isProblemSolver: true,
    tags: ['ice roller', 'beauty', 'skincare', 'facial roller', 'cryotherapy', 'depuff'],
    inStock: true,
  },
  {
    id: 20,
    name: 'Makeup & Travel Pouch',
    category: 'Beauty',
    categorySlug: 'beauty',
    price: 349,
    mrp: 699,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 124,
    shortDesc: 'Lay-flat cosmetic pouch with wide-mouth opening, water-resistant lining, and brush slots.',
    description:
      'Never dig to the bottom of a dark makeup bag again. This clever structured pouch unzips completely flat like a vanity tray for effortless access to all lipsticks, brushes, and skincare bottles.',
    highlights: [
      'Unzips completely flat for 100% item visibility',
      'Waterproof wipe-clean vegan leather exterior',
      'Internal zippered partition keeps small items safe',
      'Sturdy gold-tone dual zippers with easy-carry handle',
    ],
    specs: {
      Dimensions: '23 x 12 x 12 cm',
      Material: 'Soft Vegan PU Leather',
      Lining: 'Water-resistant Polyester',
      Weight: '165 grams',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['makeup pouch', 'travel pouch', 'cosmetics', 'beauty', 'toiletry bag', 'organizer'],
    inStock: true,
  },
  {
    id: 21,
    name: 'Adjustable Push-Up Handles',
    category: 'Fitness',
    categorySlug: 'fitness',
    price: 399,
    mrp: 799,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 104,
    shortDesc: 'Ergonomic non-slip push-up bars with rotating base to protect wrists and deepen chest workout.',
    description:
      'Maximize chest, shoulder, and tricep muscle activation while keeping your wrists at a neutral, pain-free angle. Features high-density sweat-absorbing foam handles and non-skid TPR rubber base pads.',
    highlights: [
      'Ergonomic angled design prevents wrist strain',
      'High-grade reinforced industrial PVC & steel frame',
      'Supports up to 150 kg body weight',
      'Non-marking rubber base grips any floor surface',
    ],
    specs: {
      WeightCapacity: '150 kg / 330 lbs',
      GripMaterial: 'Cushioned EVA Foam',
      Base: 'Anti-skid TPR Floor Grippers',
      Weight: '480 grams (pair)',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['push up bars', 'fitness', 'workout', 'gym', 'chest workout', 'home gym'],
    inStock: true,
  },
  {
    id: 22,
    name: 'Running Waist Bag',
    category: 'Fitness',
    categorySlug: 'fitness',
    price: 299,
    mrp: 599,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 92,
    shortDesc: 'Bounce-free slim reflective running belt pouch with water-resistant neoprene and headphone port.',
    description:
      'Say goodbye to phones bouncing in your pockets while running, jogging, or cycling. Features a super-stretchy expandable pouch, sweat-proof inner TPU membrane, reflective night strips, and adjustable waist buckle.',
    highlights: [
      '100% zero-bounce snug elastic fit',
      'Sweat-proof and rain-resistant neoprene fabric',
      'High-visibility 3M reflective safety borders',
      'Dedicated earphone cable grommet and key clip',
    ],
    specs: {
      WaistSize: 'Fits 26 to 45 inches waist',
      PhoneFit: 'Supports smartphones up to 6.8 inches',
      Material: 'Water-resistant Lycra / Neoprene',
      Weight: '75 grams',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['running bag', 'waist bag', 'fitness', 'running belt', 'jogging', 'fanny pack'],
    inStock: true,
  },
  {
    id: 23,
    name: 'Sneaker Cleaning Kit',
    category: 'Shoes',
    categorySlug: 'shoes',
    price: 299,
    mrp: 599,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 145,
    shortDesc: 'Professional sneaker cleaning solution with natural hog bristle brush and microfiber towel.',
    description:
      'Restore expensive kicks and daily white sneakers back to fresh out-of-the-box condition. Deep-cleaning foam formula lifts dirt, mud, and grass stains safely from canvas, leather, knit mesh, and rubber soles.',
    highlights: [
      'Biodegradable non-toxic concentrated cleaning foam',
      'Dual-texture brush (soft for uppers, stiff for soles)',
      'Safe on white leather, suede, mesh, and knit',
      'Quick waterless cleaning — wipes clean with cloth',
    ],
    specs: {
      SolutionVolume: '150 ml Foaming Bottle (up to 40 pairs)',
      Brush: 'Handcrafted wood with mixed natural bristles',
      Cloth: 'Ultra-absorbent Microfiber (30x30 cm)',
      Formula: 'Bleach-free, 98% Natural Ingredients',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['sneaker cleaner', 'shoe care', 'shoes', 'cleaning kit', 'white sneaker cleaner'],
    inStock: true,
  },
  {
    id: 24,
    name: 'Car Cleaning Microfiber Set',
    category: 'Auto & Bike',
    categorySlug: 'auto',
    price: 249,
    mrp: 499,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 118,
    shortDesc: 'Pack of 3 ultra-plush 800 GSM dual-sided scratch-free detailing microfiber towels.',
    description:
      'Achieve a swirl-free, mirror-like gloss on car paint, windshields, bike visors, and interior dashboards. Ultra-dense 800 GSM microfiber absorbs over 8 times its weight in water without leaving lint or micro-scratches.',
    highlights: [
      'Heavyweight 800 GSM plush split microfiber',
      'Silk-banded hem eliminates surface scratch risks',
      'Absorbs 8X its weight in water for quick drying',
      'Lint-free, machine washable, and reusable 500+ times',
    ],
    specs: {
      Count: 'Pack of 3 Cloths',
      GSM: '800 GSM Super Dense',
      Size: '40 x 40 cm each',
      Material: '80% Polyester + 20% Polyamide',
    },
    isTrending: false,
    isProblemSolver: true,
    tags: ['car cleaning', 'microfiber', 'auto', 'bike', 'detailing cloth', 'car wash'],
    inStock: true,
  },
];

// Delivery fee constant and free delivery threshold
export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_THRESHOLD = 999;

export function calculateDeliveryFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

export function getProductById(id: number | string): Product | undefined {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return PRODUCTS.find((p) => p.id === numId);
}

export function filterProducts(options: {
  categorySlug?: string;
  search?: string;
  sort?: string;
}): Product[] {
  let list = [...PRODUCTS];

  if (options.categorySlug && options.categorySlug !== 'all') {
    const norm = normalizeCategorySlug(options.categorySlug);
    list = list.filter((p) => {
      const pNorm = normalizeCategorySlug(p.categorySlug);
      return pNorm === norm || p.category.toLowerCase() === norm;
    });
  }

  if (options.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (options.sort) {
    if (options.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (options.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (options.sort === 'newest') {
      list.sort((a, b) => b.id - a.id);
    }
    // 'featured' keeps original curated order
  }

  return list;
}
