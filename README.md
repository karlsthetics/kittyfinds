# Kitty's Finds - E-Commerce Website

A beautiful, fully functional e-commerce website with a coquette & fairycore aesthetic theme built with React.js and Node.js/Express.

## 📋 Features

✨ **Frontend Features:**
- Fully responsive design (mobile, tablet, desktop)
- Product listing with filtering and sorting
- Individual product detail pages
- Shopping cart with item management
- Checkout form with customer information
- Order confirmation screen
- Coquette & fairycore themed design
- Smooth animations and transitions

🛠️ **Backend Features:**
- RESTful API with Express.js
- Product management endpoints
- Shopping cart handling
- Order creation and tracking
- CORS enabled for frontend communication
- Mock database (ready for real database integration)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

#### 1. Backend Setup
```bash
cd server
npm install
```

#### 2. Frontend Setup
```bash
cd client
npm install
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### Start Frontend (in a new terminal)
```bash
cd client
npm start
# App opens on http://localhost:3000
```

## 📁 Project Structure

```
Kitty's Finds/
├── server/                  # Backend Express.js server
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file with all API routes
│
├── client/                  # Frontend React application
│   ├── public/
│   │   └── index.html      # Main HTML file
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Hero.js
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductList.js
│   │   │   └── styles/     # Component CSS files
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   └── styles/     # Page CSS files
│   │   ├── utils/
│   │   │   └── api.js      # API communication functions
│   │   ├── styles/
│   │   │   └── global.css  # Global styles & theme
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   └── package.json        # Frontend dependencies
```

## 🎨 Styling & Theme

The website uses a custom coquette & fairycore theme with:
- **Primary Colors:** Pink (#ffc0cb), Dark Pink (#ff69b4), Rose (#ff1493)
- **Secondary Colors:** Lavender (#e6b3f0), Mint (#98d8c8), Gold (#ffd700)
- **Fonts:** Playfair Display (headings), Poppins (body text)

All CSS variables are defined in [client/src/styles/global.css](client/src/styles/global.css) for easy customization.

## 🔧 Configuration & Customization

### Backend Configuration

**Edit `server/server.js` to:**
- Change API port number (default: 5000)
- Modify product database entries
- Adjust tax rates
- Add real payment processing
- Connect to a real database (MongoDB, PostgreSQL, etc.)

**Lines to edit:**
- Line 4: PORT variable
- Line 37-80: Product database array
- Line 111: Tax calculation (8%)

### Frontend Configuration

**Edit `client/src/utils/api.js` to:**
- Change API_BASE_URL if backend is on different host
- Add authentication headers if needed

**Edit `client/src/components/Hero.js` to:**
- Change hero tagline and description
- Update promotional banner content

**Edit `client/src/components/Footer.js` to:**
- Update contact information
- Add real social media links

**Edit `client/src/components/ProductCard.js` to:**
- Add more product attributes
- Integrate wishlist functionality

### Global Theme Customization

All theme colors can be changed in [client/src/styles/global.css](client/src/styles/global.css):

```css
:root {
  /* Change these colors for new theme */
  --primary-pink: #ffc0cb;
  --dark-pink: #ff69b4;
  --rose: #ff1493;
  /* ... more variables ... */
}
```

## 📱 Responsive Design

The website is fully responsive:
- **Mobile:** < 640px (single column, optimized touch targets)
- **Tablet:** 640px - 1024px (2-column grid)
- **Desktop:** > 1024px (3-4 column grid)

All breakpoints are defined in global.css and component-specific CSS files.

## 🛒 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - Get all categories

### Shopping Cart
- `POST /api/cart` - Create new cart
- `GET /api/cart/:cartId` - Get cart contents
- `POST /api/cart/:cartId/add` - Add item to cart
- `PUT /api/cart/:cartId/update/:productId` - Update item quantity
- `DELETE /api/cart/:cartId/remove/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders/:orderId` - Get order details

## 🔐 Security Notes

⚠️ **Before deploying to production:**
1. Remove all CORS wildcard permissions
2. Add proper authentication/authorization
3. Integrate real payment processor (Stripe, PayPal)
4. Move to production database (MongoDB, PostgreSQL)
5. Add input validation and sanitization
6. Implement proper error handling
7. Add HTTPS/SSL certificate
8. Set environment variables for sensitive data

## 💻 Adding New Features

### Add New Product
Edit `server/server.js` line 37-80 and add to products array:
```javascript
{
  id: uuidv4(),
  name: "Product Name",
  price: 49.99,
  category: "category-name",
  description: "Product description",
  image: "image-url",
  sizes: ["XS", "S", "M", "L"],
  colors: ["Pink", "Lavender"],
  rating: 4.8,
  reviews: 12,
}
```

### Add New Filter
Edit `client/src/components/ProductList.js` to add new filter options.

### Add Payment Gateway
Edit `client/src/pages/Checkout.js` and integrate Stripe or PayPal SDK.

## 📦 Dependencies

### Backend (`server/package.json`)
- express: Web server framework
- cors: Enable cross-origin requests
- body-parser: Parse request bodies
- uuid: Generate unique IDs

### Frontend (`client/package.json`)
- react: UI library
- react-dom: React rendering
- react-router-dom: Client-side routing
- axios: HTTP client (alternative to fetch)

## 🐛 Troubleshooting

**Frontend can't connect to backend:**
- Check if backend is running on http://localhost:5000
- Edit `client/src/utils/api.js` and verify API_BASE_URL
- Check browser console for CORS errors

**Products not loading:**
- Verify backend is running
- Check network tab in browser DevTools
- Ensure `/api/products` endpoint is accessible

**Cart items not persisting:**
- Check browser LocalStorage settings
- Verify cartId is being saved correctly
- Check backend cart API endpoints

## 📝 License

This project is created for educational purposes. Feel free to modify and use as a starter template for your own projects.

## 🎯 Next Steps

1. **Connect Real Database** - Replace mock data with MongoDB/PostgreSQL
2. **Add Payment Processing** - Integrate Stripe or PayPal
3. **User Authentication** - Implement login/signup
4. **Order History** - Store orders in database
5. **Admin Dashboard** - Manage products and orders
6. **Email Notifications** - Send order confirmations
7. **Search & Analytics** - Add search and tracking

## 📞 Support

For questions or issues, check the code comments in each file. All functions have detailed comments explaining what they do and what needs to be edited.

---

**Made with 💕 and sparkles for Kitty's Finds**
