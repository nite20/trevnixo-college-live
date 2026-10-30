import React from 'react';
import {
  Trash2,
  Heart,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FREE_DELIVERY_THRESHOLD } from '../data/products';

export const CartPage: React.FC = () => {
  const {
    cartProducts,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    moveCartToWishlist,
    navigate,
    clearBuyNow,
  } = useStore();

  const diffForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartSubtotal);
  const freeDeliveryPercent = Math.min(
    100,
    Math.round((cartSubtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  const handleProceedToCheckout = () => {
    // Normal cart checkout: ensure buyNow state is cleared so checkout uses cart items
    clearBuyNow();
    navigate('checkout', { fromBuyNow: false });
  };

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display text-white">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-purple-300/60 max-w-sm mx-auto">
            Discover smart everyday finds, problem solvers, and home upgrades.
          </p>
        </div>
        <button
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer text-sm"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Shopping Cart
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/60 mt-1">
          Review your items before proceeding to secure checkout.
        </p>
      </div>

      {/* Free Delivery Incentive Bar */}
      <div className="p-4 rounded-2xl bg-[#141028] border border-purple-800/40 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2 text-white">
            <Truck className="w-4 h-4 text-fuchsia-400" />
            {diffForFreeDelivery === 0 ? (
              <span className="text-emerald-400">
                You have unlocked FREE Express Delivery!
              </span>
            ) : (
              <span>
                Add{' '}
                <span className="text-fuchsia-400 font-bold">
                  ₹{diffForFreeDelivery}
                </span>{' '}
                more for FREE delivery!
              </span>
            )}
          </span>
          <span className="text-purple-300/60 tabular-nums">
            ₹{cartSubtotal} / ₹{FREE_DELIVERY_THRESHOLD}
          </span>
        </div>
        <div className="w-full h-2 bg-[#20183b] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full transition-all duration-300"
            style={{ width: `${freeDeliveryPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartProducts.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#130f24] border border-purple-900/30 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
            >
              {/* Image & Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover bg-[#18132e] shrink-0 border border-purple-800/30"
                />
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase text-fuchsia-400">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => navigate('product', { id: product.id })}
                    className="text-sm font-bold text-white hover:text-fuchsia-300 cursor-pointer transition-colors line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-white tabular-nums">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-purple-400/50 line-through tabular-nums">
                      ₹{product.mrp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-purple-900/30">
                {/* Stepper */}
                <div className="flex items-center bg-[#18132e] border border-purple-800/40 rounded-xl p-1">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    className="p-1 text-purple-300 hover:text-white rounded hover:bg-purple-900/40 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                    className="p-1 text-purple-300 hover:text-white rounded hover:bg-purple-900/40 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for item */}
                <div className="text-right min-w-[70px]">
                  <span className="text-sm font-bold text-white tabular-nums">
                    ₹{product.price * quantity}
                  </span>
                </div>

                {/* Move to Wishlist / Remove */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => moveCartToWishlist(product.id)}
                    className="p-2 text-purple-400 hover:text-fuchsia-400 rounded-lg hover:bg-purple-900/30 cursor-pointer transition-colors"
                    title="Move to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-purple-400 hover:text-rose-400 rounded-lg hover:bg-purple-900/30 cursor-pointer transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-[#141028] border border-purple-800/40 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white border-b border-purple-900/30 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-purple-200/80">
                <span>Subtotal ({cartProducts.length} items)</span>
                <span className="font-semibold text-white tabular-nums">
                  ₹{cartSubtotal}
                </span>
              </div>

              <div className="flex justify-between text-purple-200/80">
                <span>Estimated Delivery</span>
                <span className="font-semibold tabular-nums">
                  {cartDeliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `₹${cartDeliveryFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-purple-400/60">
                <span>Taxes</span>
                <span>Included as applicable</span>
              </div>

              <div className="pt-3 border-t border-purple-900/40 flex justify-between items-baseline text-base font-bold text-white">
                <span>Grand Total</span>
                <span className="text-xl font-black text-fuchsia-300 tabular-nums">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_20px_rgba(217,70,239,0.35)] flex items-center justify-center gap-2 text-sm cursor-pointer transition-all active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center flex items-center justify-center gap-2 text-xs text-purple-300/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cash on Delivery supported across India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
