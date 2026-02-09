
import React, { useState, useEffect, useRef } from 'react';
import { Compass, Eye, Target, Trophy, Sparkles, ShieldCheck, Heart, Headset, Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data';

export const About: React.FC = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderInterval = useRef<number | null>(null);

  useEffect(() => {
    if (!isHoveringSlider) {
      sliderInterval.current = window.setInterval(() => {
        setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
      }, 5000);
    } else if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
    return () => {
      if (sliderInterval.current) clearInterval(sliderInterval.current);
    };
  }, [isHoveringSlider]);

  const cards = [
    {
      title: 'Our Mission',
      icon: <Compass className="w-5 h-5" />,
      content: 'To craft premium fragrances that elevate confidence, individuality, and everyday luxury through exceptional quality and artistry.'
    },
    {
      title: 'Our Vision',
      icon: <Eye className="w-5 h-5" />,
      content: 'To become a globally trusted fragrance destination where elegance, authenticity, and innovation meet timeless scent experiences.'
    },
    {
      title: 'Our Target',
      icon: <Target className="w-5 h-5" />,
      content: 'Discerning individuals who appreciate fine craftsmanship, niche perfumes, and fragrances that leave a lasting impression.'
    },
    {
      title: 'Our Success',
      icon: <Trophy className="w-5 h-5" />,
      content: 'Measured through customer trust, repeat loyalty, global reach, and the emotional connection our fragrances create.'
    }
  ];

  return (
    <div className="bg-ivory selection:bg-gold/20 pb-20 overflow-x-hidden">
      {/* SECTION 1: HERO INTRO */}
      <section className="pt-48 pb-24 px-10 flex flex-col items-center text-center space-y-8 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-serif text-charcoal">Our Story</h1>
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-charcoal/50 max-w-xl leading-relaxed">
          Crafting timeless fragrances for those who value elegance. A sillage that transcends moments.
        </p>
        <div className="w-px h-24 bg-gradient-to-b from-gold/40 to-transparent mt-12" />
      </section>

      {/* SECTION 2: BRAND STORY */}
      <section className="w-full lg:w-[80%] mx-auto px-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-gold/10 group-hover:inset-0 transition-all duration-1000" />
            <img 
              src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=1200" 
              className="w-full aspect-[4/5] object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 shadow-2xl" 
              alt="Artisan Scenting" 
            />
          </div>
          <div className="space-y-10 animate-slide-up">
            <div className="space-y-4">
              <span className="text-gold text-[10px] font-bold uppercase tracking-editorial">Since 1924</span>
              <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">Refined Scent,<br/>Timeless Legacy</h2>
            </div>
            <div className="space-y-6 text-charcoal/70 leading-loose text-sm tracking-wide font-light">
              <p>
                Frag Avenue was founded with a passion for refined scents, timeless craftsmanship, and modern luxury. What began as a small atelier in Paris has blossomed into a destination for those who seek more than just a perfume.
              </p>
              <p>
                Each fragrance in our collection is meticulously curated to tell a story — personal, bold, and unforgettable. We believe that your scent is the most intense form of memory, an invisible signature that announces your arrival and lingers long after you've departed.
              </p>
            </div>
            <div className="pt-4">
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Curator" className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Curated by Artisans</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION / VISION / TARGET / SUCCESS */}
      <section className="w-full lg:w-[80%] mx-auto px-10 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className="bg-white border border-charcoal/5 p-10 space-y-6 group hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-700 animate-slide-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-700">
                {card.icon}
              </div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-charcoal group-hover:text-gold transition-colors">{card.title}</h3>
              <p className="text-[12px] text-charcoal/40 leading-relaxed uppercase tracking-wider font-medium">{card.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: WHY CUSTOMERS TRUST US */}
      <section className="relative py-32 bg-charcoal overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />
        <div className="w-full lg:w-[80%] mx-auto px-10 relative z-10 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-8 text-white">
            <span className="text-gold text-[10px] font-bold uppercase tracking-editorial">Excellence Guaranteed</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Why the Global<br/>Elite Trust Us</h2>
            <p className="text-ivory/40 text-sm leading-loose max-w-md uppercase tracking-widest font-light">
              We maintain a rigorous standard of authenticity and luxury, ensuring every drop delivered to our connoisseurs is a masterpiece.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {[
              { icon: <Sparkles className="w-6 h-6" />, label: 'Premium Ingredients', desc: 'Rare essences from Grasse' },
              { icon: <ShieldCheck className="w-6 h-6" />, label: 'Guaranteed Authentic', desc: 'Direct from Maison sources' },
              { icon: <Heart className="w-6 h-6" />, label: 'Bespoke Curation', desc: 'Hand-picked for excellence' },
              { icon: <Headset className="w-6 h-6" />, label: 'Elite Care', desc: 'Dedicated Dhaka Concierge' }
            ].map((item, i) => (
              <div key={i} className="space-y-4 group/item">
                <div className="text-gold group-hover/item:scale-110 transition-transform duration-500">{item.icon}</div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-ivory">{item.label}</h4>
                  <p className="text-[8px] uppercase tracking-widest text-ivory/20 font-bold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CUSTOMER REVIEWS SLIDER */}
      <section className="py-40 bg-ivory overflow-hidden">
        <div className="w-full lg:w-[80%] mx-auto px-10 flex flex-col items-center">
          <div className="text-center mb-20 space-y-4">
             <span className="text-gold text-[10px] font-bold uppercase tracking-editorial">Global Impressions</span>
             <h2 className="text-4xl md:text-5xl font-serif text-charcoal">What Our Customers Say</h2>
          </div>

          <div 
            className="w-full max-w-4xl relative"
            onMouseEnter={() => setIsHoveringSlider(true)}
            onMouseLeave={() => setIsHoveringSlider(false)}
          >
            <div className="relative overflow-hidden h-80">
              {REVIEWS.map((review, i) => (
                <div 
                  key={review.id}
                  className={`absolute inset-0 transition-all duration-[1.5s] ease-luxury flex flex-col items-center justify-center text-center space-y-8 px-12 ${
                    activeReviewIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'
                  }`}
                >
                  <Quote className="w-12 h-12 text-gold/10" />
                  <p className="text-xl md:text-2xl font-serif italic text-charcoal/80 leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-center text-gold space-x-1">
                      {Array(review.rating).fill(0).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-8 h-[1px] bg-charcoal/5" />
                      <div className="flex flex-col">
                         <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal">{review.name}</span>
                         <span className="text-[8px] uppercase tracking-widest text-charcoal/30">{review.location}</span>
                      </div>
                      <div className="w-8 h-[1px] bg-charcoal/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4 mt-12">
               {REVIEWS.map((_, i) => (
                 <button 
                  key={i} 
                  onClick={() => setActiveReviewIndex(i)}
                  className={`h-[1px] transition-all duration-700 ${activeReviewIndex === i ? 'w-16 bg-gold' : 'w-8 bg-charcoal/10 hover:bg-gold/30'}`}
                 />
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLOSING STATEMENT */}
      <section className="py-40 border-t border-charcoal/5 flex flex-col items-center text-center space-y-12">
        <div className="relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-gold/10 rounded-full animate-pulse-slow" />
           <Sparkles className="w-6 h-6 text-gold/40 relative z-10" />
        </div>
        <h2 className="text-3xl md:text-5xl font-serif italic text-charcoal/90 leading-tight transition-transform hover:scale-[1.02] duration-1000">
          “Frag Avenue is more than fragrance — it’s a signature.”
        </h2>
        <p className="text-[10px] uppercase tracking-[0.8em] text-gold font-bold">The House of Essence</p>
      </section>
    </div>
  );
};
