import React, { useState } from 'react';
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProductById, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productId: number;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { navigate, addToCart, triggerBuyNow, toggleWishlist, isInWishlist } = useStore();
  const product = getProductById(productId) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [imgError, setImgError] = useState(false);
  const wishlisted = isInWishlist(product.id);

  // Discount calculation
  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  // Related products from same category or general list
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Breadcrumb / Back button */}
      <div>
        <button
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Products</span>
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery Stage */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-[#141028] border border-purple-800/40 overflow-hidden shadow-2xl flex items-center justify-center">
            {!imgError ? (
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Zap className="w-12 h-12 text-fuchsia-400 mb-2 opacity-50" />
                <span className="text-sm font-semibold text-white">
                  {product.name}
                </span>
              </div>
            )}

            {/* Wishlist Heart Overlay */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                wishlisted
                  ? 'bg-fuchsia-600 text-white shadow-lg'
                  : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
              }`}
              aria-label="Toggle Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails (Simulated Gallery) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveImage(product.image);
                setImgError(false);
              }}
              className="w-16 h-16 rounded-xl border-2 border-fuchsia-500 overflow-hidden bg-[#18132d] cursor-pointer"
            >
              <img
                src={product.image}
                alt="Main thumbnail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Right Column: Purchase & Details Module */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-400">
              <span>{product.category}</span>
              <span className="text-purple-600">·</span>
              <span className="text-emerald-400">In Stock</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              {product.name}
            </h1>

            {/* Ratings Bar */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-md text-amber-300">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold tabular-nums">{product.rating}</span>
              </div>
              <span className="text-purple-300/60">
                ({product.reviewCount} customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-[#141028] border border-purple-800/40 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white tabular-nums">
                ₹{product.price}
              </span>
              <span className="text-sm text-purple-400/50 line-through tabular-nums">
                ₹{product.mrp}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Save {discountPercent}%
              </span>
            </div>
            <p className="text-[11px] text-purple-300/60">
              Inclusive of all taxes · Free delivery on orders ₹999+
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
            {product.description}
          </p>

          {/* Key Product Highlights */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Product Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-200/80">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-fuchsia-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs if available */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="space-y-2 pt-2 border-t border-purple-900/30">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="bg-[#18132e] p-2 rounded-lg">
                    <span className="text-purple-400 block text-[10px] font-medium">
                      {key}
                    </span>
                    <span className="text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-4 border-t border-purple-900/30">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-purple-200">Quantity</span>
              <div className="flex items-center bg-[#151128] border border-purple-800/40 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/40 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/40 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs: Add to Cart and Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart(product.id, quantity, true)}
                className="w-full bg-[#1b1534] hover:bg-purple-900/60 text-white font-semibold py-3 px-4 rounded-xl border border-purple-700/50 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-fuchsia-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => triggerBuyNow(product.id, quantity)}
                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-3 px-4 rounded-xl shadow-[0_4px_20px_rgba(217,70,239,0.3)] flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-all active:scale-98"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now · ₹{product.price * quantity}</span>
              </button>
            </div>
          </div>

          {/* Delivery & Assurance Info */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-purple-900/30 text-center">
            <div className="p-3 rounded-xl bg-[#120e23] border border-purple-900/20">
              <Truck className="w-4 h-4 mx-auto text-fuchsia-400 mb-1" />
              <div className="text-[11px] font-semibold text-white">Fast Delivery</div>
              <div className="text-[10px] text-purple-300/60">2-4 days dispatch</div>
            </div>

            <div className="p-3 rounded-xl bg-[#120e23] border border-purple-900/20">
              <ShieldCheck className="w-4 h-4 mx-auto text-fuchsia-400 mb-1" />
              <div className="text-[11px] font-semibold text-white">COD Available</div>
              <div className="text-[10px] text-purple-300/60">Pay on delivery</div>
            </div>

            <div className="p-3 rounded-xl bg-[#120e23] border border-purple-900/20">
              <RotateCcw className="w-4 h-4 mx-auto text-fuchsia-400 mb-1" />
              <div className="text-[11px] font-semibold text-white">Easy Exchange</div>
              <div className="text-[10px] text-purple-300/60">5-day support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Feedback Section (Transparent Prototype Demo) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#130f24] border border-purple-900/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              Customer Feedback & Reviews
            </h3>
            <p className="text-xs text-purple-300/60 mt-0.5">
              Prototype Notice: Real customer review sync will connect directly to backend feedback API.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-purple-950/70 px-3 py-1.5 rounded-lg border border-purple-800/40 text-purple-200">
            <MessageCircle className="w-4 h-4 text-fuchsia-400" />
            <span>Rating: {product.rating} / 5.0 ({product.reviewCount} ratings)</span>
          </div>
        </div>

        {/* Demo Reviews Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#18132e] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Karan M. (Verified Buyer)</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs text-purple-200/70">
              &ldquo;Matches the product photos exactly. Delivery took 3 days to Bengaluru and cash on delivery was super smooth.&rdquo;
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#18132e] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Pooja S. (Verified Buyer)</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs text-purple-200/70">
              &ldquo;Great utility for the price. Build quality is surprisingly solid compared to generic marketplace knockoffs.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="space-y-6 pt-4">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
          You May Also Like
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {fallbackRelated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
