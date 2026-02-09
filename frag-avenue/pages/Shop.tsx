
import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { ProductCard, ProductSkeleton } from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown, Check, Star, X } from 'lucide-react';

export const Shop: React.FC<{ onProductClick: (id: string) => void; initialCategory?: 'All' | 'Men' | 'Women' }> = ({ onProductClick, initialCategory = 'All' }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Men' | 'Women' | 'Unisex'>(initialCategory as any);
  const [sortBy, setSortBy] = useState<'Featured' | 'PriceLow' | 'PriceHigh'>('Featured');
  const [showBestSellersOnly, setShowBestSellersOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory as any);
  }, [initialCategory]);

  const minPossiblePrice = useMemo(() => Math.floor(Math.min(...PRODUCTS.map(p => p.price))), []);
  const maxPossiblePrice = useMemo(() => Math.ceil(Math.max(...PRODUCTS.map(p => p.price))), []);
  const [priceRange, setPriceRange] = useState({ min: minPossiblePrice, max: maxPossiblePrice });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [initialCategory]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSortBy('Featured');
    setSearchQuery('');
    setShowBestSellersOnly(false);
    setMinRating(0);
    setPriceRange({ min: minPossiblePrice, max: maxPossiblePrice });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (sortBy !== 'Featured') count++;
    if (showBestSellersOnly) count++;
    if (searchQuery !== '') count++;
    if (minRating > 0) count++;
    if (priceRange.min > minPossiblePrice || priceRange.max < maxPossiblePrice) count++;
    return count;
  }, [selectedCategory, sortBy, showBestSellersOnly, searchQuery, minRating, priceRange, minPossiblePrice, maxPossiblePrice]);

  const filteredProducts = useMemo(() => {
    let res = PRODUCTS.filter(p => 
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!showBestSellersOnly || p.isBestSeller) &&
      (p.price >= priceRange.min && p.price <= priceRange.max) &&
      (p.rating >= minRating)
    );
    if (sortBy === 'PriceLow') res.sort((a, b) => a.price - b.price);
    if (sortBy === 'PriceHigh') res.sort((a, b) => b.price - a.price);
    return res;
  }, [searchQuery, selectedCategory, sortBy, showBestSellersOnly, priceRange, minRating]);

  return (
    <div className="w-full lg:w-[80%] mx-auto px-10 pt-28 pb-20 space-y-12">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif">The Boutique</h1>
            <div className="flex items-center space-x-3">
               <span className="text-[10px] font-bold uppercase tracking-editorial text-gold">Curator of Essences</span>
               <div className="w-12 h-[1px] bg-gold/20"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
             <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/20 group-focus-within:text-gold transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent border-b border-charcoal/10 pl-7 pr-4 py-2 text-[9px] uppercase tracking-widest outline-none focus:border-gold transition-all w-full md:w-56 placeholder:text-charcoal/20"
                />
             </div>
             <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest pb-1 transition-all border-b ${isFilterOpen ? 'border-gold text-gold' : 'border-transparent text-charcoal/60 hover:text-charcoal'}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Refine</span>
                {activeFiltersCount > 0 && (
                  <span className="text-gold bg-gold/5 px-1.5 rounded-full text-[7px]">{activeFiltersCount}</span>
                )}
             </button>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-1000 ease-luxury ${isFilterOpen ? 'max-h-[50rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white p-12 grid grid-cols-1 md:grid-cols-4 gap-12 border border-gold/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.04)] mb-10 relative">
            <button onClick={() => setIsFilterOpen(false)} className="absolute top-6 right-6 text-charcoal/20 hover:text-gold transition-colors">
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <h4 className="text-[9px] font-bold uppercase tracking-editorial text-gold">Collection</h4>
              <div className="flex flex-col space-y-3">
                {['All', 'Men', 'Women', 'Unisex'].map((cat: any) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-[9px] uppercase tracking-widest-luxury transition-all ${selectedCategory === cat ? 'text-charcoal font-bold' : 'text-charcoal/30 hover:text-gold'}`}
                  >
                    {cat === 'All' ? 'All' : cat === 'Men' ? 'Him' : cat === 'Women' ? 'Her' : 'Unisex'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[9px] font-bold uppercase tracking-editorial text-gold">Sort By</h4>
              <div className="flex flex-col space-y-3">
                {[
                  { label: 'Recommended', val: 'Featured' },
                  { label: 'Price Low', val: 'PriceLow' },
                  { label: 'Price High', val: 'PriceHigh' }
                ].map((opt) => (
                  <button 
                    key={opt.val}
                    onClick={() => setSortBy(opt.val as any)}
                    className={`text-left text-[9px] uppercase tracking-widest-luxury transition-all ${sortBy === opt.val ? 'text-charcoal font-bold' : 'text-charcoal/30 hover:text-gold'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[9px] font-bold uppercase tracking-editorial text-gold">Budget</h4>
              <div className="space-y-4 pt-1">
                 <div className="flex justify-between text-[9px] font-bold tracking-widest text-charcoal/30">
                   <span>৳{priceRange.min}</span>
                   <span>৳{priceRange.max}</span>
                 </div>
                 <div className="relative h-[1.5px] bg-charcoal/5">
                    <div className="absolute h-full bg-gold" style={{ 
                      left: `${((priceRange.min - minPossiblePrice) / (maxPossiblePrice - minPossiblePrice)) * 100}%`,
                      right: `${100 - ((priceRange.max - minPossiblePrice) / (maxPossiblePrice - minPossiblePrice)) * 100}%` 
                    }} />
                    <input 
                      type="range" min={minPossiblePrice} max={maxPossiblePrice} value={priceRange.min} 
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Math.min(parseInt(e.target.value), prev.max - 10) }))}
                      className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                    />
                    <input 
                      type="range" min={minPossiblePrice} max={maxPossiblePrice} value={priceRange.max} 
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Math.max(parseInt(e.target.value), prev.min + 10) }))}
                      className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                    />
                 </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-[9px] font-bold uppercase tracking-editorial text-gold">Favorites</h4>
                <button 
                  onClick={() => setShowBestSellersOnly(!showBestSellersOnly)}
                  className={`flex items-center space-x-3 text-[9px] uppercase tracking-widest-luxury transition-all ${showBestSellersOnly ? 'text-gold' : 'text-charcoal/30'}`}
                >
                  <div className={`w-3 h-3 border border-current flex items-center justify-center`}>
                    {showBestSellersOnly && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span>Best Sellers</span>
                </button>
              </div>
              <button 
                onClick={clearAllFilters}
                className="text-[8px] font-bold uppercase tracking-[0.4em] text-red-400/30 hover:text-red-500 transition-colors pt-4 border-t border-charcoal/5"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 gap-y-16">
          {Array(12).fill(0).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 gap-y-16">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="flex justify-center pt-20">
          <button className="group relative px-20 py-6 border border-charcoal/5 text-[9px] font-bold uppercase tracking-editorial hover:border-gold transition-all duration-1000">
            <span className="relative z-10 text-charcoal/50 group-hover:text-gold">Load More</span>
            <div className="absolute inset-0 bg-gold/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-1000" />
          </button>
        </div>
      )}
    </div>
  );
};
