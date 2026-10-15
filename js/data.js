/* ==========================================================================
   INITIAL VENDORLINK DATASET
   Hyper-Local Small Business Listings & Community Notices
   ========================================================================== */

const INITIAL_CATEGORIES = [
  { id: 'all', label: 'All Businesses', name: 'All Shops', icon: 'fa-store', desc: 'All registered local businesses' },
  { id: 'Grocery', label: '🛒 Grocery', name: 'Grocery', icon: 'fa-basket-shopping', desc: 'Kiranas, daily provisions, oils & grains' },
  { id: 'Mechanic', label: '🛠️ Mechanic', name: 'Mechanic', icon: 'fa-wrench', desc: 'Bike, car, bicycle & appliance mechanics' },
  { id: 'Medical', label: '💊 Medical', name: 'Medical', icon: 'fa-prescription-bottle-medical', desc: '24/7 chemists, pharmacies & medicines' },
  { id: 'Textiles', label: '🧵 Textiles', name: 'Textiles', icon: 'fa-scroll', desc: 'Fabrics, pure cottons, matching & handloom' },
  { id: 'Clothing', label: '👗 Clothing', name: 'Clothing', icon: 'fa-shirt', desc: 'Boutiques, garments, tailoring & alterations' },
  { id: 'Home Food', label: '🍲 Home Food', name: 'Home Food', icon: 'fa-utensils', desc: 'Dabba services, tiffins & home cooks' },
  { id: 'Artisans', label: '🎨 Artisans', name: 'Artisans', icon: 'fa-palette', desc: 'Pottery, handicrafts, brass & custom work' },
  { id: 'Services', label: '💈 Services', name: 'Services', icon: 'fa-user-gear', desc: 'Electricians, plumbers, cobblers & locks' }
];

const LOCALITY_COORDINATES = {
  'Kothrud, Pune': { lat: 18.5074, lng: 73.8077, zoom: 15 },
  'Viman Nagar, Pune': { lat: 18.5679, lng: 73.9143, zoom: 15 },
  'FC Road, Pune': { lat: 18.5204, lng: 73.8412, zoom: 15 },
  'Aundh, Pune': { lat: 18.5590, lng: 73.8075, zoom: 15 },
  'Baner, Pune': { lat: 18.5597, lng: 73.7799, zoom: 15 },
  'Wakad, Pune': { lat: 18.5987, lng: 73.7686, zoom: 15 },
  'Hinjewadi, Pune': { lat: 18.5912, lng: 73.7389, zoom: 15 },
  'Camp, Pune': { lat: 18.5167, lng: 73.8895, zoom: 15 },
  'Bandra West, Mumbai': { lat: 19.0596, lng: 72.8295, zoom: 15 },
  'Juhu, Mumbai': { lat: 19.1075, lng: 72.8263, zoom: 15 },
  'Dadar, Mumbai': { lat: 19.0178, lng: 72.8478, zoom: 15 },
  'Andheri West, Mumbai': { lat: 19.1363, lng: 72.8277, zoom: 15 },
  'Indiranagar, Bengaluru': { lat: 12.9784, lng: 77.6408, zoom: 15 },
  'Koramangala, Bengaluru': { lat: 12.9352, lng: 77.6245, zoom: 15 },
  'Jayanagar, Bengaluru': { lat: 12.9250, lng: 77.5938, zoom: 15 },
  'Whitefield, Bengaluru': { lat: 12.9698, lng: 77.7499, zoom: 15 },
  'Connaught Place, New Delhi': { lat: 28.6315, lng: 77.2167, zoom: 15 },
  'HSR Layout, Bengaluru': { lat: 12.9121, lng: 77.6446, zoom: 15 },
  'OMKAR , KEDGAON': { lat: 18.4215, lng: 74.3412, zoom: 15 },
};

const INITIAL_VENDORS = [
  {
    id: 'v-401',
    name: 'Sanjeevani 24/7 Medical & Chemist',
    category: 'Medical',
    owner: 'Dr. Nitin Kulkarni',
    phone: '+91 98221 44550',
    whatsapp: '+91 98221 44550',
    locality: 'Kothrud, Pune',
    address: 'Shop #3, Paud Road, Opposite Vanaz Metro Station, Kothrud',
    distance: 0.3,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 84,
    timings: '24 Hours Open (Everyday)',
    payments: ['UPI', 'Cash', 'Credit Card'],
    languages: ['Marathi', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1586015555751-63c25aa26388?auto=format&fit=crop&w=800&q=80',
    description: 'Trusted 24-hour neighborhood chemist in Kothrud. We stock all genuine medicines, baby care essentials, Ayurvedic remedies, and deliver to senior citizens within 20 mins.',
    offerings: [
      { name: 'Doorstep Medicine Delivery', price: 'Free' },
      { name: 'Prescription Medicines', price: '15% Off' },
      { name: 'BP & Blood Sugar Free Check', price: '₹0' },
      { name: 'First Aid Kit & Inhalers', price: 'From ₹80' }
    ],
    reviews: [
      { author: 'Amit Deshmukh', rating: 5, date: 'Yesterday', text: 'Delivered urgent blood pressure medicine at midnight within 15 minutes! Lifesaver.' },
      { author: 'Sunita Joshi', rating: 5, date: '3 days ago', text: 'Polite staff and gives genuine discount on monthly medicines.' }
    ],
    mapCoords: { x: 35, y: 55, lat: 18.5065, lng: 73.8050 }
  },
  {
    id: 'v-402',
    name: 'Shriram Bike & Two-Wheeler Mechanic Garage',
    category: 'Mechanic',
    owner: 'Ganesh Shinde',
    phone: '+91 98902 77119',
    whatsapp: '+91 98902 77119',
    locality: 'Kothrud, Pune',
    address: 'Near Ideal Colony Ground, Karve Road, Kothrud',
    distance: 0.4,
    isOpen: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 63,
    timings: '8:30 AM - 9:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    description: 'Expert two-wheeler mechanic specializing in Honda, Hero, Bajaj, and Royal Enfield bikes. Prompt roadside breakdown assistance across Kothrud.',
    offerings: [
      { name: 'General Bike Servicing & Oil Change', price: '₹250' },
      { name: 'Tubeless Puncture Repair', price: '₹40' },
      { name: 'Carburetor Tuning & Mileage Boost', price: '₹150' },
      { name: 'Doorstep Breakdown Help', price: '₹100' }
    ],
    reviews: [
      { author: 'Rohan Patil', rating: 5, date: '2 days ago', text: 'My Activa broke down near Karve statue. Ganesh came in 10 mins and fixed the belt!' }
    ],
    mapCoords: { x: 28, y: 42, lat: 18.5080, lng: 73.8095 }
  },
  {
    id: 'v-403',
    name: 'Laxmi Textile & Saree Matching Center',
    category: 'Textiles',
    owner: 'Laxmanbhai Patel',
    phone: '+91 98603 55221',
    whatsapp: '+91 98603 55221',
    locality: 'Kothrud, Pune',
    address: 'Shop #8, Dahanukar Colony, Near Kothrud Stand',
    distance: 0.2,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 56,
    timings: '10:00 AM - 9:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Gujarati', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    description: 'One-stop textile hub for dressmakers and tailor shops. Huge stock of pure cottons, aster linings, chanderi silks, and matching borders.',
    offerings: [
      { name: 'Pure Cotton Dress Materials', price: '₹280/m' },
      { name: 'Blouse Matching Aster & Linings', price: '₹35/m' },
      { name: 'Silk & Banarasi Fabrics', price: '₹450/m' },
      { name: 'Saree Fall & Piko Threads', price: '₹20' }
    ],
    reviews: [
      { author: 'Prachi K', rating: 5, date: '4 days ago', text: 'Matched my designer lehenga border in 2 minutes flat. Huge color collection!' }
    ],
    mapCoords: { x: 42, y: 58, lat: 18.5028, lng: 73.8042 }
  },
  {
    id: 'v-404',
    name: 'Omkar Readymade Gents & Kids Garments',
    category: 'Clothing',
    owner: 'Omkar Navsupe',
    phone: '+91 98224 88331',
    whatsapp: '+91 98224 88331',
    locality: 'Kothrud, Pune',
    address: '14, Gujrat Colony, Karve Road, Kothrud',
    distance: 0.5,
    isOpen: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 47,
    timings: '10:30 AM - 9:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    description: 'Neighborhood clothing store for daily wear, festive ethnic kurtas, and school uniforms with free custom sizing and alterations.',
    offerings: [
      { name: 'Pure Cotton Kurta Pyjama', price: '₹550' },
      { name: 'Daily Wear Jeans & Chinos', price: '₹799' },
      { name: 'Kids Festival Traditional Wear', price: '₹450' },
      { name: 'Instant Waist Alteration', price: '₹40' }
    ],
    reviews: [
      { author: 'Mahesh G', rating: 5, date: '1 week ago', text: 'Great fitting kurta pyjamas and very honest pricing.' }
    ],
    mapCoords: { x: 38, y: 32, lat: 18.5098, lng: 73.8062 }
  },
  {
    id: 'v-405',
    name: 'LifeCare Pharmacy & Surgical Store',
    category: 'Medical',
    owner: 'Dr. Vivek Malhotra',
    phone: '+91 99238 66110',
    whatsapp: '+91 99238 66110',
    locality: 'Viman Nagar, Pune',
    address: 'Symbiosis College Road, Next to Cafe Peter, Viman Nagar',
    distance: 0.3,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 69,
    timings: '8:00 AM - 11:30 PM',
    payments: ['UPI', 'Cash', 'Card'],
    languages: ['English', 'Hindi', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80',
    description: 'Reliable neighborhood chemist in Viman Nagar catering to students and families. Fast medicine delivery and authentic surgical equipment.',
    offerings: [
      { name: 'Prescription Medicines', price: '12% Off' },
      { name: 'First Aid Kit & Bandages', price: '₹120' },
      { name: 'Digital Thermometer & Oximeter', price: '₹450' },
      { name: 'Fast Doorstep Delivery', price: 'Free' }
    ],
    reviews: [
      { author: 'Sneha Roy', rating: 5, date: 'Yesterday', text: 'Super prompt delivery to my hostel room within 10 mins.' }
    ],
    mapCoords: { x: 52, y: 48, lat: 18.5670, lng: 73.9140 }
  },
  {
    id: 'v-406',
    name: 'Speedy Auto & Car Mechanic Workshop',
    category: 'Mechanic',
    owner: 'Bashir Khan',
    phone: '+91 98500 11994',
    whatsapp: '+91 98500 11994',
    locality: 'Viman Nagar, Pune',
    address: 'Near Phoenix Marketcity Back Gate, Viman Nagar',
    distance: 0.6,
    isOpen: true,
    isVerified: true,
    rating: 4.7,
    reviewsCount: 41,
    timings: '9:00 AM - 8:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Hindi', 'Marathi', 'English'],
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80',
    description: 'Experienced multi-brand car & vehicle mechanic. Honest diagnostics, doorstep jump starts, and prompt clutch & brake overhauls.',
    offerings: [
      { name: 'Car Oil Service & Filter Replacement', price: '₹450' },
      { name: 'Brake Pad Servicing & Check', price: '₹300' },
      { name: 'Battery Jump Start Assistance', price: '₹200' }
    ],
    reviews: [
      { author: 'Arun K', rating: 5, date: '3 days ago', text: 'Car wouldn’t start in basement parking. Bashir jumped it in 15 mins.' }
    ],
    mapCoords: { x: 68, y: 65, lat: 18.5702, lng: 73.9172 }
  },
  {
    id: 'v-407',
    name: 'Viman Nagar Handloom & Curtain Fabrics',
    category: 'Textiles',
    owner: 'Kamalchand Jain',
    phone: '+91 98229 33441',
    whatsapp: '+91 98229 33441',
    locality: 'Viman Nagar, Pune',
    address: 'Datta Mandir Chowk, Viman Nagar',
    distance: 0.4,
    isOpen: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 38,
    timings: '10:00 AM - 8:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Hindi', 'English', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    description: 'Textile shop specializing in home furnishings, drapery fabrics, and pure cotton bedsheet materials.',
    offerings: [
      { name: 'Pure Linen Curtain Fabric', price: '₹350/m' },
      { name: 'Sofa Cover & Upholstery Roll', price: '₹420/m' },
      { name: 'Bed Sheet Cotton Fabrics', price: '₹220/m' }
    ],
    reviews: [
      { author: 'Meenakshi P', rating: 5, date: '5 days ago', text: 'Got beautiful customized linen curtains made for my new flat.' }
    ],
    mapCoords: { x: 58, y: 38, lat: 18.5688, lng: 73.9125 }
  },
  {
    id: 'v-408',
    name: 'Bandra Wellness Chemist & Druggist',
    category: 'Medical',
    owner: 'Farhan Dsouza',
    phone: '+91 98205 11332',
    whatsapp: '+91 98205 11332',
    locality: 'Bandra West, Mumbai',
    address: 'Hill Road, Opposite St. Stanislaus High School, Bandra West',
    distance: 0.4,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 92,
    timings: '24/7 Open',
    payments: ['UPI', 'Cash', 'Credit Card'],
    languages: ['English', 'Hindi', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    description: 'Bandra’s trusted 24-hour medical store since 1996. Quick doorstep delivery to Pali Hill, Hill Road, and Perry Cross.',
    offerings: [
      { name: 'Generic & Branded Drugs', price: '15% Off' },
      { name: 'Senior Citizen Home Delivery', price: 'Free' },
      { name: 'First Aid & Hot Water Bags', price: 'From ₹90' }
    ],
    reviews: [
      { author: 'Natasha W', rating: 5, date: 'Yesterday', text: 'Open round the clock! Never fail to find required medicines.' }
    ],
    mapCoords: { x: 48, y: 35, lat: 19.0602, lng: 72.8315 }
  },
  {
    id: 'v-301',
    name: 'Purohit Irani Cafe & Bakery',
    category: 'Home Food',
    owner: 'Rustom Irani',
    phone: '+91 98230 44556',
    whatsapp: '+91 98230 44556',
    locality: 'Camp, Pune',
    address: 'East Street, Near Kayani Bakery, Camp',
    distance: 0.3,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 82,
    timings: '7:00 AM - 10:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['English', 'Hindi', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic Camp bakery serving hot Irani Chai, crispy Brun Maska, fresh Mawa Cakes, and Bun Omlette for over 40 years.',
    offerings: [
      { name: 'Brun Maska & Special Irani Chai', price: '₹50' },
      { name: 'Fresh Butter Mawa Cake (250g)', price: '₹180' },
      { name: 'Double Egg Bun Omlette', price: '₹60' }
    ],
    reviews: [
      { author: 'Zubin P', rating: 5, date: 'Yesterday', text: 'Crispiest Brun Maska in Camp! Best Irani chai in Pune.' }
    ],
    mapCoords: { x: 45, y: 40, lat: 18.5175, lng: 73.8805 }
  },
  {
    id: 'v-302',
    name: 'Aundh Organic Farm Kirana & Oil Chakki',
    category: 'Grocery',
    owner: 'Vishwas Patil',
    phone: '+91 98900 11223',
    whatsapp: '+91 98900 11223',
    locality: 'Aundh, Pune',
    address: 'DP Road, Near Parihar Chowk, Aundh',
    distance: 0.2,
    isOpen: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 45,
    timings: '8:00 AM - 9:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    description: 'Organic A2 Gir Cow Milk, fresh wood-pressed Groundnut & Coconut oils, and chemical-free jaggery powder.',
    offerings: [
      { name: 'Pure A2 Gir Cow Milk (1L)', price: '₹110' },
      { name: 'Wood-Pressed Mustard Oil (1L)', price: '₹220' },
      { name: 'Organic Jaggery Powder (1kg)', price: '₹80' }
    ],
    reviews: [
      { author: 'Pooja K', rating: 5, date: '3 days ago', text: 'Fresh A2 milk delivered everyday at 7 AM sharp.' }
    ],
    mapCoords: { x: 50, y: 50, lat: 18.5595, lng: 73.8082 }
  },
  {
    id: 'v-303',
    name: 'Baner Designer Boutique & Alteration Hub',
    category: 'Clothing',
    owner: 'Priyanka Shinde',
    phone: '+91 98601 22334',
    whatsapp: '+91 98601 22334',
    locality: 'Baner, Pune',
    address: 'Baner Road, Near Balewadi High Street Chowk',
    distance: 0.4,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 61,
    timings: '10:00 AM - 8:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'English'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    description: 'Custom Indo-Western stitching, designer saree blouse tailoring, and emergency same-day dress alterations.',
    offerings: [
      { name: 'Indo-Western Kurti Stitching', price: '₹750' },
      { name: 'Designer Lehenga Alteration', price: '₹400' },
      { name: 'Same Day Hemming & Fitting', price: '₹100' }
    ],
    reviews: [
      { author: 'Shruti M', rating: 5, date: '4 days ago', text: 'Priyanka did my party dress fitting in 2 hours flat!' }
    ],
    mapCoords: { x: 60, y: 35, lat: 18.5605, lng: 73.7810 }
  },
  {
    id: 'v-304',
    name: 'Tech-Hub IT Hardware & Laptop Clinic',
    category: 'Mechanic',
    owner: 'Saurabh Varma',
    phone: '+91 97655 44321',
    whatsapp: '+91 97655 44321',
    locality: 'Hinjewadi, Pune',
    address: 'Phase 1, Near Wipro Circle, Hinjewadi',
    distance: 0.5,
    isOpen: true,
    isVerified: true,
    rating: 4.7,
    reviewsCount: 39,
    timings: '9:00 AM - 9:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['English', 'Hindi', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Fast IT support for software engineers & tech professionals. Laptop screen replacement, RAM upgrades, keyboard fixes, and charger repairs.',
    offerings: [
      { name: 'Laptop Keyboard & Trackpad Repair', price: '₹600' },
      { name: '512GB High Speed SSD Upgrade', price: '₹1,800' },
      { name: 'OS Reinstallation & Virus Cleaning', price: '₹400' }
    ],
    reviews: [
      { author: 'Rahul T', rating: 5, date: '2 days ago', text: 'Fixed my laptop keyboard in 30 mins during work hours!' }
    ],
    mapCoords: { x: 40, y: 65, lat: 18.5920, lng: 73.7395 }
  },
  {
    id: 'v-305',
    name: 'Dadar Station Flower Market Garland Master',
    category: 'Services',
    owner: 'Maruti Phoolwale',
    phone: '+91 98691 22110',
    whatsapp: '+91 98691 22110',
    locality: 'Dadar, Mumbai',
    address: 'Outside Dadar West Flower Market Exit',
    distance: 0.2,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 72,
    timings: '5:00 AM - 9:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh daily puja garlands, marigold flowers, Jasmine Mogra veni for hair, and wedding flower decorations.',
    offerings: [
      { name: 'Fresh Marigold Garland (Puja Set)', price: '₹60' },
      { name: 'Jasmine Mogra Hair Veni', price: '₹40' },
      { name: 'Special Rose Garland (Pair)', price: '₹250' }
    ],
    reviews: [
      { author: 'Sonal G', rating: 5, date: '1 day ago', text: 'Fresh flowers every morning for daily home temple.' }
    ],
    mapCoords: { x: 55, y: 45, lat: 19.0185, lng: 72.8485 }
  },
  {
    id: 'v-201',
    name: 'Shree Ganesh Misal & Puneri Breakfast House',
    category: 'Home Food',
    owner: 'Sanjay Deshpande',
    phone: '+91 98220 11223',
    whatsapp: '+91 98220 11223',
    locality: 'Kothrud, Pune',
    address: 'Near Ideal Colony Ground, Karve Road, Kothrud',
    distance: 0.3,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 64,
    timings: '7:00 AM - 1:30 PM | 4:30 PM - 9:00 PM',
    payments: ['UPI', 'Cash', 'Paytm'],
    languages: ['Marathi', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary neighborhood breakfast corner serving authentic spicy Puneri Tarri Misal Pav, soft Kanda Poha, Ukdiche Modak made with pure jaggery, and chilled Solkadhi.',
    offerings: [
      { name: 'Authentic Puneri Tarri Misal Pav', price: '₹80' },
      { name: 'Kanda Poha with Fresh Coconut', price: '₹40' },
      { name: 'Steamed Ukdiche Modak (2 pcs)', price: '₹70' },
      { name: 'Chilled Solkadhi / Piyush', price: '₹40' }
    ],
    reviews: [
      { author: 'Omkar N', rating: 5, date: 'Yesterday', text: 'Best Misal in Kothrud! The spicy tarri and fresh farsan combo is unbeatable.' },
      { author: 'Tanvi Kulkarni', rating: 5, date: '4 days ago', text: 'Modak was melted in mouth! Very clean and hygienic place.' }
    ],
    mapCoords: { x: 30, y: 35, lat: 18.5085, lng: 73.8080 }
  },
  {
    id: 'v-202',
    name: 'Puneri Paithani & Traditional Handloom Crafters',
    category: 'Artisans',
    owner: 'Vandana Joshi',
    phone: '+91 98901 44556',
    whatsapp: '+91 98901 44556',
    locality: 'Kothrud, Pune',
    address: 'Opposite Garware College, Karve Road, Kothrud',
    distance: 0.5,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 48,
    timings: '10:30 AM - 8:30 PM (Mon Closed)',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Heritage handloom crafters bringing authentic Yeola Paithanis, hand-painted silk sarees, Puneri Pagadis, and handcrafted Kolhapuri chappals directly from local artisans.',
    offerings: [
      { name: 'Handwoven Silk Yeola Paithani', price: '₹4,500+' },
      { name: 'Traditional Puneri Pagadi', price: '₹650' },
      { name: 'Genuine Leather Kolhapuri Chappals', price: '₹850' },
      { name: 'Handloom Cotton Dupattas', price: '₹350' }
    ],
    reviews: [
      { author: 'Radhika Joshi', rating: 5, date: '3 days ago', text: 'Got my wedding Paithani saree from Vandana Tai. Absolute mastercraft quality.' }
    ],
    mapCoords: { x: 55, y: 45, lat: 18.5042, lng: 73.8115 }
  },
  {
    id: 'v-203',
    name: 'Deshmukh Flour Mill & Kirana Chakki',
    category: 'Grocery',
    owner: 'Anand Deshmukh',
    phone: '+91 97633 88990',
    whatsapp: '+91 97633 88990',
    locality: 'Kothrud, Pune',
    address: 'Shop #12, Dahanukar Colony, Kothrud',
    distance: 0.2,
    isOpen: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 52,
    timings: '8:00 AM - 9:30 PM (Sun Evening Closed)',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    description: 'Trusted neighborhood grain mill operating since 1988. We grind fresh Sharbati wheat, Jowar, Bajra, and Besan right in front of your eyes.',
    offerings: [
      { name: 'Lokwan Wheat Milling Charge', price: '₹8/kg' },
      { name: 'Fresh Jowar & Bajra Bhakri Flour', price: '₹45/kg' },
      { name: 'Pure Ambemohar & Indrayani Rice', price: '₹90/kg' },
      { name: 'Home Ground Sambar & Goda Masala', price: '₹75/250g' }
    ],
    reviews: [
      { author: 'Dr. Mahesh Pawar', rating: 5, date: '1 week ago', text: 'Finest flour mill in Dahanukar colony! Always gives warm, fresh flour.' }
    ],
    mapCoords: { x: 40, y: 60, lat: 18.5020, lng: 73.8035 }
  },
  {
    id: 'v-204',
    name: 'Master Vithal Tailors & Nauvari Specialist',
    category: 'Clothing',
    owner: 'Vithalrao Shinde',
    phone: '+91 98600 77112',
    whatsapp: '+91 98600 77112',
    locality: 'Viman Nagar, Pune',
    address: 'Row House #5, Datta Mandir Chowk, Viman Nagar',
    distance: 0.4,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 57,
    timings: '9:30 AM - 8:30 PM (Sun Closed)',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    description: 'Specialist in custom Nauvari sarees, designer blouses, gents suit fitting, and urgent alteration services.',
    offerings: [
      { name: 'Ready-to-Wear Nauvari Saree Stitching', price: '₹550' },
      { name: 'Padded Designer Blouse with Piping', price: '₹350' },
      { name: 'Jeans & Trouser Alteration', price: '₹50' },
      { name: 'Kurta Pyjama Stitching', price: '₹400' }
    ],
    reviews: [
      { author: 'Sneha Kulkarni', rating: 5, date: '2 days ago', text: 'Stitched my Nauvari saree for Ganeshotsav perfectly! Very comfortable fit.' }
    ],
    mapCoords: { x: 65, y: 35, lat: 18.5695, lng: 73.9130 }
  },
  {
    id: 'v-205',
    name: 'Aai’s Home Tiffin & Poli Bhaji Center',
    category: 'Home Food',
    owner: 'Sunanda Tai Kulkarni',
    phone: '+91 99234 55667',
    whatsapp: '+91 99234 55667',
    locality: 'Viman Nagar, Pune',
    address: 'B-10, Symbiosis College Road, Viman Nagar',
    distance: 0.3,
    isOpen: true,
    isVerified: true,
    rating: 5.0,
    reviewsCount: 73,
    timings: '11:30 AM - 2:30 PM | 7:00 PM - 9:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    description: 'Home-cooked Maharashtrian tiffins with mother’s love. Soft wheat Chapatis, spicy Kolhapuri Thecha, Pithla Bhakri, and fresh hot Amti.',
    offerings: [
      { name: 'Daily Poli-Bhaji Meal Box (4 Chapati, 2 Sabzi, Amti)', price: '₹110' },
      { name: 'Fresh Puran Poli (Set of 2 with Ghee)', price: '₹80' },
      { name: 'Pithla Bhakri & Thecha Combo', price: '₹120' },
      { name: 'Monthly Student Meal Plan', price: '₹3,000/mo' }
    ],
    reviews: [
      { author: 'Aditya Ranade', rating: 5, date: 'Yesterday', text: 'Being a student in Viman Nagar, Sunanda Tai’s food feels like home! Softest chapatis.' }
    ],
    mapCoords: { x: 45, y: 55, lat: 18.5660, lng: 73.9155 }
  },
  {
    id: 'v-206',
    name: 'Shriram Cycle Repair & Two-Wheeler Helper',
    category: 'Mechanic',
    owner: 'Dattatray Kadam',
    phone: '+91 98225 33445',
    whatsapp: '+91 98225 33445',
    locality: 'Viman Nagar, Pune',
    address: 'Opposite Phoenix Marketcity Backgate, Viman Nagar',
    distance: 0.6,
    isOpen: true,
    isVerified: true,
    rating: 4.7,
    reviewsCount: 35,
    timings: '8:00 AM - 9:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    description: 'Prompt neighborhood bike mechanic & puncture assistance helper servicing Viman Nagar residents for 18 years.',
    offerings: [
      { name: 'Tubeless Tire Puncture Fix', price: '₹40' },
      { name: 'Full Bicycle Servicing & Oiling', price: '₹200' },
      { name: 'Emergency Scooter Jump Start', price: '₹150' }
    ],
    reviews: [
      { author: 'Amit Deshpande', rating: 5, date: '3 days ago', text: 'Helpful Datta Kadam fixed my scooter puncture right at my doorstep in 15 mins.' }
    ],
    mapCoords: { x: 75, y: 70, lat: 18.5710, lng: 73.9180 }
  },
  {
    id: 'v-207',
    name: 'Puneri Tambat Craft & Brassware Studio',
    category: 'Artisans',
    owner: 'Kashinath Tambe',
    phone: '+91 98811 22334',
    whatsapp: '+91 98811 22334',
    locality: 'FC Road, Pune',
    address: 'Near Goodluck Chowk, FC Road, Pune',
    distance: 0.3,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 41,
    timings: '10:00 AM - 8:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Marathi', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional coppersmiths (Tambat Ali heritage) hand-crafting pure hand-beaten copper water bottles, brass Samai lamps, and cookware.',
    offerings: [
      { name: 'Hand-beaten Pure Copper Water Bottle (1L)', price: '₹550' },
      { name: 'Traditional Brass Samai Diya Lamp', price: '₹400' },
      { name: 'Brass & Copper Utensil Kalhai Polishing', price: '₹150' }
    ],
    reviews: [
      { author: 'Varun Chitale', rating: 5, date: '5 days ago', text: 'Genuine copper bottles! Kept water tasting crisp and fresh.' }
    ],
    mapCoords: { x: 50, y: 30, lat: 18.5215, lng: 73.8425 }
  },
  {
    id: 'v-101',
    name: 'Ramesh Kirana & General Store',
    category: 'Grocery',
    owner: 'Ramesh Kumar',
    phone: '+91 98201 54321',
    whatsapp: '+91 98201 54321',
    locality: 'Bandra West, Mumbai',
    address: 'Shop #4, Hill Road, Opposite St. Andrew Church',
    distance: 0.3, // km
    isOpen: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 42,
    timings: '7:30 AM - 10:00 PM (Everyday)',
    payments: ['UPI', 'Cash', 'Paytm'],
    languages: ['Hindi', 'English', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    description: 'Family-run Kirana operating since 1994. Fresh whole grains, organic pulses, cold-pressed mustard oil, and monthly ration packs delivered right to your doorstep within 30 minutes.',
    offerings: [
      { name: 'Fresh Organic Atta (5kg)', price: '₹240' },
      { name: 'Cold-Pressed Groundnut Oil (1L)', price: '₹210' },
      { name: 'Daily Milk & Eggs Delivery', price: 'MRP' },
      { name: 'Custom Monthly Ration Pack', price: 'Custom' }
    ],
    reviews: [
      { author: 'Priya Sharma', rating: 5, date: '2 days ago', text: 'Ramesh uncle is super polite! Delivers ration within 15 mins when you call him.' },
      { author: 'Vikram Mehta', rating: 5, date: '1 week ago', text: 'Best quality dry fruits and unpolished pulses in Bandra.' }
    ],
    mapCoords: { x: 35, y: 40, lat: 19.0585, lng: 72.8300 } // percentage positioning on map canvas
  },
  {
    id: 'v-102',
    name: 'Shanti Boutique & Master Tailors',
    category: 'Clothing',
    owner: 'Shantiben & Master Salim',
    phone: '+91 98700 12345',
    whatsapp: '+91 98700 12345',
    locality: 'Bandra West, Mumbai',
    address: '22-B, Pali Naka, Near Bagel Shop',
    distance: 0.6,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 68,
    timings: '10:00 AM - 8:30 PM (Sun Closed)',
    payments: ['UPI', 'Cash'],
    languages: ['Hindi', 'Gujarati', 'English'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    description: 'Specialist in perfect-fit blouse stitching, saree fall-piko, suit alterations, and emergency zipper replacements. 30 years of neighborhood stitching expertise.',
    offerings: [
      { name: 'Saree Fall & Piko Work', price: '₹90' },
      { name: 'Padded Designer Blouse Stitching', price: '₹450' },
      { name: 'Jeans Hemming & Alterations', price: '₹70' },
      { name: 'Kurti Tailoring with Lining', price: '₹350' }
    ],
    reviews: [
      { author: 'Ananya Roy', rating: 5, date: '3 days ago', text: 'Master Salim fit my wedding blouse perfectly in just 24 hours. Incredible master craftsman!' },
      { author: 'Kavita Shah', rating: 5, date: '2 weeks ago', text: 'Honest rates and very neat finishing on saree fall.' }
    ],
    mapCoords: { x: 60, y: 30, lat: 19.0620, lng: 72.8330 }
  },
  {
    id: 'v-103',
    name: 'Anita’s Home Kitchen (Kathiyawadi & North Tiffins)',
    category: 'Home Food',
    owner: 'Anita Deshmukh',
    phone: '+91 99671 88290',
    whatsapp: '+91 99671 88290',
    locality: 'Bandra West, Mumbai',
    address: 'Flat 302, Green Acres Apt, St. John Street',
    distance: 0.4,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 54,
    timings: '11:30 AM - 3:00 PM | 7:00 PM - 9:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Hindi', 'Marathi', 'English'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    description: 'Hygienic, wholesome home-cooked thalis prepared with minimal oil and ghee. Daily changing menu with rotis, sabzi, dal, rice, and homemade pickle.',
    offerings: [
      { name: 'Executive Veg Thali (4 Roti, 2 Sabzi, Dal, Rice)', price: '₹130' },
      { name: 'Special Sunday Biryani Box', price: '₹220' },
      { name: 'Monthly Tiffin Service (Lunch & Dinner)', price: '₹3,400/mo' },
      { name: 'Fresh Phulkas (Set of 5)', price: '₹40' }
    ],
    reviews: [
      { author: 'Siddharth Nair', rating: 5, date: 'Yesterday', text: 'Tastes exactly like home! The dal tadka and bhindi sabzi are amazing.' },
      { author: 'Meera Kapoor', rating: 5, date: '5 days ago', text: 'Clean packaging and piping hot delivery every day at 1 PM sharp.' }
    ],
    mapCoords: { x: 45, y: 65, lat: 19.0570, lng: 72.8280 }
  },
  {
    id: 'v-104',
    name: 'National Locksmith & Key Maker',
    category: 'Mechanic',
    owner: 'Aslam Bhai',
    phone: '+91 98922 44100',
    whatsapp: '+91 98922 44100',
    locality: 'Bandra West, Mumbai',
    address: 'Kiosk outside Bandra Station West exit',
    distance: 0.8,
    isOpen: true,
    isVerified: true,
    rating: 4.7,
    reviewsCount: 31,
    timings: '9:00 AM - 9:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Hindi', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Duplicate key maker for main doors, vehicles, Godrej locks, and digital sensor keys. Emergency home doorstep lockout assistance within 20 mins.',
    offerings: [
      { name: 'Standard Door Duplicate Key', price: '₹50' },
      { name: 'Computerized Computer Key', price: '₹150' },
      { name: 'Emergency Home Lockout Service', price: '₹350' },
      { name: 'Bike/Car Key Creation', price: '₹250' }
    ],
    reviews: [
      { author: 'Rohan Joshi', rating: 5, date: '4 days ago', text: 'Got locked out of my apartment at 10 PM. Aslam Bhai arrived in 15 mins and opened it safely without damaging the lock!' }
    ],
    mapCoords: { x: 75, y: 70, lat: 19.0640, lng: 72.8360 }
  },
  {
    id: 'v-105',
    name: 'Kumbhar Art Studio & Terracotta Pottery',
    category: 'Artisans',
    owner: 'Devraj Kumbhar',
    phone: '+91 97690 33211',
    whatsapp: '+91 97690 33211',
    locality: 'Indiranagar, Bengaluru',
    address: '12th Main Road, Near 100ft Road junction',
    distance: 0.5,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 29,
    timings: '10:30 AM - 7:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Kannada', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted clay Matkas, terracotta planters, eco-friendly diyas, ceramic coffee mugs, and hand-painted earthen cookware.',
    offerings: [
      { name: 'Clay Water Matka with Tap (10L)', price: '₹350' },
      { name: 'Hand-painted Plant Pots', price: '₹180 - ₹400' },
      { name: 'Terracotta Curd Handi', price: '₹120' },
      { name: 'Pottery Workshop Session (1 hr)', price: '₹500' }
    ],
    reviews: [
      { author: 'Deepa V', rating: 5, date: '1 week ago', text: 'Beautiful earthen pots! Keeps drinking water super cool naturally.' }
    ],
    mapCoords: { x: 25, y: 25, lat: 12.9790, lng: 77.6415 }
  },
  {
    id: 'v-106',
    name: 'Master Leather Cobbler & Shoe Doctor',
    category: 'Services',
    owner: 'Shankar Anna',
    phone: '+91 91374 99012',
    whatsapp: '+91 91374 99012',
    locality: 'Indiranagar, Bengaluru',
    address: 'Corner Stall, 100 Feet Road, opposite Toit',
    distance: 0.2,
    isOpen: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 51,
    timings: '9:00 AM - 8:00 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Kannada', 'Tamil', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    description: 'Expert repairs for leather shoes, boots, ladies heels, leather jackets, bag zippers, and luggage trolley wheels.',
    offerings: [
      { name: 'Sole Stitching & Glueing', price: '₹80' },
      { name: 'Ladies Heel Tip Replacement', price: '₹60' },
      { name: 'Leather Bag Zipper Replacement', price: '₹120' },
      { name: 'Trolley Wheel Repair', price: '₹200' }
    ],
    reviews: [
      { author: 'Arjun Menon', rating: 5, date: '3 days ago', text: 'Restored my worn out leather boots like new. Shankar Anna is a magician!' }
    ],
    mapCoords: { x: 50, y: 50, lat: 12.9775, lng: 77.6390 }
  },
  {
    id: 'v-107',
    name: 'Cycle Repair & Electric Scooter Clinic',
    category: 'Mechanic',
    owner: 'Bablu Mechanic',
    phone: '+91 98212 99443',
    whatsapp: '+91 98212 99443',
    locality: 'Koramangala, Bengaluru',
    address: 'Block 4, 80 Feet Road, Near Wipro Park',
    distance: 0.7,
    isOpen: true,
    isVerified: true,
    rating: 4.6,
    reviewsCount: 39,
    timings: '8:30 AM - 8:30 PM',
    payments: ['UPI', 'Cash'],
    languages: ['Kannada', 'Hindi', 'English'],
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    description: 'Quick tire puncture repair, gear tuning, chain lubing, brake pads replacement, and electric cycle battery health checks.',
    offerings: [
      { name: 'Tire Puncture Patch Work', price: '₹30' },
      { name: 'Full Bicycle Servicing & Oiling', price: '₹250' },
      { name: 'Brake Wire & Pad Replacement', price: '₹100' }
    ],
    reviews: [
      { author: 'Kiran K', rating: 5, date: '5 days ago', text: 'Super fast puncture fix in 5 minutes flat!' }
    ],
    mapCoords: { x: 65, y: 80, lat: 12.9340, lng: 77.6260 }
  },
  {
    id: 'v-108',
    name: 'Chandan Organic Cold-Pressed Oils & Spices',
    category: 'Grocery',
    owner: 'Chandrakant Patel',
    phone: '+91 98450 67890',
    whatsapp: '+91 98450 67890',
    locality: 'Koramangala, Bengaluru',
    address: '5th Block, 1st Cross, Near Koramangala Club',
    distance: 0.4,
    isOpen: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 45,
    timings: '9:00 AM - 9:00 PM',
    payments: ['UPI', 'Cash', 'Paytm'],
    languages: ['Kannada', 'English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    description: 'Wood-pressed (Ghani) Coconut, Sesame, and Mustard oils extracted daily right in front of customers. Hand-ground sambar powder and turmeric.',
    offerings: [
      { name: 'Wood-Pressed Coconut Oil (1L)', price: '₹280' },
      { name: 'Pure Sesame / Til Oil (1L)', price: '₹320' },
      { name: 'Fresh Hand-Ground Sambar Powder (250g)', price: '₹110' }
    ],
    reviews: [
      { author: 'Lakshmi R', rating: 5, date: '2 days ago', text: 'Smell of fresh coconut oil is heavenly. Pure quality!' }
    ],
    mapCoords: { x: 30, y: 75, lat: 12.9365, lng: 77.6230 }
  }
];

const INITIAL_BOARD_POSTS = [
  {
    id: 'b-301',
    vendorName: 'Shree Ganesh Misal House (Kothrud)',
    tag: 'Special Menu',
    title: '🍲 Ganeshotsav Special: Fresh Ukdiche Modak Pre-orders Open!',
    content: 'We are accepting advance orders for authentic steamed Ukdiche Modak made with pure jaggery, fresh coconut, and cow ghee. ₹350 per box of 11 modaks. Pick up or delivery in Kothrud.',
    time: '1 hour ago',
    phone: '+91 98220 11223',
    likes: 31
  },
  {
    id: 'b-302',
    vendorName: 'Aai’s Home Tiffin (Viman Nagar)',
    tag: 'Fresh Arrival',
    title: '📢 Special Pithla Bhakri & Kolhapuri Thecha Combo today!',
    content: 'Today’s lunch menu special: Hot Maharashtrian Pithla, Jowar Bhakri, fresh Kolhapuri red chili Thecha, and Kanda. Pre-book your student or office box by 11:30 AM.',
    time: '3 hours ago',
    phone: '+91 99234 55667',
    likes: 19
  },
  {
    id: 'b-201',
    vendorName: 'Ramesh Kirana Store',
    tag: 'Fresh Arrival',
    title: '🥦 Fresh Devgad Alphonso Mangoes just arrived!',
    content: 'Directly sourced from Ratnagiri organic farms! Limited 25 dozen boxes available at ₹650 per dozen. Call or WhatsApp Ramesh uncle to reserve your box now for free doorstep delivery.',
    time: '2 hours ago',
    phone: '+91 98201 54321',
    likes: 12
  },
  {
    id: 'b-202',
    vendorName: 'Anita’s Home Kitchen',
    tag: 'Special Menu',
    title: '🍲 Sunday Special: Puran Poli & Gujarati Dal Thali',
    content: 'We are taking advance orders for Sunday Lunch (Aug 2)! Includes 2 Puran Polis made with pure cow ghee, Gujarati Khatti-Meethi Dal, Batata Nuv Shaak, and Steamed Rice. ₹160 per thali.',
    time: '4 hours ago',
    phone: '+91 99671 88290',
    likes: 24
  },
  {
    id: 'b-203',
    vendorName: 'Shanti Boutique & Tailors',
    tag: 'Notice',
    title: '📢 Festive Season Booking Open - 10% Off Stitching',
    content: 'Festival season is starting soon! Book your saree blouse and suit tailoring orders before Aug 10 to get guaranteed delivery within 3 days plus 10% neighborhood discount.',
    time: '1 day ago',
    phone: '+91 98700 12345',
    likes: 18
  }
];
