# Kitty's Finds - Quick Start Guide

## 🚀 Getting Started (5 minutes)

### Step 1: Open Two Terminals

You'll need two terminal windows open - one for backend, one for frontend.

### Step 2: Start the Backend

```bash
# Terminal 1 - Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

You should see:
```
🎀 Kitty's Finds Backend is running on http://localhost:5000
```

### Step 3: Start the Frontend

```bash
# Terminal 2 - Navigate to client directory  
cd client

# Install dependencies (first time only)
npm install

# Start the React app
npm start
```

Your browser should automatically open http://localhost:3000

## 🎨 What's Inside

✅ **Complete E-commerce Functionality:**
- Browse products with filtering & sorting
- View detailed product information
- Add items to shopping cart
- Modify cart quantities
- Checkout process with order confirmation

✅ **Beautiful Design:**
- Coquette & fairycore aesthetic
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional layout

✅ **Editable Code:**
- All code has detailed comments
- Easy-to-find EDIT markers for customization
- Example code snippets included

## 📝 First Customizations

### 1. Change Website Name & Logo

Edit: `client/src/components/Header.js` (Line 20)
```javascript
<h1>🎀 Your Custom Name</h1>
```

### 2. Add More Products

Edit: `server/server.js` (Lines 37-80)
```javascript
{
  id: uuidv4(),
  name: "Your Product Name",
  price: 49.99,
  // ... other properties
}
```

### 3. Change Product Categories

In `server/server.js`, modify the product category field:
```javascript
category: "your-category-name",
```

### 4. Update Hero Section Text

Edit: `client/src/components/Hero.js` (Lines 12-17)
```javascript
<h1 className="hero-title">Your Title Here</h1>
<p className="hero-subtitle">Your subtitle here</p>
```

### 5. Customize Colors

Edit: `client/src/styles/global.css` (Lines 7-20)
```css
:root {
  --primary-pink: #ffc0cb;  /* Change these colors */
  --dark-pink: #ff69b4;
  /* ... etc */
}
```

## 🛒 Test the Full Flow

1. **Browse:** Visit http://localhost:3000 and explore products
2. **Filter:** Use category and sort options
3. **View Details:** Click on any product
4. **Add to Cart:** Select size, color, quantity
5. **Go to Cart:** Click the shopping bag icon
6. **Checkout:** Fill in fake information and place order
7. **Confirm:** See order confirmation screen

## 🔧 Common Edits

### Change API Port
Edit: `server/server.js` (Line 8)
```javascript
const PORT = process.env.PORT || 5000;  // Change 5000 to your port
```

Then update frontend: `client/src/utils/api.js` (Line 4)
```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

### Add New Pages
1. Create new file in `client/src/pages/YourPage.js`
2. Add route in `client/src/App.js`:
```javascript
<Route path="/your-page" element={<YourPage />} />
```
3. Add navigation link in `client/src/components/Header.js`

### Change Product Images
Edit products in `server/server.js` and update the `image` field with:
- Local file path
- URL to image
- Placeholder from: `https://via.placeholder.com/400`

## 🎨 Design Customization

### Theme Colors
All colors are in `client/src/styles/global.css` using CSS variables:
- `--primary-pink` - Main color
- `--dark-pink` - Accents
- `--rose` - Highlights
- `--lavender` - Secondary
- `--mint` - Complementary
- `--gold` - Accents

### Fonts
- Headings: Playfair Display
- Body text: Poppins

Both imported from Google Fonts in `client/public/index.html`

## ⚙️ Backend Endpoints

Test these in Postman or curl:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/PRODUCT_ID

# Get categories
curl http://localhost:5000/api/categories

# Create cart
curl -X POST http://localhost:5000/api/cart

# Check health
curl http://localhost:5000/api/health
```

## 🔍 File Structure Cheat Sheet

```
server/
├── server.js          ← Edit products, API logic here
└── package.json       ← Dependencies

client/
├── src/
│   ├── App.js         ← Routes & layout
│   ├── pages/         ← Page components (Home, Cart, Checkout, etc.)
│   ├── components/    ← Reusable components (Header, Footer, etc.)
│   ├── utils/         ← API functions (api.js)
│   └── styles/        ← Global CSS & theme
└── public/
    └── index.html     ← HTML template
```

## 🚨 Troubleshooting

**Q: Backend won't start**
- Check if port 5000 is already in use
- Try: `npm install` first
- Close firewall if blocking

**Q: Frontend can't connect to backend**
- Verify backend is running on :5000
- Check API_BASE_URL in `client/src/utils/api.js`
- Check browser console for errors

**Q: Products not showing**
- Verify backend is running
- Check backend console for errors
- Refresh browser (hard refresh: Ctrl+Shift+R)

**Q: Port 3000 already in use**
- Backend uses :5000, frontend uses :3000
- Close other apps using these ports
- Or change PORT in server.js to different number

## 📦 Adding npm Packages

If you need additional packages:

```bash
# Backend
cd server
npm install package-name

# Frontend
cd client
npm install package-name
```

## 🔐 Before Going Live

- ✅ Replace mock data with real database
- ✅ Integrate real payment processor
- ✅ Add user authentication
- ✅ Add email notifications
- ✅ Configure production environment
- ✅ Set up HTTPS/SSL
- ✅ Add security headers
- ✅ Test on all devices

## 📚 Code Examples

See `client/src/CODE_EXAMPLES.js` for:
- Adding promo codes
- Integrating Stripe payment
- Adding user authentication
- Implementing wishlist
- Custom hooks and more

## 💡 Tips

1. **Use browser DevTools** - F12 to debug
2. **Check console** - Both browser and terminal
3. **Use VS Code Extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Thunder Client for API testing
4. **Comments are your friend** - All code has detailed comments
5. **Test features step by step** - Don't build everything at once

## 🎯 Next Steps

1. ✅ Run the website and test it
2. 📝 Customize products and colors
3. 🔄 Replace mock data with your own
4. 💳 Integrate payment processing
5. 👤 Add user authentication
6. 🚀 Deploy to the internet

## 🆘 Need Help?

All code files have detailed comments with:
- Function descriptions
- Parameter explanations
- EDIT markers showing what to change
- Example implementations

Look for comments starting with:
- `// EDIT:` - Things you should change
- `// TODO:` - Future enhancements
- `/**` - Detailed documentation

---

**Happy coding! 🎀✨**

For more details, see README.md
