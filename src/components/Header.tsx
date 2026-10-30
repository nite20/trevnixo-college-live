import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const Header: React.FC = () => {
  const {
    route,
    navigate,
    cartCount,
    wishlistCount,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync search input
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('shop', { query: localSearch });
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const isCurrent = (view: string, slug?: string) => {
    if (view === 'category' && slug) {
      return route.view === 'category' && route.params?.slug === slug;
    }
    return route.view === view;
  };

  return (
    <>
      {/* Top Notification Trust Strip */}
      <div className="bg-gradient-to-r from-violet-950 via-purple-900 to-fuchsia-950 text-xs py-1.5 px-4 text-center text-purple-200/90 border-b border-purple-500/20 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
          <span>
            Free Express Shipping across India on orders ₹999+ · Cash on Delivery Available
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#0c0919]/90 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark (Zone 1) */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('home')}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
              aria-label="TREVNIXO Home"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-100 to-fuchsia-300 bg-clip-text text-transparent font-display group-hover:opacity-90 transition-opacity">
                TREVNIXO
              </span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef] animate-pulse" />
            </button>
          </div>

          {/* Desktop Navigation Links (Zone 2) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-purple-200/80">
            <button
              onClick={() => navigate('home')}
              className={`hover:text-white transition-colors cursor-pointer ${
                isCurrent('home') ? 'text-fuchsia-400 font-semibold' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate('shop')}
              className={`hover:text-white transition-colors cursor-pointer ${
                isCurrent('shop') ? 'text-fuchsia-400 font-semibold' : ''
              }`}
            >
              Shop All
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
                className={`flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer ${
                  route.view === 'category' ? 'text-fuchsia-400 font-semibold' : ''
                }`}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-purple-400 transition-transform duration-200" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-[#130f24] border border-purple-500/20 rounded-xl shadow-2xl py-2 z-50 divide-y divide-purple-900/20 backdrop-blur-xl">
                  <div className="grid grid-cols-2 p-2 gap-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          navigate('category', { slug: cat.slug });
                          setCategoriesDropdownOpen(false);
                        }}
                        className="text-left px-3 py-2 text-xs rounded-lg text-purple-200 hover:text-white hover:bg-purple-900/40 transition-colors cursor-pointer truncate"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('about')}
              className={`hover:text-white transition-colors cursor-pointer ${
                isCurrent('about') ? 'text-fuchsia-400 font-semibold' : ''
              }`}
            >
              About
            </button>

            <button
              onClick={() => navigate('contact')}
              className={`hover:text-white transition-colors cursor-pointer ${
                isCurrent('contact') ? 'text-fuchsia-400 font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Actions & Utilities (Zone 3) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center relative w-56 xl:w-72"
            >
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search smart finds..."
                className="w-full bg-[#18142c] text-sm text-white placeholder-purple-300/40 pl-9 pr-4 py-2 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500/80 transition-all"
              />
              <Search className="w-4 h-4 text-purple-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/30 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button with Live Count */}
            <button
              onClick={() => navigate('wishlist')}
              className="relative p-2 text-purple-300 hover:text-fuchsia-300 rounded-lg hover:bg-purple-900/30 transition-colors cursor-pointer"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(217,70,239,0.6)] tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Live Count */}
            <button
              onClick={() => navigate('cart')}
              className="relative flex items-center gap-2 bg-[#1b1532] hover:bg-purple-900/50 text-white px-3 sm:px-4 py-2 rounded-xl border border-purple-700/40 hover:border-fuchsia-500/60 transition-all cursor-pointer shadow-sm group"
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 text-fuchsia-400 group-hover:scale-105 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Cart</span>
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/30 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-purple-900/30 bg-[#0e0a1e]">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products, categories, tags..."
                className="w-full bg-[#18142c] text-sm text-white placeholder-purple-300/40 pl-10 pr-10 py-2.5 rounded-xl border border-purple-800/60 focus:outline-none focus:border-fuchsia-500"
              />
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-3 text-purple-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative ml-auto w-full max-w-xs bg-[#100d23] text-white h-full shadow-2xl border-l border-purple-800/40 flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-purple-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display tracking-tight bg-gradient-to-r from-white to-fuchsia-300 bg-clip-text text-transparent">
                  TREVNIXO
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-900/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 space-y-6">
              {/* Primary Links */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    navigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-900/30 hover:text-fuchsia-400 transition-colors flex items-center justify-between"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-purple-500" />
                </button>
                <button
                  onClick={() => {
                    navigate('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-900/30 hover:text-fuchsia-400 transition-colors flex items-center justify-between"
                >
                  <span>All Products</span>
                  <ArrowRight className="w-4 h-4 text-purple-500" />
                </button>
                <button
                  onClick={() => {
                    navigate('wishlist');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-900/30 hover:text-fuchsia-400 transition-colors flex items-center justify-between"
                >
                  <span>Wishlist ({wishlistCount})</span>
                  <Heart className="w-4 h-4 text-fuchsia-400" />
                </button>
                <button
                  onClick={() => {
                    navigate('cart');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-900/30 hover:text-fuchsia-400 transition-colors flex items-center justify-between"
                >
                  <span>My Cart ({cartCount})</span>
                  <ShoppingBag className="w-4 h-4 text-fuchsia-400" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-400/80 mb-2 px-3">
                  Shop Categories
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        navigate('category', { slug: c.slug });
                        setMobileMenuOpen(false);
                      }}
                      className="text-left px-3 py-2 text-xs rounded-lg text-purple-200/90 hover:text-white hover:bg-purple-900/40 transition-colors truncate"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Utility / Info Links */}
              <div className="pt-4 border-t border-purple-900/30 space-y-1">
                <button
                  onClick={() => {
                    navigate('about');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-purple-300 hover:text-white transition-colors"
                >
                  About TREVNIXO
                </button>
                <button
                  onClick={() => {
                    navigate('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-purple-300 hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
                <button
                  onClick={() => {
                    navigate('feedback');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-purple-300 hover:text-white transition-colors"
                >
                  Share Feedback
                </button>
                <button
                  onClick={() => {
                    navigate('shipping');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-purple-300 hover:text-white transition-colors"
                >
                  Shipping & COD Details
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-purple-900/40 bg-[#0b0818] text-xs text-purple-300/60 text-center">
              Smart Finds. Everyday Life.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
