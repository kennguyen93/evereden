import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { ProductSvg } from './ProductSvg';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onQuickAdd }) => {
  const isBestseller = product.badges.includes('BESTSELLER');
  const isValueSet = product.badges.includes('VALUE SET');
  const isNew = product.badges.includes('NEW');
  const isRefillAvailable = product.badges.includes('REFILL AVAILABLE');

  // Star calculation
  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < floorRating
              ? 'text-black fill-black'
              : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="group flex flex-col cursor-pointer font-sans bg-white"
      onClick={() => onSelect(product)}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-[#f5f5f5] rounded-lg overflow-hidden flex items-center justify-center p-6 md:p-8 transition-transform duration-300 group-hover:scale-[1.01] shadow-xs group-hover:shadow-md">
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isBestseller && (
            <span
              className="bg-[#ff4e88] text-white text-[10px] font-bold tracking-wider px-2 py-1 uppercase rounded-xs"
              id={`badge-bestseller-${product.id}`}
            >
              BESTSELLER
            </span>
          )}
          {isValueSet && (
            <span
              className="bg-white text-gray-800 text-[10px] font-bold tracking-wider px-2 py-1 uppercase rounded-xs border border-gray-100 shadow-2xs"
              id={`badge-valueset-${product.id}`}
            >
              VALUE SET
            </span>
          )}
        </div>

        {/* Starburst NEW Badge top right */}
        {isNew && (
          <div
            className="absolute top-2 right-2 w-14 h-14 z-10 flex items-center justify-center animate-pulse"
            id={`badge-new-${product.id}`}
          >
            {/* Custom starburst shape */}
            <svg viewBox="0 0 100 100" className="absolute w-full h-full fill-[#ff80ab]">
              <path d="M 50 0 L 60 30 L 90 20 L 75 50 L 100 65 L 68 70 L 70 100 L 50 80 L 30 100 L 32 70 L 0 65 L 25 50 L 10 20 L 40 30 Z" />
            </svg>
            <span className="relative text-[9px] font-black text-white tracking-widest text-center uppercase">
              NEW
            </span>
          </div>
        )}

        {/* Refill Available Badge top right */}
        {isRefillAvailable && (
          <div className="absolute top-3 right-3 bg-white border border-pink-100 text-[#ff4e88] text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-xs uppercase">
            REFILL AVAILABLE
          </div>
        )}

        {/* Main Product Render (SVG) */}
        <div className="w-full h-full max-h-[85%] flex items-center justify-center transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
          <ProductSvg
            type={product.imageType}
            primaryColor={product.imageColors.primary}
            secondaryColor={product.imageColors.secondary}
            accentColor={product.imageColors.accent}
          />
        </div>

        {/* Hover Slide Up Quick Shop Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/20 via-transparent to-transparent hidden md:flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="w-full bg-white hover:bg-[#ff4e88] hover:text-white text-gray-900 font-bold py-2.5 px-4 rounded-full shadow-lg transition-all text-xs tracking-wider uppercase flex items-center justify-center space-x-2"
            id={`btn-quick-shop-${product.id}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>QUICK ADD TO BAG</span>
          </button>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="mt-3.5 flex flex-col flex-1" id={`info-${product.id}`}>
        {/* Title */}
        <h3 className="font-extrabold text-gray-900 text-sm md:text-base tracking-wide hover:text-[#ff4e88] transition-colors">
          {product.name}
        </h3>

        {/* Price & Discount */}
        <div className="flex items-center space-x-2 mt-1">
          {product.originalPrice ? (
            <>
              <span className="text-gray-400 line-through text-xs md:text-sm">
                ${product.originalPrice}
              </span>
              <span className="font-extrabold text-[#ff4e88] text-sm md:text-base">
                ${product.price}
              </span>
              {product.savePercentage && (
                <span className="bg-[#d8f3dc] text-[#1b4332] text-[10px] font-black px-1.5 py-0.5 rounded-sm">
                  Save {product.savePercentage}%
                </span>
              )}
            </>
          ) : (
            <span className="font-extrabold text-gray-800 text-sm md:text-base">
              {product.subTitle || `$${product.price}`}
            </span>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-1.5 mt-1.5">
          <div className="flex items-center space-x-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-[11px] font-bold text-gray-900">
            {product.rating}
          </span>
          <span className="text-[11px] text-gray-400 font-medium">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Secondary description matching evereden (e.g., ingredients or sets details) */}
        <p className="text-xs text-gray-500 font-semibold tracking-wide mt-2 leading-relaxed">
          {product.description}
        </p>

        {/* Mobile Quick Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          className="md:hidden w-full mt-3 bg-gray-900 hover:bg-[#ff4e88] active:scale-95 text-white text-[11px] font-extrabold py-2 px-3 rounded-md transition-all tracking-wider uppercase flex items-center justify-center space-x-1.5"
          id={`btn-mobile-quick-add-${product.id}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>QUICK ADD</span>
        </button>
      </div>
    </div>
  );
};
