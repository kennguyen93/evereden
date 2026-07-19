import React, { useState } from 'react';
import { Search, User, ShoppingBag, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Category, Product } from '../types';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (category: Category) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenAccount,
  products,
  onSelectProduct,
}) => {
  const [announcements, setAnnouncements] = useState([
    'FREE SAMPLE WITH EVERY ORDER',
    'BUILD YOUR SUMMER BUNDLE - GET 15% OFF 4+ PRODUCTS',
    'DERMATOLOGIST & PEDIATRICIAN TESTED formulas'
  ]);
  const [currentAnnIdx, setCurrentAnnIdx] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const nextAnnouncement = () => {
    setCurrentAnnIdx((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentAnnIdx((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const categories: Category[] = [
    'BESTSELLERS',
    'KIDS',
    'TEENS (AGES 11+)',
    'SUNCARE',
    'MOM & BABY',
    'SAVE WITH SETS',
    'GEN E',
  ];

  const filteredSearchProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm font-sans" id="app-header">
      {/* 1. Announcement Bar */}
      <div className="relative w-full bg-[#ff4e88] text-white py-2 text-xs md:text-sm font-bold tracking-wider flex items-center justify-between px-4 select-none">
        <button
          onClick={prevAnnouncement}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Previous announcement"
          id="btn-announcement-prev"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <div className="text-center animate-fade-in flex-1">
          {announcements[currentAnnIdx]}
        </div>
        <button
          onClick={nextAnnouncement}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Next announcement"
          id="btn-announcement-next"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div
          onClick={() => onSelectCategory('BESTSELLERS')}
          className="cursor-pointer select-none"
          id="brand-logo"
        >
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-black font-sans lowercase">
            evereden
          </span>
        </div>

        {/* Center: Category Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" id="main-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`text-xs font-bold tracking-wider uppercase transition-all pb-1 border-b-2 ${
                currentCategory === cat
                  ? 'border-[#ff4e88] text-[#ff4e88]'
                  : 'border-transparent text-gray-800 hover:text-[#ff4e88]'
              }`}
              id={`nav-item-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Right: Icons (Search, Account, Cart) */}
        <div className="flex items-center space-x-4 md:space-x-5 text-gray-700">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 hover:text-[#ff4e88] hover:bg-pink-50 rounded-full transition-all"
            aria-label="Search"
            id="btn-search-open"
          >
            <Search className="w-5.5 h-5.5 stroke-[2.25]" />
          </button>

          {/* Account Profile Button */}
          <button
            onClick={onOpenAccount}
            className="p-1.5 hover:text-[#ff4e88] hover:bg-pink-50 rounded-full transition-all"
            aria-label="Account profile"
            id="btn-account-open"
          >
            <User className="w-5.5 h-5.5 stroke-[2.25]" />
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-1.5 hover:text-[#ff4e88] hover:bg-pink-50 rounded-full transition-all flex items-center"
            aria-label="Shopping bag"
            id="btn-cart-open"
          >
            <ShoppingBag className="w-5.5 h-5.5 stroke-[2.25]" />
            {cartCount > 0 && (
              <span
                className="absolute top-0 right-0 bg-[#ff4e88] text-white text-[10px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-white animate-scale-in"
                id="cart-badge-count"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Mobile Category Links Scroll Bar */}
      <div className="lg:hidden flex items-center space-x-4 overflow-x-auto px-4 py-2 border-t border-gray-100 scrollbar-none bg-white">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap text-[11px] font-bold tracking-wider uppercase px-2 py-1 rounded transition-all ${
              currentCategory === cat
                ? 'bg-pink-50 text-[#ff4e88]'
                : 'text-gray-700 hover:text-[#ff4e88]'
            }`}
            id={`mob-nav-item-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-center p-4 pt-16 md:pt-24" id="search-modal">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-slide-down">
            {/* Search Input Bar */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <Search className="w-5.5 h-5.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Evereden products..."
                  className="w-full text-base text-gray-800 placeholder-gray-400 outline-none font-medium"
                  autoFocus
                  id="search-input"
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                id="btn-search-close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-4">
              {searchQuery === '' ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="font-semibold text-sm">Looking for baby or kids skincare?</p>
                  <p className="text-xs text-gray-400 mt-1">Type to search for "Cloud Body Wash", "Face Trio", "Shampoo", etc.</p>
                </div>
              ) : filteredSearchProducts.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
                    Products ({filteredSearchProducts.length})
                  </p>
                  {filteredSearchProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center space-x-4 p-2 hover:bg-pink-50/50 rounded-xl cursor-pointer transition-all border border-transparent hover:border-pink-100"
                      id={`search-result-item-${p.id}`}
                    >
                      <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100 p-1">
                        {/* Tiny SVG */}
                        <div className="w-10 h-10">
                          <img
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(
                              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="100%" height="100%">
                                <circle cx="100" cy="120" r="110" fill="${p.imageColors.primary}"/>
                              </svg>`
                            )}`}
                            className="w-full h-full object-contain"
                            alt={p.name}
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{p.name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{p.description}</p>
                        <p className="text-xs font-bold text-[#ff4e88] mt-1">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="font-semibold text-sm">No products found for "{searchQuery}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try spelling check or use simpler keywords.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
