import React, { useState } from 'react';
import { X, Star, Heart, Check, Plus, Minus, MessageSquare, Sparkles } from 'lucide-react';
import { Product, Review } from '../types';
import { ProductSvg } from './ProductSvg';
import { mockReviews } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number, size: string, scent: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  // Option States
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedScent, setSelectedScent] = useState(product.scents[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'howToUse'>('details');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // New Review Form States
  const [reviewsList, setReviewsList] = useState<Review[]>(mockReviews[product.id] || [
    {
      id: 'rev-def-1',
      author: 'Amelia G.',
      rating: 5,
      date: '2026-07-15',
      title: 'Obsessed with the Evereden formulas!',
      comment: 'Extremely clean, gorgeous packaging, and the kids smile when applying it. Will definitely purchase again.',
      verified: true
    }
  ]);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleQtyDec = () => setQuantity((q) => Math.max(1, q - 1));
  const handleQtyInc = () => setQuantity((q) => q + 1);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      title: newTitle || 'Highly Recommended!',
      comment: newComment,
      verified: true,
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const hasDiscount = !!product.originalPrice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 md:p-6" id="product-modal">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col animate-scale-in">
        
        {/* Absolute Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-[#ff4e88] hover:text-white text-gray-600 p-2 rounded-full transition-all duration-300 shadow-sm"
          id="btn-modal-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 flex-1">
          {/* Left Column: Vector Interactive Render */}
          <div className="flex flex-col items-center justify-center bg-[#f7f7f7] rounded-2xl p-6 relative aspect-square md:aspect-auto">
            {/* Wishlist Heart */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-xs hover:text-red-500 transition-colors"
              id="btn-wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
            </button>

            {/* Svg representation */}
            <div className="w-full h-72 flex items-center justify-center">
              <ProductSvg
                type={product.imageType}
                primaryColor={product.imageColors.primary}
                secondaryColor={product.imageColors.secondary}
                accentColor={product.imageColors.accent}
              />
            </div>
            
            {/* Visual reassurance badge */}
            <div className="mt-4 flex items-center gap-1.5 bg-white/80 border border-pink-50 px-3 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4e88]" />
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
                Safe for sensitive skin
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic purchasing, titles & Collapsible details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Badges */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className={`text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded-sm uppercase ${
                      b.includes('BESTSELLER')
                        ? 'bg-[#ff4e88] text-white'
                        : 'bg-white border border-gray-200 text-gray-700'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Title & Price */}
              <h1 className="text-xl md:text-2xl font-black text-gray-950 leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3 mt-1.5">
                {hasDiscount ? (
                  <>
                    <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                    <span className="text-xl font-black text-[#ff4e88]">${product.price}</span>
                    <span className="bg-[#d8f3dc] text-[#1b4332] text-[10px] font-black px-2 py-0.5 rounded-sm">
                      Save {product.savePercentage}%
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-black text-gray-800">
                    {product.subTitle || `$${product.price}`}
                  </span>
                )}
              </div>

              {/* Reviews score */}
              <div className="flex items-center space-x-1.5 mt-2">
                <div className="flex text-black fill-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-900">{product.rating} / 5</span>
                <span className="text-xs text-gray-400 font-bold">({reviewsList.length} verified reviews)</span>
              </div>

              <p className="text-xs text-gray-600 mt-4 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Option: Sizes */}
              {product.sizes.length > 0 && product.sizes[0] !== 'Standard Duo' && product.sizes[0] !== 'Complete Trio Set' && (
                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Select Size: <strong className="text-gray-900">{selectedSize}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedSize === sz
                            ? 'border-gray-900 bg-gray-900 text-white shadow-xs'
                            : 'border-gray-200 hover:border-gray-900 text-gray-800'
                        }`}
                        id={`btn-size-select-${sz.replace(/[^a-zA-Z0-9]/g, '')}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Option: Scents */}
              {product.scents.length > 0 && product.scents[0] !== 'Signature Fresh' && product.scents[0] !== 'Standard Duo' && (
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Select Scent: <strong className="text-gray-900">{selectedScent}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.scents.map((sc) => (
                      <button
                        key={sc}
                        onClick={() => setSelectedScent(sc)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold border transition-all flex items-center gap-1.5 ${
                          selectedScent === sc
                            ? 'border-[#ff4e88] bg-pink-50/50 text-[#ff4e88]'
                            : 'border-gray-200 hover:border-[#ff4e88] text-gray-800'
                        }`}
                        id={`btn-scent-select-${sc.replace(/[^a-zA-Z0-9]/g, '')}`}
                      >
                        {selectedScent === sc && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        {sc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Control Row */}
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
              <div className="flex items-center space-x-4">
                {/* Qty Selector */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/40">
                  <button
                    onClick={handleQtyDec}
                    className="p-3 text-gray-500 hover:bg-gray-100 hover:text-[#ff4e88]"
                    aria-label="Decrease quantity"
                    id="btn-qty-dec"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-black text-gray-900 text-sm">{quantity}</span>
                  <button
                    onClick={handleQtyInc}
                    className="p-3 text-gray-500 hover:bg-gray-100 hover:text-[#ff4e88]"
                    aria-label="Increase quantity"
                    id="btn-qty-inc"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => onAddToCart(product, quantity, selectedSize, selectedScent)}
                  className="flex-1 bg-[#ff4e88] hover:bg-[#e03d73] text-white font-extrabold py-3.5 px-6 rounded-full text-xs tracking-widest uppercase transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2"
                  id="btn-modal-add-to-cart"
                >
                  <span>ADD TO BAG</span>
                  <span>•</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details, Collapsible Sections, & Reviews */}
        <div className="border-t border-gray-100 bg-[#fafafa] p-6 md:p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Collapsible Tabs Selector */}
            <div className="flex border-b border-gray-200" id="modal-tabs">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2 text-xs font-extrabold tracking-wider uppercase border-b-2 text-center transition-all ${
                  activeTab === 'details'
                    ? 'border-[#ff4e88] text-[#ff4e88]'
                    : 'border-transparent text-gray-500'
                }`}
                id="tab-details"
              >
                Formula details
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`flex-1 py-2 text-xs font-extrabold tracking-wider uppercase border-b-2 text-center transition-all ${
                  activeTab === 'ingredients'
                    ? 'border-[#ff4e88] text-[#ff4e88]'
                    : 'border-transparent text-gray-500'
                }`}
                id="tab-ingredients"
              >
                Key Ingredients
              </button>
              <button
                onClick={() => setActiveTab('howToUse')}
                className={`flex-1 py-2 text-xs font-extrabold tracking-wider uppercase border-b-2 text-center transition-all ${
                  activeTab === 'howToUse'
                    ? 'border-[#ff4e88] text-[#ff4e88]'
                    : 'border-transparent text-gray-500'
                }`}
                id="tab-howtouse"
              >
                How to apply
              </button>
            </div>

            {/* Tab content panel */}
            <div className="text-xs text-gray-600 leading-relaxed font-medium bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
              {activeTab === 'details' && (
                <p>{product.details}</p>
              )}
              {activeTab === 'ingredients' && (
                <ul className="list-disc pl-4 space-y-1.5">
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'howToUse' && (
                <p>{product.howToUse}</p>
              )}
            </div>

            {/* Verified Customer Reviews Section */}
            <div className="pt-6 border-t border-gray-200 space-y-5" id="modal-reviews-section">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#ff4e88]" />
                  Verified Reviews ({reviewsList.length})
                </h3>
                <span className="text-xs font-bold text-gray-400">100% hypoallergenic</span>
              </div>

              {/* Reviews grid feed */}
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-gray-800">{rev.author}</span>
                      <span className="text-[10px] text-gray-400 font-bold">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-black fill-black">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-black text-black' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] bg-green-50 text-green-700 font-black px-1.5 py-0.2 rounded-xs uppercase">
                        Verified Purchase
                      </span>
                    </div>
                    <h4 className="font-extrabold text-xs text-gray-900">{rev.title}</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Mock Review Form */}
              <form onSubmit={handleAddReview} className="bg-pink-50/20 border border-pink-100 p-4 rounded-2xl space-y-3">
                <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wide">Write a mock review</h4>
                
                {/* Stars select */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-gray-600">Your Rating:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewRating(s)}
                        className="p-0.5"
                      >
                        <Star className={`w-4 h-4 ${s <= newRating ? 'text-black fill-black' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g., Mom of 2)"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="bg-white border border-gray-200 text-xs p-2.5 rounded-lg outline-none focus:border-pink-300 font-medium text-gray-800"
                    id="review-author"
                  />
                  <input
                    type="text"
                    placeholder="Review Title (e.g., Absolutely gentle!)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-white border border-gray-200 text-xs p-2.5 rounded-lg outline-none focus:border-pink-300 font-medium text-gray-800"
                    id="review-title"
                  />
                </div>
                
                <textarea
                  required
                  rows={2}
                  placeholder="Tell us what you and your kids thought of this product..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-xs p-2.5 rounded-lg outline-none focus:border-pink-300 font-medium text-gray-800 resize-none"
                  id="review-comment"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-[#ff4e88] text-white text-[10px] font-black tracking-widest py-2 px-5 rounded-full uppercase transition-all shadow-xs"
                    id="btn-submit-review"
                  >
                    SUBMIT MOCK REVIEW
                  </button>
                  {reviewSuccess && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Published successfully!
                    </span>
                  )}
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
