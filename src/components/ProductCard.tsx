import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [imgError, setImgError] = useState(false);
  const wishlisted = isInWishlist(product.id);

  // Calculate discount percentage
  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  return (
    <div className="group relative bg-[#130f24] rounded-2xl border border-purple-900/30 hover:border-fuchsia-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:-translate-y-1">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#18132d] overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          /* Zero-broken-image CSS fallback */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-950/60 to-purple-900/40 p-4 text-center">
            <Zap className="w-8 h-8 text-fuchsia-400 mb-2 opacity-60" />
            <span className="text-xs font-medium text-purple-200">
              {product.name}
            </span>
          </div>
        )}

        {/* Wishlist Button (Floating) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            wishlisted
              ? 'bg-fuchsia-600 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)]'
              : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/75'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Single subtle tag if trending or problem-solver */}
        {(product.isTrending || product.isProblemSolver) && (
          <div className="absolute top-3 left-3 bg-[#0d091e]/85 backdrop-blur-md border border-purple-500/30 text-fuchsia-300 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
            {product.isTrending ? 'Trending' : 'Smart Hack'}
          </div>
        )}

        {/* Hover Action Overlay (Quick View) */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4 pointer-events-none">
          <button
            onClick={() => navigate('product', { id: product.id })}
            className="pointer-events-auto bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-purple-600" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line without pills */}
          <div className="flex items-center justify-between text-xs text-purple-300/60 mb-1.5 font-medium">
            <span className="hover:text-purple-200 transition-colors">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-semibold tabular-nums text-white text-[11px]">
                {product.rating}
              </span>
              <span className="text-purple-300/40 text-[10px]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => navigate('product', { id: product.id })}
            className="text-sm font-semibold text-white group-hover:text-fuchsia-300 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-purple-200/60 line-clamp-1 mt-1 font-normal">
            {product.shortDesc}
          </p>
        </div>

        {/* Pricing and Cart Action */}
        <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white tabular-nums tracking-tight">
                ₹{product.price}
              </span>
              <span className="text-xs text-purple-400/50 line-through tabular-nums">
                ₹{product.mrp}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400">
              {discountPercent}% OFF
            </span>
          </div>

          <button
            onClick={() => addToCart(product.id, 1, true)}
            className="bg-purple-950 hover:bg-gradient-to-r hover:from-purple-600 hover:to-fuchsia-600 text-purple-200 hover:text-white p-2.5 rounded-xl border border-purple-700/50 hover:border-transparent transition-all duration-200 cursor-pointer shadow-sm group/btn"
            title="Add to Cart"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
