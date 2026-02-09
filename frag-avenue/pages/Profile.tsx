
import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data';
import { 
  User as UserIcon, Package, Heart, Settings, MapPin, 
  ChevronRight, LogOut, Star, Clock, Crown, 
  CreditCard, Bell, Sparkles, Share2, ShoppingBag,
  Mail, Check, RefreshCcw, Camera, FileText, Truck, Box
} from 'lucide-react';

export const Profile: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { user, setUser, logout, wishlist, toggleWishlist, addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<'account' | 'orders' | 'wishlist' | 'settings'>('account');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || 'House 12, Road 90, Gulshan 2, Dhaka',
        paymentMethod: user.paymentMethod || 'Visa Platinum •••• 1234'
      });
    }
  }, [user]);

  if (!user) {
    onNavigate('login');
    return null;
  }

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setUser({
        ...user,
        name: profileData.name,
        email: profileData.email,
        address: profileData.address,
        paymentMethod: profileData.paymentMethod
      });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleShare = async (product: any) => {
    const shareUrl = `${window.location.origin}?product=${product.id}`;
    const shareData = {
      title: `Frag Avenue | ${product.name}`,
      text: `Discover ${product.name} by ${product.brand} at Frag Avenue Dhaka.`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Exclusive link copied to your clipboard.');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Enhanced order data with product images for visualization
  const orders = [
    { 
      id: 'FRV-994102', 
      date: 'Oct 12, 2024', 
      total: 81500, 
      status: 'In Atelier', 
      statusMessage: 'Master perfumers are preparing your selection.',
      items: [
        { name: 'Oud Silk Mood', brand: 'MFK', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=200' },
        { name: 'Baccarat Rouge 540', brand: 'MFK', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=200' }
      ],
      estimatedDelivery: 'Oct 14, 2024'
    },
    { 
      id: 'FRV-882104', 
      date: 'Aug 24, 2024', 
      total: 36000, 
      status: 'Delivered', 
      statusMessage: 'Successfully hand-delivered by our concierge.',
      items: [
        { name: 'Santal 33', brand: 'Le Labo', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=200' }
      ],
      estimatedDelivery: 'Aug 26, 2024'
    },
  ];

  const handleReorder = (itemNames: string[]) => {
    itemNames.forEach(name => {
      const product = PRODUCTS.find(p => p.name === name);
      if (product) {
        addToCart(product.id, '50ml', 1);
      }
    });
  };

  const wishlistItems = PRODUCTS.filter(p => wishlist.includes(p.id));

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <div className="pt-24 pb-0 min-h-screen bg-[#f4f2ee] selection:bg-gold/20">
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[30vw] h-[30vw] bg-charcoal/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full lg:w-[85%] xl:w-[80%] mx-auto bg-white min-h-screen shadow-[0_0_100px_rgba(0,0,0,0.04)] border-x border-charcoal/5 animate-fade-in relative overflow-hidden">
        
        <div className="relative h-96 w-full overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover grayscale opacity-40 transition-transform duration-[10s] group-hover:scale-105" 
            alt="Heritage Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-white" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-gold/30 p-2 bg-white/10 backdrop-blur-md overflow-hidden shadow-2xl relative">
                <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center text-5xl md:text-7xl font-serif italic text-gold">
                  {user.name.charAt(0)}
                </div>
              </div>
              <button className="absolute bottom-2 right-4 bg-gold text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.8em] text-gold font-bold">Elite Collector</span>
                <Crown className="w-3.5 h-3.5 text-gold" />
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-charcoal">{user.name}</h1>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-20 pb-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <aside className="lg:w-64 space-y-12 shrink-0">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-charcoal/20 pl-6 border-l border-gold/30">Maison Portal</p>
                <nav className="flex flex-row lg:flex-col overflow-x-auto pb-4 lg:pb-0 gap-1 no-scrollbar">
                  {[
                    { id: 'account', label: 'Identity', icon: <UserIcon className="w-4 h-4" /> },
                    { id: 'orders', label: 'Acquisitions', icon: <Package className="w-4 h-4" /> },
                    { id: 'wishlist', label: 'Curations', icon: <Heart className="w-4 h-4" /> },
                    { id: 'settings', label: 'Preferences', icon: <Settings className="w-4 h-4" /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-4 px-6 py-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all whitespace-nowrap group ${
                        activeTab === tab.id 
                          ? 'text-charcoal bg-[#f4f2ee]/40 border-r-2 border-gold shadow-sm' 
                          : 'text-charcoal/30 hover:text-gold hover:bg-[#f4f2ee]/20'
                      }`}
                    >
                      <span className={`transition-colors duration-300 ${activeTab === tab.id ? 'text-gold' : 'group-hover:text-gold'}`}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-8 border-t border-charcoal/5">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-4 px-6 py-4 text-[10px] uppercase tracking-[0.4em] font-bold text-red-400/50 hover:text-red-600 hover:bg-red-50/50 transition-all rounded-sm w-full group"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Depart House</span>
                </button>
              </div>
            </aside>

            <main className="flex-1 min-h-[600px] animate-fade-in py-4">
              {activeTab === 'account' && (
                <div className="space-y-16 animate-slide-up">
                  <div className="space-y-5 border-b border-charcoal/5 pb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal">Personal Identity</h2>
                    <p className="text-[11px] text-charcoal/40 uppercase tracking-[0.4em] max-w-lg leading-relaxed">Modify your digital signature and residence details for our Dhaka concierge service.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    <div className="group space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold/60 flex items-center gap-2 group-focus-within:text-gold transition-colors">
                        <UserIcon className="w-4 h-4 stroke-[1.5]" />
                        Full Name
                      </label>
                      <input 
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Julian Vane"
                        className="w-full bg-transparent border-b border-charcoal/10 py-4 text-[13px] tracking-widest font-medium outline-none focus:border-gold transition-all"
                      />
                    </div>

                    <div className="group space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold/60 flex items-center gap-2 group-focus-within:text-gold transition-colors">
                        <Mail className="w-4 h-4 stroke-[1.5]" />
                        Email Address
                      </label>
                      <input 
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="concierge@fragavenue.com"
                        className="w-full bg-transparent border-b border-charcoal/10 py-4 text-[13px] tracking-widest font-medium outline-none focus:border-gold transition-all"
                      />
                    </div>

                    <div className="group space-y-4 col-span-full">
                      <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold/60 flex items-center gap-2 group-focus-within:text-gold transition-colors">
                        <MapPin className="w-4 h-4 stroke-[1.5]" />
                        Dhaka Residence
                      </label>
                      <input 
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Road & House No, Area"
                        className="w-full bg-transparent border-b border-charcoal/10 py-4 text-[13px] tracking-widest font-medium outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-12 flex items-center gap-8">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="group relative bg-charcoal text-white px-16 py-6 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-gold transition-all shadow-2xl disabled:bg-charcoal/40 overflow-hidden"
                    >
                      <span className="relative z-10">
                        {isSaving ? 'Authenticating...' : 'Save Refinements'}
                      </span>
                      <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                    </button>

                    {saveSuccess && (
                      <div className="flex items-center gap-3 text-green-600 animate-fade-in">
                        <div className="w-6 h-6 rounded-full border border-green-200 flex items-center justify-center bg-green-50">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Profile Persisted</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-16 animate-slide-up">
                  <div className="space-y-5 border-b border-charcoal/5 pb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal">The Archive</h2>
                    <p className="text-[11px] text-charcoal/40 uppercase tracking-[0.4em] leading-relaxed max-w-lg">A curated ledger of your acquisitions from the Maison, tracking each sillage to your doorstep.</p>
                  </div>
                  
                  <div className="space-y-12">
                    {orders.map((order) => (
                      <div key={order.id} className="relative group overflow-hidden">
                        {/* Elegant background card with editorial shadow */}
                        <div className="bg-white border border-charcoal/5 p-8 md:p-12 transition-all duration-700 hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.06)] hover:border-gold/10">
                          
                          {/* Header: ID and Date */}
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-charcoal/5 pb-8">
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.5em] block">{order.id}</span>
                              <div className="flex items-center gap-4">
                                <Clock className="w-3 h-3 text-charcoal/20" />
                                <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-bold">Acquired on {order.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-charcoal/60">
                              <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Total Investment:</span>
                              <span className="text-xl font-serif text-charcoal">৳{order.total.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Body: Products with Thumbnails */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                            <div className="space-y-6">
                              <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-gold/60 mb-4">Selections</p>
                              <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-6 group/item cursor-pointer">
                                    <div className="w-16 h-16 bg-[#f4f2ee] overflow-hidden border border-charcoal/5 shrink-0 transition-transform group-hover/item:scale-105">
                                      <img src={item.image} className="w-full h-full object-cover grayscale opacity-80" alt={item.name} />
                                    </div>
                                    <div>
                                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold">{item.brand}</p>
                                      <h4 className="font-serif text-lg text-charcoal">{item.name}</h4>
                                      <p className="text-[9px] uppercase tracking-widest text-charcoal/20">50ml Edition</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Status and Logistics */}
                            <div className="space-y-8 bg-[#fdfbf7] p-8 border border-charcoal/[0.03]">
                               <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-gold/60">Logistics Status</p>
                               
                               <div className="space-y-6">
                                  <div className="flex items-center gap-5">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                                      order.status === 'Delivered' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-gold/5 border-gold/20 text-gold'
                                    }`}>
                                      {order.status === 'Delivered' ? <Check className="w-5 h-5" /> : <Box className="w-5 h-5 stroke-[1.5]" />}
                                    </div>
                                    <div>
                                      <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal">{order.status}</h5>
                                      <p className="text-[11px] font-serif italic text-charcoal/40">{order.statusMessage}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-5 pl-1.5">
                                    <div className="w-[1px] h-8 bg-charcoal/5" />
                                    <div className="flex items-center gap-4">
                                      <Truck className="w-4 h-4 text-charcoal/10" />
                                      <p className="text-[9px] uppercase tracking-widest text-charcoal/30 font-bold">
                                        {order.status === 'Delivered' ? 'Hand-delivered at Dhaka Residence' : `Est. Arrival: ${order.estimatedDelivery}`}
                                      </p>
                                    </div>
                                  </div>
                               </div>
                            </div>
                          </div>

                          {/* Footer Actions */}
                          <div className="flex flex-wrap items-center justify-between pt-10 border-t border-charcoal/5 gap-8">
                             <div className="flex items-center gap-8">
                                <button className="group flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest-luxury text-charcoal/30 hover:text-gold transition-colors">
                                  <FileText className="w-4 h-4" />
                                  <span className="border-b border-transparent group-hover:border-gold/30 pb-1">Digital Receipt</span>
                                </button>
                                <button className="group flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest-luxury text-charcoal/30 hover:text-gold transition-colors">
                                  <Share2 className="w-4 h-4" />
                                  <span className="border-b border-transparent group-hover:border-gold/30 pb-1">Share Experience</span>
                                </button>
                             </div>

                             <button 
                              onClick={() => handleReorder(order.items.map(i => i.name))}
                              className="group flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest-luxury text-charcoal bg-[#f4f2ee]/50 px-8 py-4 border border-charcoal/5 hover:bg-gold hover:text-white hover:border-gold transition-all duration-700"
                            >
                              <RefreshCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-1000" />
                              <span>Repeat Acquisition</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-12 animate-slide-up">
                  <div className="space-y-5 border-b border-charcoal/5 pb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal">The Curation</h2>
                    <p className="text-[11px] text-charcoal/40 uppercase tracking-[0.4em]">Scents awaiting your final deliberation.</p>
                  </div>
                  {wishlistItems.length === 0 ? (
                    <div className="py-32 text-center opacity-20">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-6 stroke-[1]" />
                      <p className="text-[11px] uppercase tracking-[0.8em]">Empty Collection</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
                      {wishlistItems.map((product) => (
                        <div key={product.id} className="group flex flex-col space-y-6">
                          <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f2ee] border border-charcoal/5">
                             <img src={product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" alt={product.name} />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-1000" />
                             <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                                <button onClick={() => toggleWishlist(product.id)} className="p-3 bg-white text-red-500 shadow-xl hover:bg-gold hover:text-white transition-colors"><Heart className="w-4 h-4 fill-current" /></button>
                                <button onClick={() => handleShare(product)} className="p-3 bg-white text-gold shadow-xl hover:bg-charcoal hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                             </div>
                             <button 
                                onClick={() => addToCart(product.id, '50ml')}
                                className="absolute bottom-0 left-0 right-0 py-4 bg-charcoal text-white text-[9px] font-bold uppercase tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-700"
                              >
                                Add to Bag
                             </button>
                          </div>
                          <div className="text-center space-y-2">
                            <p className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold">{product.brand}</p>
                            <h4 className="font-serif text-xl text-charcoal">{product.name}</h4>
                            <p className="text-[11px] font-bold text-charcoal/30 tracking-[0.3em]">৳{product.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
