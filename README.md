# 3legant. E-commerce Store

A modern e-commerce store built with Next.js, TypeScript, and Tailwind CSS for the Ebra Full-Stack Developer Assessment.

## 🛍️ Features

### Pages

- **Home/Shop Page (/)**: Product listing with filters and sorting
- **Product Detail Page (/product/[id])**: Detailed product view with image gallery
- **Shopping Cart (/cart)**: Cart management with checkout flow

### Core Functionality

- ✅ Product listing from Fake Store API
- ✅ Product filtering by category and price
- ✅ Product sorting (price, name, rating)
- ✅ Product detail views with image galleries
- ✅ Shopping cart with add/remove/quantity management
- ✅ Responsive design with modern UI
- ✅ Loading states and error handling
- ✅ TypeScript for type safety

### Technical Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **API**: Fake Store API (https://fakestoreapi.com)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ebra-ecommerce-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with product listing
│   ├── globals.css        # Global styles
│   ├── cart/
│   │   └── page.tsx       # Shopping cart page
│   └── product/
│       └── [id]/
│           └── page.tsx   # Product detail page
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation header
│   └── ProductCard.tsx    # Product card component
├── context/
│   └── CartContext.tsx    # Cart state management
├── lib/
│   └── api.ts            # API utilities and error handling
└── types/
    └── product.ts        # TypeScript interfaces
```

## 🎨 Design Features

### UI/UX

- Clean, modern design following the provided Figma mockups
- **3legant.** branding and typography
- Responsive grid layouts for all screen sizes
- Smooth hover effects and transitions
- Professional color scheme (black/white/gray palette)

### Interactive Elements

- Product image galleries with thumbnail navigation
- Quantity selectors with +/- buttons
- Color selection options
- Wishlist functionality
- Dynamic price calculations
- Loading skeletons for better UX

## 🛒 Cart Features

### State Management

- Context API for global cart state
- Persistent cart across page navigation
- Real-time cart counter in header

### Cart Operations

- Add products with custom quantities
- Update item quantities
- Remove individual items
- Calculate subtotals and totals
- Shipping options (Free, Express, Pickup)
- Coupon code input (UI ready)

## 🔧 API Integration

### Fake Store API Endpoints

- `GET /products` - All products
- `GET /products/{id}` - Single product
- `GET /products/categories` - All categories
- `GET /products/category/{category}` - Products by category

### Error Handling

- Custom `ApiError` class
- Network error recovery
- Loading states for all async operations
- User-friendly error messages
- Retry functionality

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Features

- Mobile-first approach
- Collapsible navigation menu
- Responsive product grids
- Touch-friendly controls
- Optimized images for all devices

## 🎯 Key Components

### Header

- Logo and navigation links
- Search and user account icons
- Shopping cart with item counter
- Mobile menu for smaller screens

### ProductCard

- Product image with hover effects
- Star ratings and review counts
- Discount badges (-50% off)
- Quick "Add to Cart" on hover
- Wishlist heart icon

### Product Detail Page

- Large image gallery with navigation
- Product specifications and description
- Color selection options
- Quantity selector
- Add to cart and wishlist buttons
- Customer reviews section
- Breadcrumb navigation

### Cart Page

- 3-step checkout progress indicator
- Item management (quantity, remove)
- Shipping options selection
- Order summary with totals
- Coupon code application

## 🚨 Edge Cases Handled

### Cart Management

- ✅ Adding duplicate items (increases quantity)
- ✅ Removing non-existent items (graceful handling)
- ✅ Quantity validation (minimum 1)
- ✅ Empty cart state with call-to-action

### API & Network

- ✅ Loading states for all data fetching
- ✅ Error handling with retry options
- ✅ Fallback UI for failed requests
- ✅ Product not found scenarios

### User Experience

- ✅ Responsive design for all devices
- ✅ Accessible navigation and controls
- ✅ Fast image loading with Next.js optimization
- ✅ Smooth transitions and animations

## 🧪 Testing the Application

### Manual Testing Checklist

**Home Page**

- [ ] Products load from API
- [ ] Category filters work
- [ ] Price filters work
- [ ] Sorting options work
- [ ] Product cards are clickable
- [ ] Add to cart from cards works

**Product Detail Page**

- [ ] Product loads correctly
- [ ] Image gallery navigation works
- [ ] Color selection works
- [ ] Quantity selector works
- [ ] Add to cart works
- [ ] Breadcrumb navigation works

**Shopping Cart**

- [ ] Items appear after adding
- [ ] Quantity can be updated
- [ ] Items can be removed
- [ ] Totals calculate correctly
- [ ] Shipping options work
- [ ] Empty cart shows proper message

## 🔮 Future Enhancements

### Potential Features

- User authentication and accounts
- Product search functionality
- Product reviews and ratings
- Wishlist persistence
- Checkout and payment integration
- Order history and tracking
- Product recommendations
- Multi-language support

### Technical Improvements

- Unit and integration tests
- Performance monitoring
- SEO optimization
- Progressive Web App features
- Database integration
- Server-side rendering optimization

## 📋 Environment Variables

No environment variables are required for this project as it uses the public Fake Store API.

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

This Next.js application can be deployed to:

- Netlify
- Railway
- Heroku
- AWS Amplify
- Any Node.js hosting provider

## 📝 Notes

### Assignment Requirements

This project fulfills all requirements from the Ebra Full-Stack Developer Assessment:

- ✅ Next.js with App Router
- ✅ TypeScript throughout
- ✅ Tailwind CSS for styling
- ✅ Context API for state management
- ✅ Fake Store API integration
- ✅ Three main pages (Home, Product Detail, Cart)
- ✅ Proper error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ README with setup instructions

### Code Quality

- Clean, readable TypeScript code
- Meaningful component and variable names
- Proper error boundaries and handling
- Consistent code formatting
- Modern React patterns and hooks

---

**Built with Next.js By MAZEN for Ebra**
