import React, { useState } from 'react';
import { X, Sparkles, Plus, Check, ShoppingBag, Gift } from 'lucide-react';
import { Product } from '../types';
import { ProductSvg } from './ProductSvg';

interface BundleBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddBundleToCart: (bundleItems: Product[]) => void;
}

export const BundleBuilder: React.FC<BundleBuilderProps> = ({
  isOpen,
  onClose,
  products,
  onAddBundleToCart
}) => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const targetCount = 4;

  if (!isOpen) return null;

  // Only let users bundle individual kids/teens/suncare products (exclude pre-made sets to avoid bundle loops)
  const bundleableProducts = products.filter(
    (p) => !p.badges.includes('VALUE SET') && p.id !== 'kids-happy-face-trio'
  );

  const handleToggleProduct = (product: Product) => {
    const isAlreadySelected = selectedItems.some((item) => item.id === product.id);
    if (isAlreadySelected) {
      setSelectedItems((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      setSelectedItems((prev) => [...prev, product]);
    }
  };

  const isSelected = (productId: string) => {
    return selectedItems.some((item) => item.id === productId);
  };

  // Calculations
  const rawTotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const discountUnlocked = selectedItems.length >= targetCount;
  const discountAmount = discountUnlocked ? rawTotal * 0.15 : 0;
  const bundlePrice = rawTotal - discountAmount;
  const progressPercent = Math.min((selectedItems.length / targetCount) * 100, 100);

  const handleAddBundle = () => {
    if (selectedItems.length === 0) return;
    onAddBundleToCart(selectedItems);
    setSelectedItems([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="bundle-builder-container">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl flex flex-col h-full animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-pink-50/50">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#ff4e88]" />
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">
                Build Your Summer Bundle
              </h2>
              <p className="text-xs text-gray-500 font-bold">15% OFF 4+ PRODUCTS + FREE TRAVEL BAG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            id="btn-bundle-close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="p-4 bg-blue-50/40 border-b border-blue-50/80 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-blue-500" />
              {discountUnlocked ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  🎉 Special Bundle discount unlocked!
                </span>
              ) : (
                <span>Add {targetCount - selectedItems.length} more products to unlock 15% OFF</span>
              )}
            </span>
            <span>{selectedItems.length} / {targetCount} Products</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                discountUnlocked ? 'bg-emerald-500' : 'bg-[#ff4e88]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Split Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel: Selected visual bag pouch preview */}
          <div className="w-full md:w-5/12 bg-linear-to-b from-blue-50/30 to-pink-50/20 p-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Your Bundle Bag
            </h3>
            
            {/* Pink Pouch Representation */}
            <div className="relative w-44 h-44 flex items-center justify-center bg-pink-100/50 border border-pink-200 rounded-3xl shadow-inner p-4 animate-scale-in">
              {/* Added items visual overflow */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-4 flex -space-x-4 items-end justify-center">
                {selectedItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="w-12 h-16 bg-white/95 rounded-lg p-1 shadow-md border border-pink-100 transform rotate-[-6deg] hover:rotate-0 transition-transform origin-bottom"
                    style={{
                      transform: `rotate(${(idx - (selectedItems.length - 1) / 2) * 12}deg) translateY(-${idx % 2 === 0 ? 8 : 4}px)`
                    }}
                  >
                    <ProductSvg type={item.imageType} className="w-full h-full" />
                  </div>
                ))}
              </div>

              {/* Zipper details on the pouch */}
              <div className="absolute top-0 inset-x-8 h-1.5 bg-[#ff4e88] rounded-full flex items-center justify-end">
                <div className="w-4 h-3 bg-yellow-400 rounded-sm shadow-xs border border-yellow-500" />
              </div>

              <div className="text-center mt-12">
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-pink-400 font-bold px-4">
                    Bag is empty. Pick skincare items on the right!
                  </p>
                ) : (
                  <div>
                    <p className="text-xs font-black text-[#ff4e88] tracking-widest uppercase">
                      Evereden
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold mt-1">
                      {selectedItems.length} Products
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Price Calculations */}
            {selectedItems.length > 0 && (
              <div className="mt-6 w-full text-center space-y-1">
                <div className="flex justify-between text-xs text-gray-500 font-bold px-2">
                  <span>Regular Subtotal:</span>
                  <span className="line-through">${rawTotal.toFixed(2)}</span>
                </div>
                {discountUnlocked && (
                  <div className="flex justify-between text-xs text-emerald-600 font-extrabold px-2">
                    <span>15% Bundle Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-900 font-black px-2 pt-2 border-t border-dashed border-gray-200">
                  <span>Bundle Price:</span>
                  <span className="text-[#ff4e88]">${bundlePrice.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Products Picker Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Choose Skincare Items
            </h3>
            
            <div className="grid grid-cols-2 gap-3" id="bundle-products-grid">
              {bundleableProducts.map((p) => {
                const selected = isSelected(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleToggleProduct(p)}
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center text-center transition-all relative ${
                      selected
                        ? 'border-[#ff4e88] bg-pink-50/20 shadow-xs'
                        : 'border-gray-100 hover:border-pink-200 hover:bg-gray-50/50'
                    }`}
                    id={`bundle-picker-item-${p.id}`}
                  >
                    {/* Tick overlay if selected */}
                    {selected && (
                      <span className="absolute top-2 right-2 bg-[#ff4e88] text-white p-0.5 rounded-full z-10 animate-scale-in">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}

                    {/* Bottle thumbnail */}
                    <div className="w-20 h-24 flex items-center justify-center p-1 bg-[#fbfbfb] rounded-lg">
                      <ProductSvg type={p.imageType} className="w-full h-full" />
                    </div>

                    <h4 className="font-extrabold text-xs text-gray-900 mt-2 line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="text-xs font-black text-[#ff4e88] mt-0.5">${p.price}</p>
                    
                    <button
                      type="button"
                      className={`w-full mt-2.5 py-1 px-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center space-x-1 ${
                        selected
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 hover:bg-[#ff4e88] hover:text-white text-gray-700'
                      }`}
                      id={`btn-bundle-select-${p.id}`}
                    >
                      {selected ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>ADD ITEM</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 bg-white shadow-lg flex flex-col gap-2.5">
          <button
            onClick={handleAddBundle}
            disabled={selectedItems.length === 0}
            className={`w-full font-extrabold tracking-widest text-xs uppercase py-3.5 rounded-full flex items-center justify-center space-x-2 transition-all shadow-md ${
              selectedItems.length > 0
                ? 'bg-[#ff4e88] text-white hover:bg-[#e03d73] active:scale-98 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            id="btn-bundle-add-to-bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {selectedItems.length === 0
                ? 'Select Products to Start'
                : `ADD BUNDLE TO BAG ($${bundlePrice.toFixed(2)})`}
            </span>
          </button>
          <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-wide">
            Bundle contains a free premium canvas travel cosmetic bag.
          </p>
        </div>
      </div>
    </div>
  );
};
