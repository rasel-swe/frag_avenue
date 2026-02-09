
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product, ProductSize } from '../types';
import { PRODUCTS } from '../data';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Plus, Minus, Star, ChevronLeft, Droplets, Sparkles, Wind, ArrowRight, Sun, Moon, Zap } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC<{ productId: string; onBack: () => void; onProductClick: (id: string) => void }> = ({ productId, onBack, onProductClick }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const product = PRODUCTS.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState<ProductSize>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'Essence' | 'Notes' | 'Reviews'>('Essence');
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      setOffsetY(scrollY * 0.05);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    
    // Calculate a "relevance score" based on category and shared notes
    const scored = PRODUCTS
      .filter(p => p.id !== productId)
      .map(p => {
        let score = 0;
        // Strong weight for same category (Men/Women/Unisex)
        if (p.category === product.category) score += 5;
        // Moderate weight for same brand
        if (p.brand === product.brand) score += 3;
        
        // Bonus for overlapping notes
        const commonNotes = p.notes.filter(note => product.notes.includes(note));
        score += commonNotes.length * 2;
        
        return { product: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6) // Showing top 6 related products
      .map(item => item.product);

    return scored;
  }, [productId, product]);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const sizes: ProductSize[] = ['10ml', '30ml', '50ml', '100ml'];

  return (
    <div className="pt-28 pb-24 w-full lg:w-[80%] mx-auto px-10 animate-fade-in">
      <button onClick={onBack} className="flex items-center space-x-3 text-[9px] font-bold uppercase tracking-editorial text-charcoal/30 hover:text-gold mb-12 transition-colors">
        <ChevronLeft className="w-4 h-4 stroke-[1]" />
        <span>Back to Boutique</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
        {/* Product Gallery */}
        <div className="space-y-10 lg:sticky lg:top-28">
          <div 
            ref={containerRef}
            className="aspect-[4/5] bg-white overflow-hidden group relative border border-gold/5 shadow-lg shadow-charcoal/5"
          >
            <img 
              src={product.image} 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-luxury group-hover:scale-105" 
              style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
              alt={product.name} 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="aspect-square bg-white border border-gold/10 cursor-pointer overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-700">
                <img src={product.image} className="w-full h-full object-cover grayscale" alt="Atelier Gallery" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
               <span className="text-[10px] font-bold text-gold uppercase tracking-editorial">{product.brand}</span>
               <div className="w-8 h-[1px] bg-gold/20"></div>
               <span className="text-[9px] text-charcoal/30 uppercase tracking-widest">{product.type}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif leading-none">{product.name}</h1>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex text-gold scale-90">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-20'}`} />
                ))}
              </div>
              <span className="text-[9px] text-charcoal/30 font-bold uppercase tracking-widest">Maison Selection</span>
            </div>
            <p className="text-2xl font-light text-charcoal/90 pt-2 italic font-serif">৳{product.price.toLocaleString()}</p>
          </div>

          <div className="space-y-10 border-y border-gold/10 py-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest-luxury text-charcoal/40">
                <span>Vial Size</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-3 text-[9px] tracking-widest uppercase border transition-all duration-700 ${
                      selectedSize === size 
                        ? 'bg-charcoal text-white border-charcoal' 
                        : 'border-gold/20 text-charcoal/40 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center border border-gold/20 px-6 py-4 space-x-8">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-charcoal/40 hover:text-gold"><Minus className="w-3 h-3" /></button>
                <span className="text-[11px] font-bold w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-charcoal/40 hover:text-gold"><Plus className="w-3 h-3" /></button>
              </div>
              <button 
                onClick={() => addToCart(product.id, selectedSize, quantity)}
                className="flex-1 bg-charcoal text-white py-4.5 text-[9px] font-bold uppercase tracking-editorial hover:bg-gold transition-all duration-700 shadow-xl flex items-center justify-center space-x-4"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>Add to Bag</span>
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-700 ${isWishlisted ? 'text-gold border-gold/40 bg-gold/5' : 'border-gold/20 text-charcoal/20 hover:border-gold'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Scent Attributes */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-4">
            <div className="space-y-2">
              <p className="text-[8px] uppercase tracking-widest text-charcoal/30 font-bold">Best For</p>
              <div className="flex items-center space-x-2">
                <Moon className="w-3.5 h-3.5 text-gold/60" />
                <span className="text-[9px] uppercase tracking-widest font-medium">Night / Gala</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[8px] uppercase tracking-widest text-charcoal/30 font-bold">Intensity</p>
              <div className="flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-gold/60" />
                <span className="text-[9px] uppercase tracking-widest font-medium">High / Bold</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[8px] uppercase tracking-widest text-charcoal/30 font-bold">Longevity</p>
              <div className="flex items-center space-x-2">
                <Droplets className="w-3.5 h-3.5 text-gold/60" />
                <span className="text-[9px] uppercase tracking-widest font-medium">10-12 Hours</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex space-x-10 border-b border-gold/5">
              {(['Essence', 'Notes', 'Reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[10px] font-bold uppercase tracking-editorial transition-all relative ${
                    activeTab === tab ? 'text-charcoal' : 'text-charcoal/20'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold animate-slide-right" />}
                </button>
              ))}
            </div>
            
            <div className="animate-fade-in text-sm leading-relaxed text-charcoal/50 tracking-wide font-light min-h-[150px]">
              {activeTab === 'Essence' && (
                <div className="space-y-6">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="flex items-center space-x-3 text-[9px] uppercase tracking-widest font-bold">
                       <Droplets className="w-4 h-4 text-gold/40" />
                       <span>Intense Sillage</span>
                    </div>
                    <div className="flex items-center space-x-3 text-[9px] uppercase tracking-widest font-bold">
                       <Sparkles className="w-4 h-4 text-gold/40" />
                       <span>Artisanal Decant</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'Notes' && (
                <div className="space-y-6">
                  <h5 className="text-[10px] font-bold uppercase tracking-editorial text-gold">The Olfactory Pyramid</h5>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note, i) => (
                      <span key={i} className="bg-ivory border border-gold/10 px-4 py-1.5 text-[9px] uppercase tracking-widest">{note}</span>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'Reviews' && (
                <div className="space-y-6">
                  <div className="space-y-3 border-b border-gold/5 pb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase tracking-widest">Elite Collector</span>
                      <div className="flex text-gold scale-75">
                        {Array(5).fill(0).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-[13px] leading-relaxed italic">"An olfactory masterpiece, perfectly handled by Frag Avenue concierge."</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className="pt-32 border-t border-gold/10">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <span className="text-gold text-[10px] font-bold uppercase tracking-editorial">Curated Discoveries</span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal">You May Also Like</h2>
          <div className="w-12 h-[1px] bg-gold/30 mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16">
          {relatedProducts.map(related => (
            <ProductCard 
              key={related.id} 
              product={related} 
              onClick={() => onProductClick(related.id)} 
            />
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <button 
            onClick={() => onBack()}
            className="group flex items-center space-x-6 text-[9px] font-bold uppercase tracking-widest-luxury text-charcoal/40 hover:text-gold transition-all duration-700"
          >
            <span className="border-b border-charcoal/10 pb-2 group-hover:border-gold">Explore the Full Boutique</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-700 group-hover:translate-x-3" />
          </button>
        </div>
      </section>
    </div>
  );
};
