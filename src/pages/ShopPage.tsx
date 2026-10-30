import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, filterProducts, normalizeCategorySlug } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SortOption } from '../types';

export const ShopPage: React.FC = () => {
  const { route, navigate, searchQuery, setSearchQuery } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return route.params?.slug ? normalizeCategorySlug(route.params.slug) : 'all';
  });

  const [searchInput, setSearchInput] = useState(
    route.params?.query || searchQuery || ''
  );
  const [activeSort, setActiveSort] = useState<SortOption>('featured');

  // Keep internal category aligned if route params change
  useEffect(() => {
    if (route.params?.slug) {
      setSelectedCategory(normalizeCategorySlug(route.params.slug));
    }
  }, [route.params?.slug]);

  // Keep search input aligned if route query changes
  useEffect(() => {
    if (route.params?.query !== undefined) {
      setSearchInput(route.params.query);
      setSearchQuery(route.params.query);
    }
  }, [route.params?.query, setSearchQuery]);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    setSearchQuery(val);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchInput('');
    setSearchQuery('');
    setActiveSort('featured');
    navigate('shop');
  };

  const filteredProducts = useMemo(() => {
    return filterProducts({
      categorySlug: selectedCategory === 'all' ? undefined : selectedCategory,
      search: searchInput,
      sort: activeSort,
    });
  }, [selectedCategory, searchInput, activeSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header and Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {selectedCategory === 'all'
                ? 'All Products'
                : CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                  'Category Products'}
            </h1>
            <p className="text-xs sm:text-sm text-purple-300/60 mt-1">
              Showing{' '}
              <span className="font-semibold text-white tabular-nums">
                {filteredProducts.length}
              </span>{' '}
              useful smart finds.
            </p>
          </div>

          {/* Search Field & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products or tags..."
                className="w-full bg-[#151128] text-xs sm:text-sm text-white placeholder-purple-300/40 pl-9 pr-8 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
              />
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3 pointer-events-none" />
              {searchInput && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-2.5 top-2.5 text-purple-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-1.5 bg-[#151128] border border-purple-800/40 rounded-xl px-3 py-2 text-xs text-purple-200">
                <ArrowUpDown className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                <select
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value as SortOption)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="featured" className="bg-[#151128] text-white">
                    Featured
                  </option>
                  <option value="price-asc" className="bg-[#151128] text-white">
                    Price: Low to High
                  </option>
                  <option value="price-desc" className="bg-[#151128] text-white">
                    Price: High to Low
                  </option>
                  <option value="newest" className="bg-[#151128] text-white">
                    Newest First
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Horizontal Selector (Interactive Segmented Bar) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-y border-purple-900/30">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'bg-[#151128] text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            All Items
          </button>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-fuchsia-600 text-white shadow-sm'
                    : 'bg-[#151128] text-purple-300 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-xs text-purple-300/70">
              We couldn&apos;t find any items matching &ldquo;
              <span className="text-white font-medium">{searchInput}</span>&rdquo; in this category.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-purple-700/50 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
