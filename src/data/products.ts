import { Product, Review } from '../types';

export const products: Product[] = [
  {
    id: 'kids-cloud-body-wash',
    name: 'Kids Cloud Body Wash',
    price: 30,
    rating: 4.9,
    reviewsCount: 188,
    description: 'A creamy, foaming, ultra-gentle body wash designed specifically for kids. Hydrates skin while providing a fun, clouds-of-foam bubble experience.',
    category: ['BESTSELLERS', 'KIDS', 'MOM & BABY'],
    badges: ['BESTSELLER'],
    imageType: 'body-wash',
    imageColors: {
      primary: '#ffccd5', // Peach/soft pink
      secondary: '#ff4e88', // Evereden pink spray nozzle
      accent: '#ffe5ec'
    },
    subTitle: '$30 - $54',
    details: 'Clinically tested, pediatrician-approved body wash made with organic coconut water and cellular fruit waters. This ultra-gentle, cloud-like foam protects kids skin barrier while making bath time fun.',
    ingredients: [
      'Organic Coconut Water: Hydrates and strengthens skin barrier.',
      'Melon Juice Extract: Infuses vitamins A & C for antioxidant protection.',
      'Oat Amino Acids: Exceptionally mild cleansers that do not strip skin.'
    ],
    howToUse: 'Pump directly into hands or onto a sponge. Massage onto wet skin, creating rich cloud-like foam, then rinse thoroughly.',
    sizes: ['150ml ($30)', '300ml ($42)', '500ml ($54)'],
    scents: ['Cool Peach', 'Fresh Melon', 'Sweet Apple']
  },
  {
    id: 'kids-teen-deo-duo',
    name: 'Kids & Teen Deo Duo',
    price: 34,
    originalPrice: 38,
    savePercentage: 11,
    rating: 4.9,
    reviewsCount: 146,
    description: 'Both scents: Darling + Ace',
    category: ['BESTSELLERS', 'KIDS', 'TEENS (AGES 11+)', 'SAVE WITH SETS'],
    badges: ['VALUE SET', 'NEW'],
    imageType: 'deo-duo',
    imageColors: {
      primary: '#ffccd5', // Pink stick
      secondary: '#c7f9cc', // Green stick
      accent: '#ff4e88'
    },
    subTitle: 'Both scents: Darling + Ace',
    details: 'The ultimate natural deodorant duo for active kids and teens. Aluminium-free, baking soda-free, and loaded with skin-loving multi-vitamins to keep kids smelling fresh and clean all day long.',
    ingredients: [
      'Almond Oil: Soothes delicate underarm skin.',
      'Squalane: Provides intense hydration and barrier protection.',
      'Natural Odor-Neutralizers: Yeast-derived enzymes that safely break down odor.'
    ],
    howToUse: 'Apply 2-3 swipes to clean, dry underarms daily.',
    sizes: ['Standard Duo'],
    scents: ['Darling (Soft Floral) + Ace (Fresh Herb)']
  },
  {
    id: 'kids-happy-face-trio',
    name: 'Kids Happy Face Trio',
    price: 59,
    originalPrice: 69,
    savePercentage: 14,
    rating: 4.8,
    reviewsCount: 1488,
    description: 'Face Wash + Face Cream + Hydrating Face Mist',
    category: ['BESTSELLERS', 'KIDS', 'TEENS (AGES 11+)', 'SAVE WITH SETS'],
    badges: ['BESTSELLER', 'VALUE SET'],
    imageType: 'face-trio',
    imageColors: {
      primary: '#a2d2ff', // Light blue face wash
      secondary: '#bde0fe', // Blue face cream
      accent: '#ffc8dd' // Pink face mist
    },
    subTitle: 'Face Wash + Face Cream + Hydrating Face Mist',
    details: 'Complete 3-step daily face care system formulated for kids. Cleanse, moisturize, and hydrate with multi-vitamin enriched formulas designed to keep young skin happy and balanced.',
    ingredients: [
      '7-Lipid Complex: Replenishes essential skin lipids.',
      'Grape Fruit Water: Revitalizes and hydrates.',
      'Multi-Vitamins (B, C, E): Brightens and shields from pollution.'
    ],
    howToUse: 'Step 1: Cleanse with Face Wash. Step 2: Hydrate with Face Mist. Step 3: Seal with Face Cream.',
    sizes: ['Complete Trio Set'],
    scents: ['Signature Fresh']
  },
  {
    id: 'kids-detangling-shampoo',
    name: 'Kids Detangling Shampoo',
    price: 24,
    rating: 4.9,
    reviewsCount: 320,
    description: 'Gently cleanses kids scalp while softening hair to prevent knots and frizz. Formulated with fresh melon scent.',
    category: ['KIDS', 'MOM & BABY'],
    badges: ['REFILL AVAILABLE'],
    imageType: 'shampoo-pump',
    imageColors: {
      primary: '#ffdda1', // Warm orange/peach
      secondary: '#8a5a44', // Brown pump head
      accent: '#ffccd5'
    },
    details: 'Sulfate-free, tear-free kids shampoo designed to strengthen hair follicles while gently removing sweat and build-up. Its creamy lather makes hair soft and extremely easy to comb through.',
    ingredients: [
      'Quinoa Protein: Strengthens hair fibers.',
      'Avocado Oil: Deeply conditions and prevents split ends.',
      'Argan Kernel Oil: Smooths the cuticle to reduce knots.'
    ],
    howToUse: 'Massage a small amount onto wet hair and scalp. Lather, then rinse with warm water.',
    sizes: ['300ml ($24)', '500ml Refill ($36)'],
    scents: ['Melon + Cucumber', 'Sweet Berry']
  },
  {
    id: 'kids-detangling-conditioner',
    name: 'Kids Detangling Conditioner',
    price: 26,
    rating: 4.8,
    reviewsCount: 275,
    description: 'Smooths flyaways and transforms dry, tangled locks into shiny, silk hair. Delicious peach scent.',
    category: ['KIDS', 'MOM & BABY'],
    badges: ['REFILL AVAILABLE'],
    imageType: 'conditioner-pump',
    imageColors: {
      primary: '#fcd5a1', // Light yellow orange
      secondary: '#ffccd5', // Pink pump head
      accent: '#ffe5ec'
    },
    details: 'Silicone-free, weightless hair conditioner designed to nourish fine hair without weighing it down. Eliminates stubborn tangles instantly, leaving hair incredibly soft and manageable.',
    ingredients: [
      'Shea Butter: Nourishes and conditions damaged strands.',
      'Jojoba Esters: Locks in moisture and provides natural shine.',
      'Pro-Vitamin B5: Thickens hair fibers and promotes healthy growth.'
    ],
    howToUse: 'After shampooing, apply to hair from mid-lengths to ends. Leave on for 1-2 minutes, then rinse.',
    sizes: ['300ml ($26)', '500ml Refill ($38)'],
    scents: ['Peach + Vanilla', 'Coconut dream']
  },
  {
    id: 'kids-suncare-headband-duo',
    name: 'Kids Suncare & Headband Duo',
    price: 42,
    originalPrice: 49,
    savePercentage: 14,
    rating: 4.9,
    reviewsCount: 512,
    description: 'Includes SPF 30 Kids Mineral Sunscreen and cute plush headband.',
    category: ['BESTSELLERS', 'SUNCARE', 'SAVE WITH SETS'],
    badges: ['BESTSELLER', 'VALUE SET', 'FREE KIDS HEADBAND'],
    imageType: 'sunscreen-headband',
    imageColors: {
      primary: '#ffe57f', // Sun yellow tube
      secondary: '#ff4e88', // Pink headband
      accent: '#ff80ab'
    },
    subTitle: 'FREE KIDS HEADBAND',
    details: 'Protect your child from harmful UVA/UVB rays with our 100% Mineral Sunscreen, while keeping their hair out of their face with the complimentary ultra-soft plush pink headband.',
    ingredients: [
      'Non-Nano Zinc Oxide: Provides broad-spectrum mineral UV filter.',
      'Sunflower Seed Oil: Rich in vitamins to moisturize sun-exposed skin.',
      'Chamomile Flower Extract: Calms skin redness and irritation.'
    ],
    howToUse: 'Apply sunscreen generously 15 minutes before sun exposure. Wear the pink headband during face washing or sunscreen application.',
    sizes: ['Full Size Duo + Headband'],
    scents: ['Fragrance Free', 'Light Coconut']
  },
  {
    id: 'kids-cleansing-clay',
    name: 'Kids Cleansing Clay Cleanser',
    price: 22,
    rating: 4.7,
    reviewsCount: 98,
    description: 'A deep-cleansing, non-stripping clay wash that lifts oil and impurities from playing outdoors.',
    category: ['KIDS', 'TEENS (AGES 11+)'],
    badges: ['VALUE SET'],
    imageType: 'clay-cleanser',
    imageColors: {
      primary: '#ffccd5', // Pink body
      secondary: '#b5e2fa', // Soft green cap
      accent: '#ffe5ec'
    },
    details: 'Gentle facial clay cleanser specifically formulated for kids. Lifts up dirt, sweat, and sunscreen residues safely without over-drying their young delicate skin barrier.',
    ingredients: [
      'White Kaolin Clay: Purifies skin pores from impurities and oils.',
      'Aloe Leaf Juice: Deeply hydrates and soothes.',
      'Ceramides: Maintain and support the protective skin barrier.'
    ],
    howToUse: 'Squeeze a pea-sized amount onto wet palms, massage gently over the face, then rinse off completely.',
    sizes: ['100ml ($22)'],
    scents: ['Sweet Peach', 'Cucumber Fresh']
  },
  {
    id: 'mom-stretch-mark-cream',
    name: 'Golden Belly Stretch Mark Cream',
    price: 39,
    rating: 4.9,
    reviewsCount: 2240,
    description: 'Moisturizes and increases skin elasticity for pregnant and postpartum moms.',
    category: ['BESTSELLERS', 'MOM & BABY', 'GEN E'],
    badges: ['BESTSELLER'],
    imageType: 'lotion-pump',
    imageColors: {
      primary: '#faedcd', // Warm golden cream
      secondary: '#ccd5ae', // Sage green pump
      accent: '#e9edc9'
    },
    details: 'Rich, deeply hydrating cream formulated to prevent and reduce the appearance of stretch marks. Made with 100% non-toxic, safe botanical extracts for mom and baby.',
    ingredients: [
      'Centella Asiatica (Gotu Kola): Promotes collagen synthesis.',
      'Marula Oil: Rich in essential fatty acids for deep skin suppleness.',
      'Rosehip Seed Oil: Rich in vitamins A and C to regenerate skin texture.'
    ],
    howToUse: 'Massage gently in circular motions over your belly, thighs, and breasts twice daily.',
    sizes: ['150ml ($39)', '300ml ($62)'],
    scents: ['Fragrance Free', 'Calming Lavender']
  }
];

export const mockReviews: Record<string, Review[]> = {
  'kids-cloud-body-wash': [
    {
      id: 'r1',
      author: 'Jessica M.',
      rating: 5,
      date: '2026-06-12',
      title: 'Bath time is so fun now!',
      comment: 'My 5-year-old absolutely loves the cloud foam. He wants to wash himself now! Smells wonderful and doesn\'t dry his skin at all.',
      verified: true
    },
    {
      id: 'r2',
      author: 'David L.',
      rating: 5,
      date: '2026-05-30',
      title: 'Amazing gentle formula',
      comment: 'We struggled with eczema and this body wash has been a miracle. Super gentle, lovely scent, and very fun to play with in the tub.',
      verified: true
    }
  ],
  'kids-teen-deo-duo': [
    {
      id: 'r3',
      author: 'Sarah K.',
      rating: 5,
      date: '2026-07-02',
      title: 'Actually works!',
      comment: 'My active 11-year-old uses Darling and her brother uses Ace. It keeps them fresh after soccer practice and is completely natural and safe.',
      verified: true
    }
  ]
};
