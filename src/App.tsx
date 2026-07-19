import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Gift, Check, ArrowRight, User, ShieldCheck, Heart, Send, X } from 'lucide-react';
import { Category, Product, CartItem } from './types';
import { products } from './data/products';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { BundleBuilder } from './components/BundleBuilder';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { BottomWidget } from './components/BottomWidget';

export default function App() {
  // Navigation & UI States
  const [currentCategory, setCurrentCategory] = useState<Category>('BESTSELLERS');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bundleOpen, setBundleOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  
  // Shopping Cart & User States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  // Checkout States
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'shipping' | 'success'>('idle');
  const [shippingAddress, setShippingAddress] = useState({
    name: 'Ken Nguyen',
    email: 'Kennguyen931908@gmail.com',
    phone: '0901234567',
    street: '123 Le Loi Street',
    city: 'Ho Chi Minh City',
    zip: '70000',
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('evereden_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Redirect Countdown State & Effect
  const [redirectSeconds, setRedirectSeconds] = useState(1);

  useEffect(() => {
    const countdown = setInterval(() => {
      setRedirectSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.location.href = 'https://snwbl.io/evereden/KEN46076';
    }, 1000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirectTimer);
    };
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('evereden_cart', JSON.stringify(newCart));
  };

  // Add to Cart
  const handleAddToCart = (product: Product, qty: number, size: string, scent: string) => {
    const cartItemId = `${product.id}-${size.replace(/\s+/g, '')}-${scent.replace(/\s+/g, '')}`;
    const existingIndex = cart.findIndex((item) => item.id === cartItemId);

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += qty;
    } else {
      newCart.push({
        id: cartItemId,
        product,
        quantity: qty,
        selectedSize: size,
        selectedScent: scent,
      });
    }

    saveCart(newCart);
    setCartOpen(true);
    setSelectedProduct(null); // close product modal if it was open
  };

  // Quick add from card
  const handleQuickAdd = (product: Product) => {
    const size = product.sizes[0] || 'Standard';
    const scent = product.scents[0] || 'Default';
    handleAddToCart(product, 1, size, scent);
  };

  // Update Cart Quantity
  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    const newCart = cart.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item));
    saveCart(newCart);
  };

  // Remove Item
  const handleRemoveItem = (itemId: string) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    saveCart(newCart);
  };

  // Add Custom Bundle to Cart
  const handleAddBundleToCart = (bundleItems: Product[]) => {
    // We create a special bundle cart item representing the "Summer Custom Bundle"
    const bundlePrice = bundleItems.reduce((acc, item) => acc + item.price, 0) * 0.85; // 15% off
    const bundleProduct: Product = {
      id: `summer-bundle-${Date.now()}`,
      name: 'Summer Custom Skincare Bundle',
      price: Math.round(bundlePrice),
      rating: 5.0,
      reviewsCount: 1,
      description: `Includes: ${bundleItems.map((bi) => bi.name).join(', ')} + FREE Pink Travel Bag`,
      category: ['SAVE WITH SETS'],
      badges: ['VALUE SET', 'NEW'],
      imageType: 'face-trio', // Uses facial trio visual representation
      imageColors: {
        primary: '#ffccd5',
        secondary: '#ff4e88',
        accent: '#c5e2ff',
      },
      details: 'Custom assembled kid/teen skincare travel set featuring multi-vitamin nourishment.',
      ingredients: ['Safe, botanically-derived, dermatologist-tested formulas.'],
      howToUse: 'Integrate into your child’s morning and evening refreshing wash routines.',
      sizes: ['Custom'],
      scents: ['Signature Mix'],
    };

    handleAddToCart(bundleProduct, 1, 'Custom Set', 'Signature');
    setCartOpen(true);
  };

  // Triggered when bottom widget claims a code
  const handleUnlockCode = (code: string) => {
    // Optional feedback, or we can prefill codes
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    saveCart([]); // clear cart on success
  };

  const filteredProducts = products.filter((p) => p.category.includes(currentCategory));

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-pink-100 selection:text-[#ff4e88] flex flex-col font-sans antialiased">
      {/* 1. Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={setCurrentCategory}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        products={products}
        onSelectProduct={setSelectedProduct}
      />

      {/* 2. Main content area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full">
        {/* Banner or category title description */}
        <div className="mb-8 border-b border-gray-100 pb-5">
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-widest text-gray-950 flex items-center gap-2">
            <span>{currentCategory}</span>
            <span className="text-xs bg-[#ff4e88] text-white font-black px-2 py-0.5 rounded-sm">
              Pediatrician Approved
            </span>
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold tracking-wide mt-1.5 uppercase">
            Clean, clinical skincare formulated specifically for babies, kids, and mothers. 
          </p>
        </div>

        {/* Products Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10" id="store-products-grid">
          {filteredProducts.map((prod, idx) => {
            const cardEl = (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={setSelectedProduct}
                onQuickAdd={handleQuickAdd}
              />
            );

            // In the screenshots, after the 3rd product (Kids Happy Face Trio) is slot #4,
            // which displays the "Build Your Summer Bundle" promo card banner.
            // Let's insert it exactly in the 4th position (index 3) for the Bestsellers/Kids categories!
            if (idx === 3 && (currentCategory === 'BESTSELLERS' || currentCategory === 'KIDS' || currentCategory === 'SAVE WITH SETS')) {
              return (
                <div key="promo-bundle-card" className="grid grid-cols-1 gap-10 lg:col-span-1">
                  {/* Promo Card Banner exactly as seen in the uploaded image */}
                  <div
                    onClick={() => setBundleOpen(true)}
                    className="relative aspect-[4/5] bg-[#c5e2ff] rounded-lg p-6 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
                    id="promo-card-bundle"
                  >
                    {/* Tiny twinkling star graphics overlay */}
                    <div className="absolute top-4 right-12 animate-pulse">
                      <Sparkles className="w-5 h-5 text-white opacity-80" />
                    </div>
                    <div className="absolute bottom-20 left-6 animate-pulse">
                      <Sparkles className="w-4 h-4 text-white opacity-70" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black text-[#1d3557] tracking-tight leading-none mt-2">
                        Build Your <br />
                        Summer Bundle
                      </h3>
                      <p className="text-xs font-black text-blue-800 tracking-wider">
                        15% OFF 4+ PRODUCTS
                      </p>
                    </div>

                    {/* Cute travel bags and skincare illustrations displayed in bottom area */}
                    <div className="relative h-28 flex items-center justify-center mt-4">
                      {/* Pink Pouch SVG drawing */}
                      <div className="w-24 h-24 bg-pink-100 rounded-2xl border border-pink-200 shadow-md flex items-center justify-center transform rotate-[-4deg] group-hover:rotate-0 transition-all duration-300 relative z-10">
                        {/* Smile face on bag */}
                        <div className="text-[9px] font-black text-[#ff4e88] tracking-widest uppercase">
                          evereden
                        </div>
                        {/* Little lotion tube poking out */}
                        <div className="absolute -top-3 right-2 w-7 h-10 bg-yellow-150 rounded-sm shadow-xs border border-yellow-200 transform rotate-[15deg]">
                          <div className="w-full h-1 bg-[#ff9f1c]" />
                        </div>
                      </div>

                      {/* Sparkles, mist bottle on the side */}
                      <div className="absolute -right-1 bottom-4 w-8 h-16 bg-white/95 rounded-md p-1 shadow-md border border-pink-100 transform rotate-[12deg] flex flex-col items-center justify-center">
                        <div className="w-3 h-3 bg-[#bde0fe] rounded-full" />
                        <div className="w-1.5 h-6 bg-pink-300 rounded-sm mt-1" />
                      </div>

                      <div className="absolute -left-2 bottom-2 w-8 h-12 bg-[#ffe5ec] rounded-md p-0.5 shadow-md border border-pink-200 transform rotate-[-15deg] flex items-center justify-center text-[7px] font-bold text-[#ff4e88]">
                        Deo
                      </div>
                    </div>

                    {/* Start Building Pink Pill Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBundleOpen(true);
                      }}
                      className="w-full bg-[#ff4e88] hover:bg-[#e03d73] text-white font-extrabold text-xs py-3 rounded-full transition-all tracking-wider uppercase shadow-md flex items-center justify-center space-x-1.5 z-20 group-hover:scale-103"
                      id="btn-promo-start-building"
                    >
                      <span>START BUILDING</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {cardEl}
                </div>
              );
            }

            return cardEl;
          })}
        </div>
      </main>

      {/* 3. Footer brand trust & newsletters */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-20" id="app-footer">
        {/* Brand trust highlights */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200/50 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs bg-pink-50 text-[#ff4e88] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest">
              Dermatologist Tested
            </span>
            <h4 className="font-extrabold text-sm text-gray-900 mt-1 uppercase">100% Non-Toxic formulas</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm">
              We screen every ingredient to ensure they are clean, highly active, and exceptionally safe for newborns and children's delicate skin.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs bg-blue-50 text-blue-600 font-black px-2.5 py-1 rounded-sm uppercase tracking-widest">
              Award Winning Skincare
            </span>
            <h4 className="font-extrabold text-sm text-gray-900 mt-1 uppercase">Pediatrician Approved</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm">
              Developed with leading pediatric dermatologists to deliver high-performance, biological barrier protection for active skin.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-600 font-black px-2.5 py-1 rounded-sm uppercase tracking-widest">
              Sustainably sourced
            </span>
            <h4 className="font-extrabold text-sm text-gray-900 mt-1 uppercase">Refills and recyclable kits</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm">
              Our packaging is made with recycled ocean plastics and plant-based sugars. We offer refill packs to reduce landfills waste.
            </p>
          </div>
        </div>

        {/* Newsletter subscription form */}
        <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
          <h3 className="text-base font-extrabold uppercase tracking-widest text-gray-900">
            Join the Evereden Family
          </h3>
          <p className="text-xs text-gray-500 font-bold max-w-md mx-auto leading-relaxed">
            Sign up to receive 15% off your first order, exclusive skincare guides, and sneak peeks at new product launches!
          </p>

          {!isNewsletterSubscribed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) setIsNewsletterSubscribed(true);
              }}
              className="flex max-w-md mx-auto gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#ff4e88]"
                id="newsletter-email-input"
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-[#ff4e88] text-white text-xs font-black px-6 rounded-full uppercase tracking-wider transition-colors"
                id="btn-newsletter-subscribe"
              >
                JOIN
              </button>
            </form>
          ) : (
            <div className="text-xs text-emerald-600 font-extrabold bg-emerald-50/50 border border-emerald-100 py-3 px-6 rounded-full max-w-md mx-auto flex items-center justify-center gap-1.5 animate-scale-in">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Awesome! Check your inbox for your 15% discount code: <strong>GETKEN</strong></span>
            </div>
          )}
        </div>

        {/* Legal footers */}
        <div className="bg-gray-100/50 py-5 text-center text-[10px] text-gray-400 font-bold border-t border-gray-200/50 uppercase tracking-wider">
          © {new Date().getFullYear()} Evereden Skincare Store Clone. Crafted for high-fidelity presentation.
        </div>
      </footer>

      {/* 4. Drawers & Modals */}
      
      {/* Bundle Builder Side Drawer */}
      <BundleBuilder
        isOpen={bundleOpen}
        onClose={() => setBundleOpen(false)}
        products={products}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutStep('shipping');
        }}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Sticky Bottom Discount Widget */}
      <BottomWidget onUnlockCode={handleUnlockCode} />

      {/* Mock Account Login Drawer */}
      {accountOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="account-drawer-container">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setAccountOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col h-full animate-slide-left p-6 justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-extrabold text-sm uppercase tracking-wider flex items-center gap-1.5 text-gray-900">
                  <User className="w-4 h-4 text-[#ff4e88]" />
                  Your Evereden Account
                </h3>
                <button
                  onClick={() => setAccountOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Details */}
              <div className="mt-8 space-y-6">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 bg-pink-100 text-[#ff4e88] rounded-full flex items-center justify-center text-lg font-black uppercase shadow-xs">
                    K
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Ken Nguyen</h4>
                    <p className="text-xs text-gray-500 font-bold">Kennguyen931908@gmail.com</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Verified account status
                  </h5>
                  <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl flex items-center space-x-2 text-emerald-700">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-black uppercase">GOLD VIP MEMBERSHIP</p>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">15% storewide discount unlocked automatically.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600">
                  <p className="font-black text-gray-400 text-[10px] uppercase tracking-widest">Saved shipping defaults</p>
                  <p className="font-bold text-gray-900 mt-1">{shippingAddress.name}</p>
                  <p className="font-medium text-gray-500">{shippingAddress.street}, {shippingAddress.city}</p>
                  <p className="font-medium text-gray-500">Phone: {shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAccountOpen(false)}
              className="w-full bg-gray-900 hover:bg-[#ff4e88] text-white font-extrabold text-xs py-3 rounded-full uppercase transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      )}

      {/* Shipping Address & Checkout Step Modal */}
      {checkoutStep === 'shipping' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" id="checkout-modal">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setCheckoutStep('idle')}
              className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full text-gray-500 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
              <h3 className="font-black text-sm uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
                Secure Shipping Checkout
              </h3>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.name}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-pink-300 font-semibold text-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-pink-300 font-semibold text-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-pink-300 font-semibold text-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-pink-300 font-semibold text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">City</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-pink-300 font-semibold text-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.zip}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-pink-300 font-semibold text-gray-800"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-[#ff4e88] hover:bg-[#e03d73] text-white font-extrabold tracking-widest text-xs py-3.5 rounded-full flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-98"
                id="btn-shipping-submit"
              >
                <span>PLACE SECURE ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Checkout Step Modal */}
      {checkoutStep === 'success' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" id="success-modal">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center space-y-5 shadow-2xl relative animate-scale-in">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-base uppercase text-gray-900">ORDER PLACED SUCCESSFULLY!</h3>
              <p className="text-xs text-gray-500 font-bold">
                Thank you for purchasing Evereden skincare, {shippingAddress.name}!
              </p>
              <p className="text-[11px] text-gray-400 font-semibold">
                We have sent an order receipt and real-time tracking updates directly to your email: <strong>{shippingAddress.email}</strong>.
              </p>
            </div>

            <div className="bg-pink-50/50 border border-pink-100/60 p-3 rounded-2xl text-[10px] text-gray-500 font-bold leading-normal">
              🎁 Special Promo code <strong>SUMMER15</strong> is unlocked for your next visit! Save it now.
            </div>

            <button
              onClick={() => setCheckoutStep('idle')}
              className="w-full bg-[#ff4e88] hover:bg-[#e03d73] text-white font-extrabold text-xs py-3.5 rounded-full uppercase tracking-wider transition-all"
              id="btn-success-close"
            >
              CONTINUE EXPLORING
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
