import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart, createCart } from '../utils/api';
import './styles/ProductDetail.css';

// All products database
const ALL_PRODUCTS = [
  { id: 'coquette-1', name: 'Blush Ribbon Slip Dress', price: 799, currency: '₱', category: 'Coquette', description: 'Elegant blush-colored slip dress with delicate ribbon details', longDescription: 'Experience timeless elegance with our Blush Ribbon Slip Dress. Crafted from premium silk, this dress features delicate ribbon detailing. Perfect for creating a romantic, coquette aesthetic.', image: '/images/C1.jpg', sizes: ['XS', 'S', 'M'], colors: ['Blush', 'White', 'Rose'], rating: 5, reviews: 247 },
  { id: 'coquette-2', name: 'Pastel Cloud Cardigan', price: 649, currency: '₱', category: 'Coquette', description: 'Soft, cloud-like cardigan in pastel pink', longDescription: 'Wrap yourself in luxury with our Pastel Cloud Cardigan. Made from the softest materials, this cardigan feels like wearing a cloud. The pastel pink hue is both calming and sophisticated.', image: '/images/C2.jpg', sizes: ['XS', 'S', 'M'], colors: ['Pastel Pink', 'Lavender'], rating: 5, reviews: 98 },
  { id: 'coquette-3', name: 'Romantic Corset Blouse', price: 749, currency: '₱', category: 'Coquette', description: 'Victorian-inspired corset blouse with lace trim', longDescription: 'Channel your inner romantic with this stunning Corset Blouse. Features intricate lace trim and structured boning. The white silk base contrasts beautifully with delicate embroidery.', image: '/images/C3.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Cream', 'Blush'], rating: 5, reviews: 311 },
  { id: 'coquette-4', name: 'Silk Charmeuse Slip', price: 599, currency: '₱', category: 'Coquette', description: 'Luxurious silk charmeuse slip with adjustable straps', longDescription: 'Indulge in luxury with our Silk Charmeuse Slip. Made from premium silk, this slip is buttery smooth. The adjustable straps ensure the perfect fit, while the elegant drape creates a sophisticated silhouette.', image: '/images/C4.jpg', sizes: ['XS', 'S', 'M'], colors: ['Ivory', 'Champagne', 'Rose Gold'], rating: 5, reviews: 156 },
  { id: 'coquette-5', name: 'Lace Trim Camisole', price: 499, currency: '₱', category: 'Coquette', description: 'Delicate camisole with French lace trim', longDescription: 'Add a touch of elegance to your wardrobe with our Lace Trim Camisole. Featuring authentic French lace detailing, this camisole is both delicate and durable. Perfect as a standalone piece or layered.', image: '/images/C5.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Black', 'Pink'], rating: 4, reviews: 203 },
  { id: 'coquette-6', name: 'Pearl Button Cardigan', price: 699, currency: '₱', category: 'Coquette', description: 'Creamy cardigan adorned with vintage pearl buttons', longDescription: 'Channel vintage charm with our Pearl Button Cardigan. Each button is a vintage pearl, adding timeless sophistication. The creamy color is versatile and pairs beautifully with any wardrobe.', image: '/images/C6.jpg', sizes: ['XS', 'S', 'M'], colors: ['Cream', 'Blush', 'Lavender'], rating: 5, reviews: 189 },
  { id: 'coquette-7', name: 'Velvet Babydoll Dress', price: 849, currency: '₱', category: 'Coquette', description: 'Soft velvet babydoll dress with bow details', longDescription: 'Step into a fairytale with our Velvet Babydoll Dress. This playful yet sophisticated piece features the softest velvet and darling bow details. The babydoll silhouette is universally flattering and incredibly comfortable.', image: '/images/C7.jpg', sizes: ['XS', 'S', 'M'], colors: ['Pink', 'Rose', 'Mauve'], rating: 5, reviews: 275 },
  { id: 'coquette-8', name: 'Sheer Overlay Top', price: 549, currency: '₱', category: 'Coquette', description: 'Ethereal sheer overlay with embroidered details', longDescription: 'Create an ethereal look with our Sheer Overlay Top. The delicate embroidery details catch the light beautifully. Layer it over your favorite camisole for an enchanting ensemble.', image: '/images/C8.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Blush', 'Peach'], rating: 4, reviews: 142 },
  { id: 'coquette-9', name: 'Satin Bow Headpiece', price: 399, currency: '₱', category: 'Coquette', description: 'Luxurious satin bow for hair styling', longDescription: 'Complete your coquette look with this stunning Satin Bow Headpiece. Made from premium satin in vibrant colors. Perfect for parties, photoshoots, or everyday glamour.', image: '/images/C9.jpg', sizes: ['One Size'], colors: ['Pink', 'White', 'Black'], rating: 5, reviews: 421 },
  { id: 'coquette-10', name: 'Lace Thigh Highs', price: 299, currency: '₱', category: 'Coquette', description: 'Delicate lace thigh-high socks with bow trim', longDescription: 'Add a touch of playful femininity with our Lace Thigh Highs. These delicate socks feature intricate lace patterns and adorable bow trims. Perfect for pairing with skirts and dresses.', image: '/images/C10.jpg', sizes: ['One Size'], colors: ['White', 'Black', 'Pink'], rating: 5, reviews: 356 },
  { id: 'y2k-1', name: 'Y2K Butterfly Mini Skirt', price: 549, currency: '₱', category: 'Y2K', description: 'Low-rise mini skirt with butterfly print', longDescription: 'Channel peak Y2K energy with this iconic Butterfly Mini Skirt. The low-rise cut and bold butterfly print are straight from the early 2000s playbook. Pair with a baby tee and platform sneakers.', image: '/images/Y1.jpg', sizes: ['XS', 'S', 'M'], colors: ['Black', 'Pink', 'Purple'], rating: 5, reviews: 132 },
  { id: 'y2k-2', name: 'Cargo Pants with Straps', price: 699, currency: '₱', category: 'Y2K', description: 'Classic cargo pants with multiple pockets and straps', longDescription: 'No Y2K wardrobe is complete without cargo pants. Our version features the perfect amount of pockets and functional straps. Perfect for styling with crop tops for an authentic early-2000s vibe.', image: '/images/Y2.jpg', sizes: ['XS', 'S', 'M'], colors: ['Khaki', 'Black', 'Hot Pink'], rating: 5, reviews: 267 },
  { id: 'y2k-3', name: 'Metallic Crop Top', price: 449, currency: '₱', category: 'Y2K', description: 'Shiny metallic crop top perfect for the club', longDescription: 'Get ready to shine in our Metallic Crop Top. The reflective metallic finish catches every light. Whether you\'re hitting the club or going to a festival, this top delivers serious Y2K vibes.', image: '/images/Y3.jpg', sizes: ['XS', 'S', 'M'], colors: ['Silver', 'Gold', 'Purple'], rating: 4, reviews: 198 },
  { id: 'y2k-4', name: 'Baby Tee Graphic Print', price: 399, currency: '₱', category: 'Y2K', description: 'Vintage-style baby tee with trendy graphic', longDescription: 'The ultimate Y2K staple, our Baby Tee features a vintage graphic print that screams early-2000s nostalgia. A timeless piece that every fashion enthusiast needs.', image: '/images/Y4.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Black', 'Pink'], rating: 5, reviews: 445 },
  { id: 'y2k-5', name: 'Butterfly Hair Clips', price: 299, currency: '₱', category: 'Y2K', description: 'Colorful butterfly hair clips set', longDescription: 'Accessorize your Y2K look with these iconic Butterfly Hair Clips. This set includes multiple colors and sizes. A must-have for any 2000s enthusiast!', image: '/images/Y5.jpg', sizes: ['One Size'], colors: ['Rainbow', 'Pink', 'Purple'], rating: 5, reviews: 512 },
  { id: 'y2k-6', name: 'Choker Necklace Set', price: 349, currency: '₱', category: 'Y2K', description: 'Multi-piece choker set with various styles', longDescription: 'Go back to the 2000s with our Choker Necklace Set. This collection includes multiple styles and materials. Layer them up for a customized look that\'s authentically Y2K.', image: '/images/Y6.jpg', sizes: ['One Size'], colors: ['Black', 'Silver', 'Rainbow'], rating: 5, reviews: 389 },
  { id: 'y2k-7', name: 'Holographic Windbreaker', price: 799, currency: '₱', category: 'Y2K', description: 'Futuristic holographic windbreaker jacket', longDescription: 'Make a statement with our Holographic Windbreaker. This eye-catching jacket features a reflective holographic finish. Perfect for standing out at festivals, parties, or just around town.', image: '/images/Y7.jpg', sizes: ['XS', 'S', 'M'], colors: ['Silver', 'Iridescent'], rating: 5, reviews: 234 },
  { id: 'y2k-8', name: 'Rhinestone Tank Top', price: 499, currency: '₱', category: 'Y2K', description: 'Sparkly tank top covered in rhinestones', longDescription: 'Shine bright like a diamond in our Rhinestone Tank Top. Every inch is covered in sparkling rhinestones. A Y2K party essential!', image: '/images/Y8.jpg', sizes: ['XS', 'S', 'M'], colors: ['Black', 'White', 'Pink'], rating: 5, reviews: 267 },
  { id: 'y2k-9', name: 'Platform Chunky Sneakers', price: 899, currency: '₱', category: 'Y2K', description: 'Iconic platform chunky sneakers with colorful details', longDescription: 'The ultimate Y2K shoe, our Platform Chunky Sneakers feature the signature chunky sole and bold colorways. Comfortable enough for all-day wear, cool enough to turn heads.', image: '/images/Y9.jpg', sizes: ['5', '6', '7', '8', '9', '10'], colors: ['White/Pink', 'White/Purple', 'Black/Silver'], rating: 5, reviews: 198 },
  { id: 'y2k-10', name: 'Butterfly Chain Wallet', price: 449, currency: '₱', category: 'Y2K', description: 'Cute butterfly-shaped wallet with chain strap', longDescription: 'Carry your essentials in style with our Butterfly Chain Wallet. This adorable butterfly-shaped wallet comes with a chain strap. Perfect for nights out!', image: '/images/Y10.jpg', sizes: ['One Size'], colors: ['Pink', 'Purple', 'Blue'], rating: 5, reviews: 356 },
  { id: 'fairycore-1', name: 'Tulle Ballerina Skirt', price: 749, currency: '₱', category: 'Fairycore', description: 'Ethereal tulle skirt with multiple layers', longDescription: 'Step into an enchanted forest with our Tulle Ballerina Skirt. The multiple layers of delicate tulle create an ethereal, magical silhouette. Perfect for creating a fairycore look.', image: '/images/f1.jpg', sizes: ['XS', 'S', 'M'], colors: ['Mint Green', 'Lavender', 'Blush'], rating: 5, reviews: 274 },
  { id: 'fairycore-2', name: 'Floral Fairy Maxi Dress', price: 999, currency: '₱', category: 'Fairycore', description: 'Long flowing dress with enchanted floral print', longDescription: 'Become a woodland fairy in our stunning Floral Fairy Maxi Dress. This floor-length gown features an enchanting floral print. The ultimate fairycore statement piece.', image: '/images/f2.jpg', sizes: ['XS', 'S', 'M'], colors: ['Sage Green', 'Ivory', 'Dusty Rose'], rating: 5, reviews: 189 },
  { id: 'fairycore-3', name: 'Woodland Fairy Wings', price: 599, currency: '₱', category: 'Fairycore', description: 'Delicate iridescent fairy wings accessory', longDescription: 'Complete your fairycore transformation with these enchanting Fairy Wings. Made with iridescent materials, they shimmer and shine. Perfect for festivals and photo shoots.', image: '/images/f3.jpg', sizes: ['One Size'], colors: ['Iridescent', 'Rainbow', 'Mint'], rating: 5, reviews: 421 },
  { id: 'fairycore-4', name: 'Moss Green Corset Top', price: 649, currency: '₱', category: 'Fairycore', description: 'Enchanted corset top in moss green with nature details', longDescription: 'Embrace your inner woodland fairy with our Moss Green Corset Top. This structured top is perfect for pairing with skirts or pants for a magical fairycore aesthetic.', image: '/images/f4.jpg', sizes: ['XS', 'S', 'M'], colors: ['Moss Green', 'Forest Green', 'Sage'], rating: 5, reviews: 156 },
  { id: 'fairycore-5', name: 'Forest Spirit Crown', price: 699, currency: '₱', category: 'Fairycore', description: 'Magical crown with woodland elements and gemstones', longDescription: 'Reign as the forest spirit with our enchanting Crown. Adorned with woodland elements and gemstones. Perfect for completing your fairycore look at special occasions.', image: '/images/f5.jpg', sizes: ['One Size'], colors: ['Gold/Green', 'Silver/Mint', 'Bronze/Sage'], rating: 5, reviews: 312 },
];

function getColorCode(colorName) {
  const colorMap = {
    'Pink': '#ffc0cb', 'Rose Pink': '#ff1493', 'Lavender': '#e6b3f0', 'Blush': '#ffb6c1', 'Coral': '#ff7f50',
    'Cream': '#fff8dc', 'White': '#ffffff', 'Black': '#000000', 'Mint Green': '#98d8c8', 'Sage': '#9dc183',
    'Ivory': '#fffff0', 'Gold': '#ffd700', 'Blue': '#87ceeb', 'Purple': '#da70d6', 'Rose': '#ff1493',
    'Pastel Pink': '#ffc0cb', 'Khaki': '#f0e68c', 'Hot Pink': '#ff69b4', 'Silver': '#c0c0c0', 'Iridescent': '#d4af37',
    'Rainbow': '#ff0000', 'Mint': '#98d8c8', 'Moss Green': '#708238', 'Forest Green': '#228b22', 'Dusty Rose': '#c08081',
    'Gold/Green': '#daa520', 'Silver/Mint': '#c0c0c0', 'Bronze/Sage': '#cd7f32', 'Peach': '#ffb347', 'Mauve': '#e0b0ff',
    'Sage Green': '#9dc183', 'White/Pink': '#ffffff', 'White/Purple': '#ffffff', 'Black/Silver': '#000000',
    'Champagne': '#f7e7ce', 'Rose Gold': '#faa460',
  };
  return colorMap[colorName] || '#cccccc';
}

function ProductDetail({ cartId, setCartId }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = ALL_PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes?.[0] || '');
      setSelectedColor(found.colors?.[0] || '');
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!cartId) {
      createCart()
        .then(newId => {
          setCartId(newId);
          localStorage.setItem('cartId', newId);
        })
        .catch(err => {
          console.error('Error creating cart:', err);
          // Try creating cart again if first attempt fails
          setTimeout(() => {
            createCart()
              .then(newId => {
                setCartId(newId);
                localStorage.setItem('cartId', newId);
              })
              .catch(err2 => console.error('Cart creation retry failed:', err2));
          }, 500);
        });
    }
  }, [cartId, setCartId]);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color');
      return;
    }
    try {
      // Ensure we have a cartId - create one if needed
      let currentCartId = cartId;
      if (!currentCartId) {
        currentCartId = await createCart();
        setCartId(currentCartId);
        localStorage.setItem('cartId', currentCartId);
      }
      
      await addToCart(currentCartId, { productId: id, quantity: parseInt(quantity), size: selectedSize, color: selectedColor });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      // If cart not found, try creating a new cart and retrying
      if (err.message.includes('Cart not found') || err.message.includes('not found')) {
        try {
          const newCartId = await createCart();
          setCartId(newCartId);
          localStorage.setItem('cartId', newCartId);
          await addToCart(newCartId, { productId: id, quantity: parseInt(quantity), size: selectedSize, color: selectedColor });
          setAddedToCart(true);
          setTimeout(() => setAddedToCart(false), 2000);
        } catch (retryErr) {
          alert('Error adding to cart: ' + retryErr.message);
        }
      } else {
        alert('Error adding to cart: ' + err.message);
      }
    }
  };

  if (loading) return <div className="product-detail-loading">Loading product...</div>;
  if (!product) return <div className="product-detail-error"><h2>Product Not Found</h2></div>;

  return (
    <div className="product-detail">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Shop</button>
        <div className="product-detail-content">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="product-main-image" />
          </div>
          <div className="product-info-section">
            <h1 className="product-detail-name">{product.name}</h1>
            <div className="product-detail-rating">
              <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>
            <div className="product-detail-price">
              <span className="price">{product.currency}{product.price}</span>
              <span className="badge">Limited Edition</span>
            </div>
            <p className="product-detail-description">{product.description}</p>
            {product.longDescription && <p className="product-long-description">{product.longDescription}</p>}
            
            <div className="form-group">
              <label htmlFor="size-select">Size</label>
              <select id="size-select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="form-select">
                {product.sizes.map(size => <option key={size} value={size}>{size}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Color</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button key={color} className={`color-option ${selectedColor === color ? 'active' : ''}`} title={color} onClick={() => setSelectedColor(color)} style={{ backgroundColor: getColorCode(color) }}>
                    {selectedColor === color && '✓'}
                  </button>
                ))}
              </div>
              <p className="color-name">Selected: {selectedColor}</p>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input id="quantity" type="number" min="1" max="99" value={quantity} onChange={(e) => { const val = parseInt(e.target.value); if (val > 0 && val <= 99) setQuantity(val); }} className="quantity-input" />
            </div>

            <button className={`btn btn-primary add-to-cart-btn ${addedToCart ? 'added' : ''}`} onClick={handleAddToCart}>
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            <div className="product-features">
              <h3>Product Features</h3>
              <ul>
                <li>✨ Premium quality materials</li>
                <li>🎀 Aesthetic-inspired design</li>
                <li>💕 Carefully curated</li>
                <li>🚚 Fast shipping</li>
                <li>🔄 Easy 30-day returns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-container">
            <div className="review-item">
              <p className="review-rating">⭐⭐⭐⭐⭐</p>
              <p className="review-text">"Absolutely love this! Perfect quality and stunning design!" - Sarah</p>
            </div>
            <div className="review-item">
              <p className="review-rating">⭐⭐⭐⭐⭐</p>
              <p className="review-text">"This is exactly what I was looking for. Highly recommend!" - Emma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
