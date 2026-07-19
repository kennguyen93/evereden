import React, { useState } from 'react';
import { Gift, X, Check, Sparkles } from 'lucide-react';

interface BottomWidgetProps {
  onUnlockCode: (code: string) => void;
}

export const BottomWidget: React.FC<BottomWidgetProps> = ({ onUnlockCode }) => {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setClaimed(true);
    onUnlockCode('GETKEN');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 font-sans" id="discount-widget">
      {/* Floating circular bubble or pill based on state */}
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="bg-[#ff4e88] hover:bg-[#e03d73] text-white font-extrabold text-xs md:text-sm px-4.5 py-3 rounded-full flex items-center space-x-2 shadow-2xl transition-all duration-300 animate-bounce active:scale-95"
          id="btn-widget-expand"
        >
          <Gift className="w-4 h-4 text-white animate-pulse" />
          <span>Get ken's 15% discount</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-pink-100 shadow-2xl w-72 p-4 flex flex-col gap-3.5 relative animate-scale-in">
          {/* Close */}
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            id="btn-widget-close"
          >
            <X className="w-4 h-4" />
          </button>

          {!claimed ? (
            <form onSubmit={handleClaim} className="space-y-3">
              <div className="flex items-center gap-1.5 text-pink-600">
                <Sparkles className="w-4 h-4" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider">Unlock Ken's Discount!</h4>
              </div>
              <p className="text-[11px] text-gray-500 font-bold leading-normal">
                Join the Evereden family! Enter your email to claim 15% off your first skincare order.
              </p>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-pink-300 font-semibold text-gray-800"
                id="widget-email-input"
              />
              <button
                type="submit"
                className="w-full bg-[#ff4e88] hover:bg-[#e03d73] text-white font-black text-[10px] tracking-widest py-2.5 rounded-lg uppercase transition-colors shadow-sm"
                id="btn-widget-claim"
              >
                CLAIM 15% DISCOUNT
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-gray-900 uppercase">Discount Unlocked!</h4>
                <p className="text-[10px] text-gray-500 font-bold">Use the promo code below in your bag:</p>
              </div>
              <div className="bg-pink-50 border border-dashed border-pink-200 py-2.5 px-4 rounded-xl font-black text-sm text-[#ff4e88] tracking-widest select-all">
                GETKEN
              </div>
              <p className="text-[9px] text-emerald-600 font-extrabold uppercase">15% off coupon ready for checkout!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
