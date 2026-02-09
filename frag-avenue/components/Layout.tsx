
import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, Heart, User, Menu, X, Trash2, Plus, Minus, 
  Search, ChevronDown, LogOut, Truck, ShieldCheck, RotateCcw, Headset 
} from 'lucide-react';
import { PRODUCTS } from '../data';

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center space-x-3 cursor-pointer group ${className}`}>
    <div className="relative flex items-center justify-center w-10 h-10 border border-gold/20 rounded-full transition-all duration-1000 group-hover:border-gold/60 group-hover:bg-gold/5">
       <div className="absolute inset-0 rounded-full border border-gold/5 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"></div>
       <span className="text-[10px] font-serif italic text-gold tracking-tighter">FA</span>
    </div>
    <div className="flex flex-col -space-y-1.5">
      <span className="text-xl font-serif tracking-[0.2em] uppercase text-charcoal group-hover:text-gold transition-colors duration-500">
        Frag
      </span>
      <span className="text-[8px] font-sans font-medium tracking-[0.6em] uppercase text-charcoal/30 group-hover:text-gold/60 transition-colors duration-500">
        Avenue
      </span>
    </div>
  </div>
);

export const Navbar: React.FC<{ onNavigate: (page: string, category?: any) => void }> = ({ onNavigate }) => {
  const { cart, wishlist, setIsCartOpen, user, logout } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isMobileCollectionExpanded, setIsMobileCollectionExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = "relative text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/60 hover:text-gold transition-colors duration-500 py-1.5";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 ${
      isScrolled 
        ? 'bg-ivory/95 backdrop-blur-md border-b border-gold/5 py-2' 
        : 'bg-transparent py-6'
    }`}>
      <div className="w-full lg:w-[80%] mx-auto flex items-center justify-between">
        <button className="md:hidden p-2 hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="hidden md:flex items-center space-x-10">
          <button onClick={() => onNavigate('home')} className={navLinkClass}>
            Home
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100"></span>
          </button>
          <button onClick={() => onNavigate('shop')} className={navLinkClass}>
            Shop
          </button>
          
          <div 
            className="relative group"
            onMouseEnter={() => setIsCollectionOpen(true)}
            onMouseLeave={() => setIsCollectionOpen(false)}
          >
            <button className={`${navLinkClass} flex items-center space-x-1.5`}>
              <span>Collection</span>
              <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-500 ${isCollectionOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full left-0 pt-3 transition-all duration-500 ${isCollectionOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <div className="bg-white border border-gold/10 shadow-2xl p-8 min-w-[220px] space-y-5">
                <div className="space-y-3.5">
                  <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gold/60 mb-1">By Recipient</p>
                  {['Men', 'Women', 'Unisex'].map(cat => (
                    <button key={cat} onClick={() => onNavigate('shop', cat)} className="block w-full text-left text-[9px] font-bold uppercase tracking-widest text-charcoal/40 hover:text-gold hover:translate-x-1 transition-all">
                      {cat === 'Men' ? 'Pour Homme' : cat === 'Women' ? 'Pour Femme' : 'L\'Essence Universelle'}
                    </button>
                  ))}
                </div>
                <div className="h-px bg-gold/5 w-full" />
                <div className="space-y-3.5">
                  <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gold/60 mb-1">Discoveries</p>
                  <button onClick={() => onNavigate('shop')} className="block w-full text-left text-[9px] font-bold uppercase tracking-widest text-charcoal/40 hover:text-gold hover:translate-x-1 transition-all">
                    New Arrivals
                  </button>
                  <button onClick={() => onNavigate('shop')} className="block w-full text-left text-[9px] font-bold uppercase tracking-widest text-charcoal/40 hover:text-gold hover:translate-x-1 transition-all">
                    Limited Editions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => onNavigate('home')} className="md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer scale-90 md:scale-100 transition-transform">
          <Logo />
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex items-center space-x-6 border-r border-charcoal/5 pr-6">
             <button onClick={() => onNavigate('about')} className={navLinkClass}>Heritage</button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('profile')} className="group relative">
              <Heart className="w-4 h-4 text-charcoal/40 group-hover:text-gold transition-colors duration-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[6px] w-3 h-3 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button onClick={() => user ? onNavigate('profile') : onNavigate('login')} className="group flex items-center space-x-2">
              <User className="w-4 h-4 text-charcoal/40 group-hover:text-gold transition-colors duration-500" />
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative group p-1.5">
              <ShoppingBag className="w-4 h-4 text-charcoal/40 group-hover:text-gold transition-colors duration-500" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-charcoal text-white text-[6px] w-3 h-3 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop with heavy blur and dark overlay to isolate the drawer */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-xl animate-fade-in" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Menu Drawer: 100% Solid background to prevent any leaking from hero section */}
          <div className="relative w-[80%] h-full bg-charcoal text-ivory flex flex-col p-8 md:p-12 animate-slide-in-left shadow-[40px_0_80px_rgba(0,0,0,0.9)] border-r border-gold/20 overflow-y-auto z-[110]">
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="self-end p-2 mb-10 hover:rotate-90 transition-transform duration-500 text-gold"
            >
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>
            
            <div className="flex flex-col flex-1 space-y-12">
               <div onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="relative flex items-center space-x-4 cursor-pointer">
                  <div className="relative flex items-center justify-center w-14 h-14 border border-gold/40 rounded-full bg-gold/5">
                    <span className="text-gold font-serif italic text-xl tracking-tighter">FA</span>
                  </div>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-xl font-serif tracking-widest uppercase text-ivory">Frag Avenue</span>
                    <span className="text-[8px] font-sans tracking-[0.4em] uppercase text-gold/80">Maison de Parfum</span>
                  </div>
               </div>
               
               <div className="flex flex-col space-y-10 text-[14px] font-bold tracking-[0.4em] uppercase">
                 <button 
                   onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
                   className="text-left hover:text-gold transition-colors border-b border-white/10 pb-4"
                 >
                   Home
                 </button>

                 <div className="flex flex-col space-y-6">
                   <button 
                     onClick={() => setIsMobileCollectionExpanded(!isMobileCollectionExpanded)}
                     className="flex items-center justify-between text-left hover:text-gold transition-colors border-b border-white/10 pb-4"
                   >
                     <span>Collection</span>
                     <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isMobileCollectionExpanded ? 'rotate-180 text-gold' : 'text-ivory/20'}`} />
                   </button>
                   
                   {isMobileCollectionExpanded && (
                     <div className="pl-6 flex flex-col space-y-8 animate-fade-in py-2">
                       <button onClick={() => { onNavigate('shop', 'Men'); setIsMobileMenuOpen(false); }} className="flex items-center space-x-4 group text-left">
                         <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors"></span>
                         <span className="text-[12px] text-ivory/60 group-hover:text-gold tracking-[0.3em]">Pour Homme</span>
                       </button>
                       <button onClick={() => { onNavigate('shop', 'Women'); setIsMobileMenuOpen(false); }} className="flex items-center space-x-4 group text-left">
                         <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors"></span>
                         <span className="text-[12px] text-ivory/60 group-hover:text-gold tracking-[0.3em]">Pour Femme</span>
                       </button>
                       <button onClick={() => { onNavigate('shop', 'Unisex'); setIsMobileMenuOpen(false); }} className="flex items-center space-x-4 group text-left">
                         <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors"></span>
                         <span className="text-[12px] text-ivory/60 group-hover:text-gold tracking-[0.3em]">Universal</span>
                       </button>
                     </div>
                   )}
                 </div>

                 <button 
                   onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }}
                   className="text-left hover:text-gold transition-colors border-b border-white/10 pb-4"
                 >
                   Heritage
                 </button>
                 
                 <button 
                   onClick={() => { onNavigate('profile'); setIsMobileMenuOpen(false); }}
                   className="text-left hover:text-gold transition-colors border-b border-white/10 pb-4"
                 >
                   My Account
                 </button>
               </div>
            </div>
            
            <div className="mt-auto border-t border-gold/20 pt-10 flex flex-col space-y-6 bg-charcoal">
               <div className="flex items-center space-x-4 text-gold">
                 <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                    <ShoppingBag className="w-4 h-4" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Dhaka Concierge</span>
               </div>
               <p className="text-[7px] uppercase tracking-[0.6em] text-white/20">© 2024 Frag Avenue - Excellence in Perfumery</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const CartSlider: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateCartQuantity, totalCartPrice, isCartOpen, setIsCartOpen } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-8 border-b border-gold/10 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-serif uppercase tracking-widest">Shopping Bag</h2>
            <p className="text-[8px] text-charcoal/40 uppercase tracking-widest">{cart.length} Items</p>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-500">
            <X className="w-5 h-5 stroke-[1]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
              <ShoppingBag className="w-8 h-8 text-gold/20" />
              <p className="text-[9px] uppercase tracking-[0.4em] text-charcoal/40">Empty Bag</p>
              <button 
                onClick={() => { setIsCartOpen(false); onNavigate('shop'); }}
                className="text-[8px] font-bold uppercase tracking-widest border-b border-gold pb-1 text-gold"
              >
                Explore
              </button>
            </div>
          ) : (
            cart.map(item => {
              const product = PRODUCTS.find((p: any) => p.id === item.productId);
              if (!product) return null;
              return (
                <div key={item.id} className="flex space-x-6 group">
                  <div className="w-20 h-24 bg-beige-soft overflow-hidden flex-shrink-0 border border-gold/5">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm tracking-tight">{product.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-charcoal/20 hover:text-red-400">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[8px] text-charcoal/40 uppercase tracking-widest font-bold">{product.brand}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-4 text-charcoal/60">
                        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="hover:text-gold"><Minus className="w-2.5 h-2.5" /></button>
                        <span className="text-[10px] font-bold">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="hover:text-gold"><Plus className="w-2.5 h-2.5" /></button>
                      </div>
                      <span className="text-xs font-serif">৳{ (product.price * item.quantity).toLocaleString() }</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-8 bg-ivory border-t border-gold/10 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-[8px] uppercase tracking-[0.3em] text-charcoal/40">
              <span>Subtotal</span>
              <span>৳{totalCartPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] text-charcoal pt-4 border-t border-charcoal/5">
              <span>Estimated Total</span>
              <span className="text-lg font-serif text-gold">৳{totalCartPrice.toLocaleString()}</span>
            </div>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={() => { setIsCartOpen(false); onNavigate('checkout'); }}
            className="w-full bg-charcoal text-white py-5 text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-gold transition-all duration-700 disabled:opacity-20"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export const TrustBar: React.FC = () => (
  <section className="bg-white py-16 border-t border-gold/10">
    <div className="w-full lg:w-[80%] mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-12">
      {[
        { icon: <Truck className="w-5 h-5" />, title: 'Royal Shipping', text: 'Global Express' },
        { icon: <ShieldCheck className="w-5 h-5" />, title: 'SSL Security', text: '100% Encrypted' },
        { icon: <RotateCcw className="w-5 h-5" />, title: 'Elite Returns', text: '30 Days Window' },
        { icon: <Headset className="w-5 h-5" />, title: 'Concierge', text: 'At Your Service' },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center text-center space-y-4 group">
          <div className="text-gold/40 group-hover:text-gold transition-colors duration-500">{item.icon}</div>
          <div className="space-y-1">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-charcoal">{item.title}</h4>
            <p className="text-[8px] text-charcoal/30 uppercase tracking-[0.2em]">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
  <footer className="bg-charcoal text-ivory py-20 px-10 relative overflow-hidden">
    <div className="w-full lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
      <div className="md:col-span-4 space-y-8">
        <Logo className="invert brightness-0" />
        <p className="text-[9px] text-ivory/30 leading-loose max-w-xs uppercase tracking-widest-luxury">
          Excellence in haute perfumery, distilled in eternal moments. Sourced from Grasse, inspired by Paris, delivered to Dhaka.
        </p>
      </div>
      
      <div className="md:col-span-2 space-y-8">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">The House</h4>
        <ul className="space-y-4 text-[9px] text-ivory/40 uppercase tracking-widest-luxury">
          <li><button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Boutique</button></li>
          <li><button onClick={() => onNavigate('about')} className="hover:text-gold transition-colors">Our Heritage</button></li>
          <li><button className="hover:text-gold transition-colors">The Manifesto</button></li>
        </ul>
      </div>

      <div className="md:col-span-2 space-y-8">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Concierge</h4>
        <ul className="space-y-4 text-[9px] text-ivory/40 uppercase tracking-widest-luxury">
          <li><button className="hover:text-gold transition-colors">Shipping</button></li>
          <li><button className="hover:text-gold transition-colors">Tracking</button></li>
          <li><button className="hover:text-gold transition-colors">Policy</button></li>
        </ul>
      </div>

      <div className="md:col-span-4 space-y-8">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Newsletter</h4>
        <div className="flex border-b border-ivory/10 pb-3">
           <input type="email" placeholder="Your Email" className="bg-transparent flex-1 outline-none text-[9px] uppercase tracking-widest" />
           <button className="text-[9px] font-bold uppercase tracking-widest hover:text-gold">Join</button>
        </div>
      </div>
    </div>
    
    <div className="w-full lg:w-[80%] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] uppercase tracking-[0.5em] text-ivory/20">
      <p>© 2024 Frag Avenue - Maison de Parfum.</p>
      <div className="flex space-x-10 mt-6 md:mt-0">
        <button className="hover:text-ivory">Privacy</button>
        <button className="hover:text-ivory">Legal</button>
      </div>
    </div>
  </footer>
);
