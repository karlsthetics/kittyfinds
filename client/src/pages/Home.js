// ============================================================================
// HOME Page Component - Era Awaits Design
// Full-featured landing page matching Figma prototype with all sections
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import { fetchProducts, createCart } from '../utils/api';
import './styles/Home.css';

function Home({ cartId, setCartId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('fairycore');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({});

  // Initialize cart on component mount if needed
  useEffect(() => {
    if (!cartId) {
      createCart()
        .then(newCartId => {
          setCartId(newCartId);
          localStorage.setItem('cartId', newCartId);
        })
        .catch(err => console.error('Error creating cart:', err));
    }
  }, [cartId, setCartId]);

  // Fetch products on mount
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(() => {
        setError(null);
      })
      .catch(err => {
        setError('Failed to load products. Please try again later.');
        console.error('Error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const saleEnd = new Date('2026-05-01').getTime();
      const distance = saleEnd - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ========== COQUETTE COLLECTION (10 items) ==========
  // EDIT: Update product names, descriptions, or add more details
  const coquetteProducts = [
    {
      id: 'coquette-1',
      name: 'Blush Ribbon Slip Dress',
      price: 799,
      currency: '₱',
      category: 'Coquette',
      description: 'Elegant blush-colored slip dress with delicate ribbon details',
      longDescription: 'Experience timeless elegance with our Blush Ribbon Slip Dress. Crafted from premium silk, this dress features delicate ribbon detailing that adds a romantic touch. Perfect for special occasions or elevating your everyday look. The soft blush tone complements any skin tone beautifully.',
      image: '/images/C1.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Blush', 'White', 'Rose'],
      rating: 5,
      reviews: 247,
    },
    {
      id: 'coquette-2',
      name: 'Pastel Cloud Cardigan',
      price: 649,
      currency: '₱',
      category: 'Coquette',
      description: 'Soft, cloud-like cardigan in pastel pink',
      longDescription: 'Wrap yourself in luxury with our Pastel Cloud Cardigan. Made from the softest materials, this cardigan feels like wearing a cloud. The pastel pink hue is both calming and sophisticated. Layer it over any outfit for instant elegance and warmth.',
      image: '/images/C2.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Pastel Pink', 'Lavender'],
      rating: 5,
      reviews: 98,
    },
    {
      id: 'coquette-3',
      name: 'Romantic Corset Blouse',
      price: 749,
      currency: '₱',
      category: 'Coquette',
      description: 'Victorian-inspired corset blouse with lace trim',
      longDescription: 'Make a statement with our Romantic Corset Blouse. Inspired by Victorian fashion, this blouse features intricate lace trim and a flattering corset structure. Perfect for creating an hourglass silhouette while maintaining comfort. Ideal for date nights or special events.',
      image: '/images/C3.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['White', 'Cream', 'Blush'],
      rating: 5,
      reviews: 311,
    },
    {
      id: 'coquette-4',
      name: 'Silk Charmeuse Slip',
      price: 599,
      currency: '₱',
      category: 'Coquette',
      description: 'Luxurious silk charmeuse slip with adjustable straps',
      longDescription: 'Indulge in luxury with our Silk Charmeuse Slip. Made from premium silk, this slip is buttery smooth against the skin. The adjustable straps ensure the perfect fit, while the elegant drape creates a sophisticated silhouette. Layer under any sheer top or wear alone.',
      image: '/images/C4.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Ivory', 'Champagne', 'Rose Gold'],
      rating: 5,
      reviews: 156,
    },
    {
      id: 'coquette-5',
      name: 'Lace Trim Camisole',
      price: 499,
      currency: '₱',
      category: 'Coquette',
      description: 'Delicate camisole with French lace trim',
      longDescription: 'Add a touch of elegance to your wardrobe with our Lace Trim Camisole. Featuring authentic French lace detailing, this camisole is both delicate and durable. Perfect as a standalone piece or layered under any outfit for an extra dash of romance.',
      image: '/images/C5.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['White', 'Black', 'Pink'],
      rating: 4,
      reviews: 203,
    },
    {
      id: 'coquette-6',
      name: 'Pearl Button Cardigan',
      price: 699,
      currency: '₱',
      category: 'Coquette',
      description: 'Creamy cardigan adorned with vintage pearl buttons',
      longDescription: 'Channel vintage charm with our Pearl Button Cardigan. Each button is a vintage pearl, adding timeless sophistication. The creamy color is versatile and pairs beautifully with any wardrobe. This cardigan is a staple piece for the coquette aesthetic.',
      image: '/images/C6.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Cream', 'Blush', 'Lavender'],
      rating: 5,
      reviews: 189,
    },
    {
      id: 'coquette-7',
      name: 'Velvet Babydoll Dress',
      price: 849,
      currency: '₱',
      category: 'Coquette',
      description: 'Soft velvet babydoll dress with bow details',
      longDescription: 'Feel absolutely adorable in our Velvet Babydoll Dress. Luxuriously soft velvet with playful bow details creates the perfect coquette look. The babydoll silhouette is flattering on all body types and the vibrant colors make this dress a showstopper.',
      image: '/images/C7.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Pink', 'Rose', 'Mauve'],
      rating: 5,
      reviews: 275,
    },
    {
      id: 'coquette-8',
      name: 'Sheer Overlay Top',
      price: 549,
      currency: '₱',
      category: 'Coquette',
      description: 'Ethereal sheer overlay with embroidered details',
      longDescription: 'Layer like a pro with our Sheer Overlay Top. The ethereal sheer fabric features delicate embroidered details that add visual interest. Perfect for creating sophisticated, multi-layered looks. Mix and match with any top for endless styling possibilities.',
      image: '/images/C8.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['White', 'Blush', 'Peach'],
      rating: 4,
      reviews: 142,
    },
    {
      id: 'coquette-9',
      name: 'Satin Bow Headpiece',
      price: 399,
      currency: '₱',
      category: 'Coquette',
      description: 'Luxurious satin bow for hair styling',
      longDescription: 'Complete your coquette look with our Satin Bow Headpiece. Made from luxurious satin, this bow is both elegant and comfortable. The perfect accessory for formal events or adding a touch of femininity to everyday outfits. Available in multiple colors to match any ensemble.',
      image: '/images/C9.jpg',
      sizes: ['One Size'],
      colors: ['Pink', 'White', 'Black'],
      rating: 5,
      reviews: 421,
    },
    {
      id: 'coquette-10',
      name: 'Lace Thigh Highs',
      price: 299,
      currency: '₱',
      category: 'Coquette',
      description: 'Delicate lace thigh-high socks with bow trim',
      longDescription: 'Elevate your look with our Lace Thigh Highs. Delicate lace with cute bow trim at the top creates an irresistibly charming silhouette. Perfect with skirts or as a standalone statement piece. Comfortable elastic ensures they stay in place all day.',
      image: '/images/C10.jpg',
      sizes: ['One Size'],
      colors: ['White', 'Black', 'Pink'],
      rating: 5,
      reviews: 356,
    },
  ];

  // ========== Y2K COLLECTION (10 items) ==========
  // EDIT: Update product names, descriptions, or add more details
  const y2kProducts = [
    {
      id: 'y2k-1',
      name: 'Y2K Butterfly Mini Skirt',
      price: 549,
      currency: '₱',
      category: 'Y2K',
      description: 'Low-rise mini skirt with butterfly print',
      longDescription: 'Rock the Y2K trend with our Butterfly Mini Skirt. Featuring a nostalgic butterfly print and flattering low-rise cut, this skirt is pure 2000s nostalgia. The playful pattern is sure to turn heads and complete any Y2K inspired outfit.',
      image: '/images/Y1.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Black', 'Pink', 'Purple'],
      rating: 5,
      reviews: 132,
    },
    {
      id: 'y2k-2',
      name: 'Cargo Pants with Straps',
      price: 699,
      currency: '₱',
      category: 'Y2K',
      description: 'Classic cargo pants with multiple pockets and straps',
      longDescription: 'Channel early 2000s vibes with our Cargo Pants. Multiple pockets, utility straps, and an on-trend silhouette make this a must-have Y2K piece. Comfortable yet stylish, perfect for creating authentic Y2K outfits that turn heads.',
      image: '/images/Y2.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Khaki', 'Black', 'Hot Pink'],
      rating: 5,
      reviews: 267,
    },
    {
      id: 'y2k-3',
      name: 'Metallic Crop Top',
      price: 449,
      currency: '₱',
      category: 'Y2K',
      description: 'Shiny metallic crop top perfect for the club',
      longDescription: 'Make a statement with our Metallic Crop Top. The shiny metallic finish catches the light beautifully, making you the center of attention. Perfect for nights out or festival season. Pair with low-rise bottoms for the ultimate Y2K look.',
      image: '/images/Y3.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Silver', 'Gold', 'Purple'],
      rating: 4,
      reviews: 198,
    },
    {
      id: 'y2k-4',
      name: 'Baby Tee Graphic Print',
      price: 399,
      currency: '₱',
      category: 'Y2K',
      description: 'Vintage-style baby tee with trendy graphic',
      longDescription: 'Get that vintage Y2K aesthetic with our Baby Tee Graphic Print. The fitted silhouette and trendy graphic design make this the perfect layering piece. Versatile enough for casual days or nights out. A wardrobe essential for any Y2K enthusiast.',
      image: '/images/Y4.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['White', 'Black', 'Pink'],
      rating: 5,
      reviews: 445,
    },
    {
      id: 'y2k-5',
      name: 'Butterfly Hair Clips',
      price: 299,
      currency: '₱',
      category: 'Y2K',
      description: 'Colorful butterfly hair clips set',
      longDescription: 'Complete your Y2K look with our Butterfly Hair Clips. This colorful set brings back the iconic butterfly clips of the 2000s. Fun, playful, and perfect for any occasion. Mix and match colors or stack them for a bold statement.',
      image: '/images/Y5.jpg',
      sizes: ['One Size'],
      colors: ['Rainbow', 'Pink', 'Purple'],
      rating: 5,
      reviews: 512,
    },
    {
      id: 'y2k-6',
      name: 'Choker Necklace Set',
      price: 349,
      currency: '₱',
      category: 'Y2K',
      description: 'Multi-piece choker set with various styles',
      longDescription: 'The ultimate Y2K accessory collection! This multi-piece choker set features various styles to mix and match. From classic black to silver and rainbow options, you\'ll have endless styling possibilities. A must-have for perfecting the Y2K aesthetic.',
      image: '/images/Y6.jpg',
      sizes: ['One Size'],
      colors: ['Black', 'Silver', 'Rainbow'],
      rating: 5,
      reviews: 389,
    },
    {
      id: 'y2k-7',
      name: 'Holographic Windbreaker',
      price: 799,
      currency: '₱',
      category: 'Y2K',
      description: 'Futuristic holographic windbreaker jacket',
      longDescription: 'Step into the future with our Holographic Windbreaker. The iridescent holographic finish shifts colors as you move, creating a truly eye-catching effect. Perfect for layering or wearing solo, this jacket is the ultimate Y2K statement piece.',
      image: '/images/Y7.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Silver', 'Iridescent'],
      rating: 5,
      reviews: 234,
    },
    {
      id: 'y2k-8',
      name: 'Rhinestone Tank Top',
      price: 499,
      currency: '₱',
      category: 'Y2K',
      description: 'Sparkly tank top covered in rhinestones',
      longDescription: 'Shine bright with our Rhinestone Tank Top. Covered in glittering rhinestones, this tank is perfect for standing out. The sparkly detail catches light beautifully, making it ideal for nights out or special events. Layer or wear solo for maximum impact.',
      image: '/images/Y8.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Black', 'White', 'Pink'],
      rating: 5,
      reviews: 267,
    },
    {
      id: 'y2k-9',
      name: 'Platform Chunky Sneakers',
      price: 899,
      currency: '₱',
      category: 'Y2K',
      description: 'Iconic platform chunky sneakers with colorful details',
      longDescription: 'Complete your Y2K look with our Platform Chunky Sneakers. These iconic shoes feature chunky soles and colorful accents that scream early 2000s. Comfortable for all-day wear yet fashion-forward. The perfect footwear for any Y2K outfit.',
      image: '/images/Y9.jpg',
      sizes: ['5', '6', '7', '8', '9', '10'],
      colors: ['White/Pink', 'White/Purple', 'Black/Silver'],
      rating: 5,
      reviews: 198,
    },
    {
      id: 'y2k-10',
      name: 'Butterfly Chain Wallet',
      price: 449,
      currency: '₱',
      category: 'Y2K',
      description: 'Cute butterfly-shaped wallet with chain strap',
      longDescription: 'Carry your essentials in style with our Butterfly Chain Wallet. This adorable butterfly-shaped wallet features a chain strap perfect for attaching to your bag or wearing crossbody. The quintessential Y2K accessory that\'s both functional and fashionable.',
      image: '/images/Y10.jpg',
      sizes: ['One Size'],
      colors: ['Pink', 'Purple', 'Blue'],
      rating: 5,
      reviews: 356,
    },
  ];

  // ========== FAIRYCORE COLLECTION (5 items) ==========
  // EDIT: Update product names, descriptions, or add more details
  const fairycoreProducts = [
    {
      id: 'fairycore-1',
      name: 'Tulle Ballerina Skirt',
      price: 749,
      currency: '₱',
      category: 'Fairycore',
      description: 'Ethereal tulle skirt with multiple layers',
      longDescription: 'Float through life in our Tulle Ballerina Skirt. Layers of ethereal tulle create an enchanting silhouette that\'s perfect for the fairycore aesthetic. The lightweight fabric moves beautifully, making every step feel magical. Ideal for performances or dreamy photo shoots.',
      image: '/images/f1.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Mint Green', 'Lavender', 'Blush'],
      rating: 5,
      reviews: 274,
    },
    {
      id: 'fairycore-2',
      name: 'Floral Fairy Maxi Dress',
      price: 999,
      currency: '₱',
      category: 'Fairycore',
      description: 'Long flowing dress with enchanted floral print',
      longDescription: 'Become a woodland fairy in our Floral Fairy Maxi Dress. This enchanting gown features a gorgeous floral print and flows gracefully to the ground. The ethereal fabric and romantic design make it perfect for festivals, special occasions, or everyday fairy magic.',
      image: '/images/f2.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Sage Green', 'Ivory', 'Dusty Rose'],
      rating: 5,
      reviews: 189,
    },
    {
      id: 'fairycore-3',
      name: 'Woodland Fairy Wings',
      price: 599,
      currency: '₱',
      category: 'Fairycore',
      description: 'Delicate iridescent fairy wings accessory',
      longDescription: 'Spread your wings with our Woodland Fairy Wings. These delicate, iridescent wings are handcrafted with care. Perfect for festivals, costume events, or bringing a touch of magic to any outfit. Comfortable straps ensure they stay secure all day long.',
      image: '/images/f3.jpg',
      sizes: ['One Size'],
      colors: ['Iridescent', 'Rainbow', 'Mint'],
      rating: 5,
      reviews: 421,
    },
    {
      id: 'fairycore-4',
      name: 'Moss Green Corset Top',
      price: 649,
      currency: '₱',
      category: 'Fairycore',
      description: 'Enchanted corset top in moss green with nature details',
      longDescription: 'Channel woodland magic with our Moss Green Corset Top. The rich moss green color paired with enchanted nature details creates the perfect fairycore piece. The structured corset shape is both flattering and comfortable. Perfect for layering or wearing solo.',
      image: '/images/f4.jpg',
      sizes: ['XS', 'S', 'M'],
      colors: ['Moss Green', 'Forest Green', 'Sage'],
      rating: 5,
      reviews: 156,
    },
    {
      id: 'fairycore-5',
      name: 'Forest Spirit Crown',
      price: 699,
      currency: '₱',
      category: 'Fairycore',
      description: 'Magical crown with woodland elements and gemstones',
      longDescription: 'Reign as the forest spirit with our magical Crown. This stunning crown features woodland elements and sparkling gemstones that catch the light beautifully. Perfect for festivals, photo shoots, or adding an enchanted touch to any fairycore look.',
      image: '/images/f5.jpg',
      sizes: ['One Size'],
      colors: ['Gold/Green', 'Silver/Mint', 'Bronze/Sage'],
      rating: 5,
      reviews: 312,
    },
  ];

  // Get products for selected category
  const getCategoryProducts = () => {
    switch (selectedCategory) {
      case 'fairycore':
        return fairycoreProducts;
      case 'coquette':
        return coquetteProducts;
      case 'y2k':
        return y2kProducts;
      default:
        return fairycoreProducts;
    }
  };

  // Best sellers (sample of first 4 items from each category)
  const bestSellers = [...coquetteProducts.slice(0, 2), ...fairycoreProducts.slice(0, 2)];

  // Newsletter subscription handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // ========== COLLECTION CARDS DATA ==========
  // EDIT: Update collection names, colors, descriptions, or add new collections
  const collections = [
    {
      id: 'coquette',
      name: 'Coquette',
      emoji: '🎀',
      count: 10,
      description: 'Ribbons, lace & feminine charm',
      color: '#ff69b4',
      bgImage: '/coquettebg.jpg'  // EDIT: Change background image path here
    },
    {
      id: 'y2k',
      name: 'Y2K',
      emoji: '✨',
      count: 10,
      description: 'Early 2000s nostalgia & butterfly energy',
      color: '#ffd700',
      bgImage: '/y2kbg.jpg'  // EDIT: Change background image path here
    },
    {
      id: 'fairycore',
      name: 'Fairycore',
      emoji: '🌸',
      count: 5,
      description: 'Ethereal, floral & enchanted',
      color: '#98d8c8',
      bgImage: '/fairycorebg.jpg'  // EDIT: Change background image path here
    }
  ];

  // ========== FEATURES / TRUST BADGES ==========
  // EDIT: Add, remove, or customize trust features displayed to customers
  const features = [
    { icon: '✨', title: 'Curated Aesthetics', description: 'Handpicked by style experts' },
    { icon: '🚚', title: 'Premium Quality', description: 'Ethically made, luxe feel' },
    { icon: '💝', title: 'Free Shipping', description: 'On orders over $75' },
    { icon: '🎀', title: 'Easy Returns', description: '30-day hassle-free returns' }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sophia R.',
      product: 'Blush Ribbon Slip Dress',
      text: 'Absolutely obsessed with my Blush Ribbon Slip Dress! The quality is incredible and it fits like a dream. I got so many compliments! ✨',
      rating: 5
    },
    {
      name: 'Lily M.',
      product: 'Tulle Ballerina Skirt',
      text: 'The Tulle Ballerina Skirt is everything I ever wanted. It\'s so ethereal and perfect for my fairycore aesthetic. 100% recommend!',
      rating: 5
    },
    {
      name: 'Emma K.',
      product: 'Y2K Butterfly Mini Skirt',
      text: 'The Y2K Butterfly Set is exactly how I imagined it from the photos. Fast shipping, beautiful packaging with ribbon 🎀',
      rating: 5
    },
    {
      name: 'Isabelle T.',
      product: 'Romantic Corset Blouse',
      text: 'I\'ve ordered 3 times now and every piece is gorgeous. This brand truly understands the coquette aesthetic!',
      rating: 5
    }
  ];

  // Blog articles data
  const articles = [
    {
      id: 1,
      title: 'How to Style the Coquette Aesthetic This Season',
      category: 'STYLE GUIDE',
      date: 'April 15, 2026',
      readTime: '5 MIN READ',
      excerpt: 'From ribbon details to lace trim, we break down everything you need to embrace your most feminine self.'
    },
    {
      id: 2,
      title: 'Y2K Fashion Is Back: 10 Must-Have Pieces',
      category: 'TRENDS',
      date: 'April 8, 2026',
      readTime: '7 MIN READ',
      excerpt: 'Low-rise everything, butterfly prints, and metallic accents — the early 2000s have officially returned.'
    },
    {
      id: 3,
      title: 'Enter the Fairycore Era: Enchanted Outfit Ideas',
      category: 'LOOKBOOK',
      date: 'March 30, 2026',
      readTime: '6 MIN READ',
      excerpt: 'Flowing silhouettes, floral prints, and nature-inspired accessories for your inner woodland fairy.'
    }
  ];

  return (
    <div className="home-page" style={{ backgroundImage: "url('/coquette.jpg')" }}>
      {/* Hero Banner */}
      <Hero />

      {/* Main Content */}
      <div className="container">
        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* ====== COLLECTION CARDS - Find Your Aesthetic Era ====== */}
        <section className="collections-section">
          <div className="section-divider">✦ SHOP BY AESTHETIC ✦</div>
          <div className="section-header">
            <h2 className="section-title">Find Your Aesthetic Era</h2>
            <p className="section-description">Discover curated collections handpicked for your style</p>
          </div>
          
          <div className="collections-cards">
            {collections.map(collection => (
              <div 
                key={collection.id} 
                className="collection-card" 
                style={{ 
                  borderColor: collection.color,
                  backgroundImage: `url('${collection.bgImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="collection-card-content">
                  <h3>{collection.name}</h3>
                  <div className="collection-emoji">{collection.emoji}</div>
                  <p className="collection-count">{collection.count} PIECES</p>
                  <p className="collection-emoji">{collection.emoji}</p>
                  <p className="collection-description">{collection.description}</p>
                  <Link to="/shop" className="collection-btn" style={{ borderColor: collection.color, color: collection.color }}>
                    SHOP NOW →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== KITTY FINDS COLLECTION - Unified with dropdown ====== */}
        <section className="category-section">
          <div className="section-divider">✦ KITTY FINDS COLLECTION ✦</div>
          <div className="section-header">
            <h2 className="section-title">Browse All Pieces</h2>
            <p className="section-description">Explore our handpicked selection across all aesthetics</p>
            
            {/* Category Selection Dropdown */}
            <div className="category-selector">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-dropdown"
              >
                <option value="coquette">💕 Coquette</option>
                <option value="y2k">✨ Y2K</option>
                <option value="fairycore">🌙 Fairycore</option>
              </select>
            </div>
          </div>
          <ProductList products={getCategoryProducts()} loading={loading} showFilters={false} />
        </section>

        {/* ====== BEST SELLERS ====== */}
        <section className="best-sellers-section">
          <div className="section-divider">✦ BEST SELLERS ✦</div>
          <div className="section-header">
            <h2 className="section-title">Customer Favorites</h2>
            <p className="section-description">Shop the pieces our customers love most</p>
          </div>
          <ProductList products={bestSellers} loading={loading} showFilters={false} />
        </section>

        {/* ====== SPRING SALE COUNTDOWN ====== */}
        <section className="sale-section">
          <div className="section-divider">✦ LIMITED TIME OFFER ✦</div>
          <h2>Spring Sale — Up to 40% Off</h2>
          <p>Our biggest sale of the season. Dreamy pieces at their most irresistible prices.</p>
          
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-number">{String(timeLeft.days || 0).padStart(2, '0')}</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{String(timeLeft.hours || 0).padStart(2, '0')}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{String(timeLeft.minutes || 0).padStart(2, '0')}</span>
              <span className="countdown-label">MINS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{String(timeLeft.seconds || 0).padStart(2, '0')}</span>
              <span className="countdown-label">SECS</span>
            </div>
          </div>

          <Link to="/shop" className="shop-sale-btn">🎀 SHOP THE SALE</Link>
        </section>

        {/* ====== FEATURES / TRUST BADGES ====== */}
        <section className="features-section">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-box">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====== TESTIMONIALS - What Our Dreamers Say ====== */}
        <section className="testimonials-section">
          <div className="section-divider">✦ REAL LOVE NOTES ✦</div>
          <div className="section-header">
            <h2 className="section-title">What Our Dreamers Say</h2>
            <p className="section-description">Real reviews from our wonderful customers</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array(testimonial.rating).fill('⭐').join('')}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.name.charAt(0)}</div>
                  <div>
                    <p className="author-name">{testimonial.name}</p>
                    <p className="author-product">{testimonial.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== BLOG / LOOKBOOK ====== */}
        <section className="blog-section">
          <div className="section-divider">✦ STYLE DIARIES ✦</div>
          <div className="section-header">
            <h2 className="section-title">From the Lookbook</h2>
            <p className="section-description">Styling tips, trends & aesthetic inspiration</p>
          </div>

          <div className="blog-grid">
            {articles.map(article => (
              <article key={article.id} className="blog-card">
                <div className="blog-meta">
                  <span className="blog-category">{article.category}</span>
                  <span className="blog-date">{article.date}</span>
                </div>
                <h3 className="blog-title">{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>
                <div className="blog-footer">
                  <span className="read-time">{article.readTime}</span>
                  <button className="read-more" onClick={() => console.log('Read article:', article.id)}>READ MORE →</button>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/blog" className="view-all-btn">ALL ARTICLES →</Link>
          </div>
        </section>

        {/* ====== COMMISSION REWORK BUNDLE SAMPLES ====== */}
        <section className="reworks-section">
          <div className="section-divider">✦ HANDPICKED FOR YOU ✦</div>
          <div className="section-header">
            <h2 className="section-title">Commission Rework Bundle Samples</h2>
            <p className="section-description">See samples from our custom rework services — transforming pieces just for you</p>
          </div>
          <div className="reworks-grid">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="rework-panel">
                <div className="rework-image-placeholder">
                  <img 
                    src={`/images/${i + 1}.jpg`}
                    alt={`Rework ${i + 1}`}
                    className="rework-image"
                  />
                </div>
                <div className="rework-info">
                  <h3>Rework #{i + 1}</h3>
                  <p className="rework-status">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== NEWSLETTER SIGNUP ====== */}
        <section className="newsletter-section">
          <div className="section-divider">✦ JOIN THE INNER CIRCLE ✦</div>
          <div className="newsletter-content">
            <h2>Get 15% Off Your First Order</h2>
            <p>Sign up for exclusive drops, styling tips, early access sales & all the dreamy things delivered straight to your inbox. 🎀</p>
            
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">SUBSCRIBE 🎀</button>
            </form>
            
            {subscribed && <p className="subscribe-success">✨ Thank you for subscribing! Check your inbox. 💌</p>}
            <p className="newsletter-disclaimer">No spam, only dreamy things. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
