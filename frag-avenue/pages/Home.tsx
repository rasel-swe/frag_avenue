
import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ChevronLeft, ChevronRight, Award, ShoppingBag, Plus, Quote, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

const BestSellerCard: React.FC<{ product: any; onClick: () => void }> = ({ product, onClick }) => {
  const { addToCart } = useStore();
  
  return (
    <div 
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-charcoal/5"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[4s] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/10 via-transparent to-transparent opacity-20" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id, '50ml');
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-charcoal text-white py-3.5 text-[9px] font-bold uppercase tracking-widest-luxury opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-luxury hover:bg-gold flex items-center justify-center space-x-3"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Purchase</span>
        </button>
      </div>

      <div className="p-8 space-y-4 text-center">
        <div className="space-y-1">
          <p className="text-[8px] font-bold uppercase tracking-editorial text-gold">{product.brand}</p>
          <h3 className="font-serif text-charcoal text-lg tracking-wide truncate px-2">{product.name}</h3>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="text-[8px] uppercase tracking-widest text-charcoal/20 font-bold">{product.category}</span>
          <span className="w-1 h-1 bg-gold/30 rounded-full" />
          <span className="text-xs font-bold text-gold tracking-widest">৳{product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const LuxurySlider: React.FC<{ 
  products: any[]; 
  onProductClick: (id: string) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}> = ({ products, onProductClick, scrollRef }) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayProducts = [...products, ...products];

  return (
    <div className="relative group/slider-wrapper overflow-hidden pb-12">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes luxury-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-luxury-drift {
          animation: luxury-drift 80s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="md:hidden absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-4">
        <button 
          onClick={() => scrollRef.current?.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' })}
          className="pointer-events-auto w-10 h-10 bg-white/80 backdrop-blur-md rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1]" />
        </button>
        <button 
          onClick={() => scrollRef.current?.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' })}
          className="pointer-events-auto w-10 h-10 bg-white/80 backdrop-blur-md rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal"
        >
          <ChevronRight className="w-5 h-5 stroke-[1]" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing py-6 scroll-smooth"
      >
        <div 
          className={`flex shrink-0 ${!isHovered ? 'animate-luxury-drift' : ''}`}
          style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
        >
          {displayProducts.map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`} 
              className="w-[calc(70vw)] sm:w-[calc(45vw)] md:w-[calc(30vw)] lg:w-[calc(24vw)] xl:w-[calc(18vw)] px-4 md:px-6 flex-shrink-0"
            >
              <BestSellerCard product={product} onClick={() => onProductClick(product.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC<{ onProductClick: (id: string) => void; onNavigate: (page: string) => void }> = ({ onProductClick, onNavigate }) => {
  const [currentHero, setCurrentHero] = useState(0);
  const bestSellerScrollRef = useRef<HTMLDivElement>(null);
  
  const heroImages = [
    {
      img: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=1920',
      title: 'Soul of the Atelier',
      tagline: 'An Olfactory Odyssey',
      description: 'Handcrafted notes from the heart of Grasse.'
    },
    {
      img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1920',
      title: 'Prestige Selection',
      tagline: 'Curated Niche Fragrances',
      description: 'Exceptional scents for the modern connoisseur.'
    },
    {
      img: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1920',
      title: 'Eternal Sillage',
      tagline: 'Crafted with Rare Essences',
      description: 'The invisible architecture of your presence.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentHero(prev => (prev + 1) % heroImages.length), 8000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);
  const newArrivals = PRODUCTS.filter(p => p.isNew);

  return (
    <div className="space-y-24 pb-16 overflow-x-hidden bg-ivory">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen overflow-hidden bg-charcoal">
        {heroImages.map((hero, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-[2.5s] ease-in-out ${currentHero === idx ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-110 pointer-events-none'}`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
            
            <img 
              src={hero.img} 
              className={`w-full h-full object-cover transition-transform duration-[15s] ease-linear ${currentHero === idx ? 'scale-110' : 'scale-100'}`} 
              alt={hero.title} 
            />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <div className="max-w-4xl space-y-12 animate-fade-in">
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.8em] text-gold animate-slide-up [animation-delay:400ms]">
                    {hero.tagline}
                  </span>
                  <div className="w-12 h-[1px] bg-gold/50 animate-slide-up [animation-delay:500ms]" />
                </div>

                <div className="space-y-6">
                  <h1 className="text-5xl md:text-[8rem] font-serif leading-none text-white transition-all duration-1000 animate-slide-up [animation-delay:600ms] text-shadow-luxury">
                    {hero.title}
                  </h1>
                  <p className="text-[10px] md:text-[13px] font-serif italic uppercase tracking-[0.5em] text-white/60 animate-slide-up [animation-delay:800ms]">
                    — {hero.description} —
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-8 pt-8 animate-slide-up [animation-delay:1000ms]">
                  <button 
                    onClick={() => onNavigate('shop')}
                    className="group relative bg-white/90 backdrop-blur-md text-charcoal px-14 py-5 text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-700 hover:bg-gold hover:text-white shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10">Boutique</span>
                    <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </button>
                  <button 
                    onClick={() => onNavigate('about')}
                    className="group border border-white/30 backdrop-blur-sm text-white px-14 py-5 text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-700 hover:border-white hover:bg-white/10"
                  >
                    Our Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-6">
          {heroImages.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentHero(i)}
              className="group relative py-4"
            >
              <div className={`h-[2px] transition-all duration-1000 ${currentHero === i ? 'w-16 bg-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]' : 'w-8 bg-white/20 group-hover:bg-white/40'}`} />
              <span className={`absolute -top-4 left-0 text-[8px] font-bold text-gold transition-opacity duration-700 ${currentHero === i ? 'opacity-100' : 'opacity-0'}`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="relative overflow-hidden bg-ivory py-16">
        <div className="w-full lg:w-[80%] mx-auto px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="space-y-4 text-center md:text-left mx-auto md:mx-0">
              <div className="flex items-center justify-center md:justify-start space-x-3 text-gold/80">
                <Award className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-editorial">Best Sellers</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-charcoal leading-none">Incomparables</h2>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={() => bestSellerScrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal/30 hover:text-gold hover:border-gold hover:scale-105 transition-all duration-700"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[1]" />
                </button>
                <button 
                  onClick={() => bestSellerScrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal/30 hover:text-gold hover:border-gold hover:scale-105 transition-all duration-700"
                >
                  <ChevronRight className="w-5 h-5 stroke-[1]" />
                </button>
              </div>
              
              <button 
                onClick={() => onNavigate('shop')} 
                className="group flex items-center space-x-3 text-[8px] font-bold uppercase tracking-[0.4em] text-charcoal/40 hover:text-gold transition-colors duration-500"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          <LuxurySlider products={bestSellers} onProductClick={onProductClick} scrollRef={bestSellerScrollRef} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full lg:w-[80%] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-ivory group border border-charcoal/5">
            <img 
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale transition-all duration-[3s] group-hover:grayscale-0 group-hover:scale-110" 
              alt="Artisanat"
              loading="lazy"
            />
            <div className="absolute inset-0 border-[15px] border-ivory/10 m-8 group-hover:m-4 transition-all duration-1000" />
          </div>
          <div className="space-y-10">
            <div className="space-y-3">
              <span className="text-gold text-[9px] font-bold uppercase tracking-editorial">The Vision</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-[1.1]">Invisible<br/>Architecture</h2>
            </div>
            <p className="text-charcoal/50 text-xs leading-[1.7] max-w-md tracking-wide">
              Every sillage is a structure of memory. We sculpt the air with rare essences to create an emotion that transcends time.
            </p>
            <div className="pt-4">
               <button 
                onClick={() => onNavigate('about')}
                className="group flex items-center space-x-4 text-[9px] font-bold uppercase tracking-widest-luxury text-charcoal"
              >
                <span className="border-b border-charcoal/10 pb-1.5 group-hover:border-gold group-hover:text-gold transition-all duration-700">Discover Story</span>
                <Plus className="w-3.5 h-3.5 transition-transform duration-700 group-hover:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full lg:w-[80%] mx-auto px-8 space-y-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="text-gold text-[9px] font-bold uppercase tracking-editorial">New Arrivals</span>
          <h2 className="text-3xl md:text-5xl font-serif text-charcoal">Seasonal Atelier</h2>
          <div className="w-12 h-[1px] bg-gold/30 mt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
          {newArrivals.slice(0, 5).map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
          ))}
        </div>

        <div className="flex justify-center pt-4">
           <button 
            onClick={() => onNavigate('shop')}
            className="group relative px-16 py-5 border border-charcoal/5 text-[8px] font-bold uppercase tracking-widest-luxury hover:border-gold transition-all duration-1000"
          >
            <span className="relative z-10 text-charcoal group-hover:text-gold">Explore Collection</span>
            <div className="absolute inset-0 bg-gold/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-1000" />
          </button>
        </div>
      </section>

      {/* FINAL BEAUTIFUL EDITORIAL QUOTE REDESIGN */}
      <section className="relative py-60 bg-ivory overflow-hidden group">
        {/* Cinematic texture and subtle glow */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Orchestrated Decorative Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-40 bg-gradient-to-b from-transparent via-gold/20 to-gold/40" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-40 bg-gradient-to-t from-transparent via-gold/20 to-gold/40" />

        <div className="w-full lg:w-[80%] mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center max-w-5xl mx-auto">
            
            {/* Elegant Maison Crest Icon */}
            <div className="mb-16 relative flex flex-col items-center">
              <div className="w-16 h-16 border border-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold/50 transition-all duration-1000">
                <Sparkles className="w-5 h-5 text-gold/40 group-hover:text-gold transition-colors duration-1000" />
              </div>
              <div className="h-[1px] w-8 bg-gold/30" />
            </div>

            <div className="space-y-20 text-center">
              <blockquote className="relative">
                {/* Large Background Quote Marks as Art */}
                <span className="absolute -top-16 -left-12 text-[18rem] font-serif text-gold/[0.03] select-none pointer-events-none transition-transform duration-[2s] group-hover:-translate-x-4">“</span>
                <span className="absolute -bottom-16 -right-12 text-[18rem] font-serif text-gold/[0.03] select-none pointer-events-none transition-transform duration-[2s] group-hover:translate-x-4">”</span>
                
                <p className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-charcoal/90 leading-[1.1] transition-all duration-1000 group-hover:text-charcoal group-hover:scale-[1.01]">
                  "Perfume is the <span className="text-gold italic font-medium relative">invisible accessory<span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></span></span> that announces your arrival and prolongs your departure."
                </p>
              </blockquote>

              {/* Author Attribution with High-Tracking */}
              <div className="flex flex-col items-center space-y-8">
                <div className="flex items-center space-x-6">
                   <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/30" />
                   <p className="text-[12px] font-bold uppercase tracking-[1em] text-gold animate-pulse-slow">Gabrielle Coco Chanel</p>
                   <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/30" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-[9px] uppercase tracking-[0.6em] text-charcoal/20 font-bold">La Grande Demoiselle de Paris</p>
                  <div className="flex justify-center space-x-2">
                     <span className="w-1 h-1 bg-gold/20 rounded-full" />
                     <span className="w-1 h-1 bg-gold/40 rounded-full" />
                     <span className="w-1 h-1 bg-gold/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Floating Sideways Accents */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 -rotate-90 hidden xl:flex items-center space-x-6 opacity-30">
           <span className="text-[9px] uppercase tracking-[1.2em] text-charcoal font-bold whitespace-nowrap">L'HÉRITAGE ÉTERNEL</span>
           <div className="w-20 h-[1px] bg-gold/30" />
        </div>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 hidden xl:flex items-center space-x-6 opacity-30">
           <div className="w-20 h-[1px] bg-gold/30" />
           <span className="text-[9px] uppercase tracking-[1.2em] text-charcoal font-bold whitespace-nowrap">LA MÉMOIRE INVISIBLE</span>
        </div>
      </section>
    </div>
  );
};
