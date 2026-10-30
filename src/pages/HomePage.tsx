import React, { useState } from 'react';
import {
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { navigate, setSearchQuery } = useStore();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSearch.trim()) return;
    setSearchQuery(heroSearch);
    navigate('shop', { query: heroSearch });
  };

  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 8);
  const problemSolvers = PRODUCTS.filter((p) => p.isProblemSolver).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-purple-900/30">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-600/10 via-fuchsia-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Brand Statement & Discovery */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/70 border border-purple-700/40 text-purple-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Curated for Modern Indian Lifestyles</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
                  Smart Finds.{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-300 bg-clip-text text-transparent">
                    Everyday Life.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-purple-200/70 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                  Discover thoughtfully engineered gadgets, home essentials, and
                  everyday problem-solvers. No overwhelming clutter—just genuine daily utility.
                </p>
              </div>

              {/* Prominent Search Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="max-w-md mx-auto lg:mx-0 flex items-center relative"
              >
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Try 'desk lamp', 'blender', 'earbuds'..."
                  className="w-full bg-[#16122a] text-sm text-white placeholder-purple-300/40 pl-11 pr-24 py-3.5 rounded-2xl border border-purple-700/50 focus:outline-none focus:border-fuchsia-500 shadow-xl transition-all"
                />
                <Search className="w-4 h-4 text-purple-400 absolute left-4 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-semibold px-4 rounded-xl transition-transform active:scale-95 cursor-pointer shadow-md flex items-center gap-1"
                >
                  <span>Search</span>
                </button>
              </form>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigate('shop')}
                  className="bg-white hover:bg-purple-50 text-slate-900 text-sm font-bold px-6 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center gap-2 hover:gap-3 transition-all cursor-pointer"
                >
                  <span>Explore All Products</span>
                  <ArrowRight className="w-4 h-4 text-purple-700" />
                </button>

                <button
                  onClick={() => navigate('shop', { slug: 'electronics' })}
                  className="bg-[#18142d] hover:bg-purple-900/40 text-purple-200 text-sm font-semibold px-5 py-3.5 rounded-xl border border-purple-800/50 hover:border-purple-600 transition-colors cursor-pointer"
                >
                  Smart Gadgets
                </button>
              </div>

              {/* Micro Trust markers */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-purple-300/60 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verified Zero-Inventory Source
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-fuchsia-400" />
                  Cash on Delivery Available
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.2)] bg-[#140f28] group">
                <img
                  src="/src/assets/images/trevnixo_hero_lifestyle_1791015728933.jpg"
                  alt="TREVNIXO Modern Smart Living Room"
                  className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                
                {/* Floating highlight badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0e0a1e]/90 backdrop-blur-md border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-fuchsia-400">
                      Smart Ambient Tech
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Curated Everyday Efficiency
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('shop')}
                    className="p-2 rounded-xl bg-purple-600/50 text-white hover:bg-purple-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Featured Categories
            </h2>
            <p className="text-xs sm:text-sm text-purple-300/60 mt-1">
              Select a collection to filter smart essentials.
            </p>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="text-xs sm:text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 cursor-pointer"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('category', { slug: cat.slug })}
              className="group p-4 rounded-2xl bg-[#130f24] border border-purple-900/30 hover:border-fuchsia-500/50 hover:bg-[#1a1433] transition-all duration-200 text-left flex flex-col justify-between h-32 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="p-2 w-9 h-9 rounded-xl bg-purple-950/80 text-fuchsia-400 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors truncate">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-purple-300/50">
                  {cat.featuredProductCount} items
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Trending Smart Finds */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>COMMUNITY FAVORITES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Trending Products
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="text-xs sm:text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. Problem-Solving Essentials Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#181133] via-[#130f25] to-[#0c0919] border border-purple-800/40 p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-fuchsia-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="max-w-xl space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">
                PRACTICAL EVERYDAY UTILITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                Everyday Problem Solvers
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/70">
                Smart organizers, car accessories, cleaning hacks, and portable tools
                built to eliminate daily friction.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {problemSolvers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why TREVNIXO / Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            THE TREVNIXO STANDARD
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Why Shop With Us
          </h2>
          <p className="text-xs sm:text-sm text-purple-300/60">
            We operate with complete clarity: no fake discounts, no endless junk, just useful products tested for daily reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#130f24] border border-purple-900/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-fuchsia-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Curated Selection</h3>
            <p className="text-xs text-purple-300/70 leading-relaxed">
              We reject 90% of generic wholesale catalog items. Every piece in our store solves an actual need in your home, car, desk, or daily routine.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#130f24] border border-purple-900/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-fuchsia-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Genuine COD & Support</h3>
            <p className="text-xs text-purple-300/70 leading-relaxed">
              Order securely with Cash on Delivery anywhere in India. Reach human customer support easily without automated bots running you in circles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#130f24] border border-purple-900/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-fuchsia-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">No-Fuss Exchange</h3>
            <p className="text-xs text-purple-300/70 leading-relaxed">
              Received a damaged or defective item? Our team handles prompt replacements within 5 days of delivery with zero headache.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Promotional Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-fuchsia-950 to-purple-950 border border-purple-700/40 p-8 sm:p-12 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
            Smart Finds for Everyday Life.
          </h2>
          <p className="text-sm text-purple-200/80 max-w-lg mx-auto">
            Upgrade your daily routines with simple, functional gear delivered right to your doorstep.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('shop')}
              className="bg-white hover:bg-purple-100 text-slate-900 text-sm font-bold px-8 py-3.5 rounded-xl shadow-xl transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore The Store</span>
              <ArrowRight className="w-4 h-4 text-purple-700" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
