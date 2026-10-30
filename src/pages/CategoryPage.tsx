import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowUpDown, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  CATEGORIES,
  getCategoryBySlug,
  normalizeCategorySlug,
  filterProducts,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SortOption } from '../types';

interface CategoryPageProps {
  slug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug }) => {
  const { navigate } = useStore();
  const normalizedSlug = normalizeCategorySlug(slug);
  const category = getCategoryBySlug(normalizedSlug) || CATEGORIES[0];
  const [activeSort, setActiveSort] = useState<SortOption>('featured');

  const products = useMemo(() => {
    return filterProducts({
      categorySlug: category.slug,
      sort: activeSort,
    });
  }, [category.slug, activeSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Category Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#191136] via-[#130f25] to-[#0d091e] border border-purple-800/40 p-6 sm:p-10 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-xl">
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            {category.name}
          </h1>

          <p className="text-xs sm:text-sm text-purple-200/80">
            {category.description}
          </p>
        </div>
      </div>

      {/* Sorting & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div className="text-xs text-purple-300/60 font-medium">
          Showing <span className="text-white font-bold tabular-nums">{products.length}</span> curated finds in {category.name}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-1.5 bg-[#151128] border border-purple-800/40 rounded-xl px-3 py-1.5 text-xs text-purple-200">
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

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3">
          <SlidersHorizontal className="w-8 h-8 mx-auto text-purple-500" />
          <h3 className="text-base font-bold text-white">No products found in this category</h3>
          <button
            onClick={() => navigate('shop')}
            className="text-xs text-fuchsia-400 hover:underline cursor-pointer"
          >
            Explore all other products
          </button>
        </div>
      )}
    </div>
  );
};
