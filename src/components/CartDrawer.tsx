import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Gift, Check, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { ProductSvg } from './ProductSvg';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Apply coupon code if validated
  const appliedDiscount = rawSubtotal * discountPercent;
  const subtotal = rawSubtotal - appliedDiscount;
  
  // Progress to free gift/shipping
  const freeShippingThreshold = 50;
  const freeGiftThreshold = 75;
  const shippingCharge = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 5.99;
  const grandTotal = subtotal + shippingCharge;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'GETKEN' || code === 'GETKENS15' || code === 'KEN15') {
      setDiscountPercent(0.15);
      setPromoSuccess('15% Discount Applied!');
    } else if (code === 'SAVE10') {
      setDiscountPercent(0.1);
      setPromoSuccess('10% Discount Applied!');
    } else {
      setPromoError('Invalid promo code. Try "GETKEN" or "SAVE10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="cart-drawer-container">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col h-full animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-gray-900">
            <ShoppingBag className="w-5 h-5 text-[#ff4e88]" />
            <h2 className="text-base font-extrabold tracking-wider uppercase">Your Bag ({cartItems.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            id="btn-cart-close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Dynamic Shipping/Gift Progress Indicator */}
        <div className="px-5 py-3.5 bg-pink-50/30 border-b border-pink-100/50 flex flex-col gap-2">
          <div className="text-[11px] font-bold text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Gift className="w-3.5 h-3.5 text-[#ff4e88]" />
              {rawSubtotal >= freeGiftThreshold ? (
                <span className="text-emerald-600 font-extrabold">🎉 You unlocked a FREE Plush Kids Headband!</span>
              ) : (
                <span>Add <strong className="text-[#ff4e88]">${(freeGiftThreshold - rawSubtotal).toFixed(2)}</strong> more for a FREE Headband!</span>
              )}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff4e88] transition-all duration-300"
              style={{ width: `${Math.min((rawSubtotal / freeGiftThreshold) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Shopping Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-24 text-gray-400 flex flex-col items-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 stroke-[1.5] mb-4" />
              <p className="font-extrabold text-sm text-gray-700 uppercase tracking-wider">Your bag is empty</p>
              <p className="text-xs text-gray-400 mt-1.5 max-w-[200px] mx-auto">Fill it with gentle, dermatologist-tested formulas!</p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#ff4e88] text-white font-extrabold text-[10px] tracking-widest py-2.5 px-6 rounded-full uppercase hover:bg-pink-600 shadow-xs transition-colors"
                id="btn-cart-start-shopping"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            <div className="space-y-4" id="cart-items-list">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100"
                  id={`cart-item-${item.id}`}
                >
                  {/* Thumb image representation */}
                  <div className="w-16 h-18 bg-white rounded-lg flex items-center justify-center p-1 border border-gray-100 flex-shrink-0">
                    <ProductSvg type={item.product.imageType} className="w-full h-full" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-extrabold text-xs text-gray-900 leading-tight">
                      {item.product.name}
                    </h4>
                    
                    {/* Size and Scent metadata */}
                    {(item.selectedSize || item.selectedScent) && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.selectedSize && (
                          <span className="text-[9px] font-bold text-gray-500 bg-white border border-gray-150 px-1.5 py-0.2 rounded-sm uppercase">
                            {item.selectedSize.split(' ')[0]}
                          </span>
                        )}
                        {item.selectedScent && (
                          <span className="text-[9px] font-bold text-[#ff4e88] bg-pink-50/65 px-1.5 py-0.2 rounded-sm uppercase">
                            {item.selectedScent.split(' ')[0]}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50"
                          id={`btn-cart-qty-dec-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50"
                          id={`btn-cart-qty-inc-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="text-xs font-black text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Remove item"
                    id={`btn-cart-item-remove-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Free Headband visually added if unlocked */}
              {rawSubtotal >= freeGiftThreshold && (
                <div className="flex items-center space-x-4 p-3 bg-[#e8f5e9]/40 rounded-xl border border-dashed border-[#81c784] animate-pulse">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1 border border-green-100 flex-shrink-0 text-[#ff4e88]">
                    {/* Simple headband SVG icon representation */}
                    <svg viewBox="0 0 100 100" className="w-10 h-10">
                      <path d="M 20 60 A 30 30 0 1 1 80 60" fill="none" stroke="#ff4e88" strokeWidth="12" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-xs text-green-800">FREE Kids Plush Headband</h4>
                    <p className="text-[10px] text-green-600 font-bold uppercase mt-0.5">UNLOCKED GIFT!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Checkout Controls */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white space-y-4 shadow-lg">
            {/* Promo Code Apply */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. GETKEN)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3.5 py-1.5 text-xs border border-gray-200 rounded-lg outline-none font-bold placeholder-gray-400 text-gray-800 focus:border-pink-300 uppercase"
                id="cart-promo-input"
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-[#ff4e88] text-white text-[10px] font-black tracking-wider px-4 rounded-lg uppercase transition-colors"
                id="btn-cart-promo-apply"
              >
                APPLY
              </button>
            </form>
            
            {/* Promo Messages */}
            {promoSuccess && <p className="text-xs text-emerald-600 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> {promoSuccess}</p>}
            {promoError && <p className="text-xs text-red-500 font-bold">{promoError}</p>}

            {/* Calculations */}
            <div className="space-y-1.5 pt-1.5 border-t border-dashed border-gray-100">
              <div className="flex justify-between text-xs text-gray-500 font-bold">
                <span>Cart Subtotal</span>
                <span>${rawSubtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-extrabold">
                  <span>Applied Promo Discount</span>
                  <span>-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-gray-500 font-bold">
                <span>Shipping</span>
                <span>{shippingCharge === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingCharge}`}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-900 font-black pt-1.5 border-t border-gray-100">
                <span>Grand Total</span>
                <span className="text-[#ff4e88] text-base">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <button
              onClick={onCheckout}
              className="w-full bg-[#ff4e88] hover:bg-[#e03d73] text-white font-extrabold tracking-widest text-xs py-3.5 rounded-full flex items-center justify-center space-x-2 transition-all hover:shadow-md cursor-pointer active:scale-98"
              id="btn-cart-checkout"
            >
              <span>CHECKOUT SECURELY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-wide">
              Free shipping on orders over $50. All items are safe for mom & baby.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
