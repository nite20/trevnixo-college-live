import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistPage: React.FC = () => {
  const {
    wishlistProducts,
    removeFromWishlist,
    moveWishlistToCart,
    navigate,
  } = useStore();

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-fuchsia-400 shadow-xl">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display text-white">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-purple-300/60 max-w-sm mx-auto">
            Save interesting items here to review later or transfer to your cart anytime.
          </p>
        </div>
        <button
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer text-sm"
        >
          <span>Explore Smart Finds</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          My Saved Finds ({wishlistProducts.length})
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/60 mt-1">
          Items you saved to review or move to your cart.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistProducts.map((product) => {
          const discountPercent = Math.round(
            ((product.mrp - product.price) / product.mrp) * 100
          );

          return (
            <div
              key={product.id}
              className="bg-[#130f24] rounded-2xl border border-purple-900/30 overflow-hidden flex flex-col justify-between hover:border-fuchsia-500/50 transition-all"
            >
              <div className="relative aspect-square bg-[#18132e]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-fuchsia-400">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => navigate('product', { id: product.id })}
                    className="text-xs sm:text-sm font-bold text-white hover:text-fuchsia-300 transition-colors line-clamp-1 cursor-pointer mt-0.5"
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm sm:text-base font-bold text-white tabular-nums">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-purple-400/50 line-through tabular-nums">
                      ₹{product.mrp}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400">
                      {discountPercent}% OFF
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-900/30">
                  <button
                    onClick={() => navigate('product', { id: product.id })}
                    className="p-2 bg-[#1b1532] hover:bg-purple-900/50 text-purple-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => moveWishlistToCart(product.id)}
                    className="p-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
