
import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Lock, User as UserIcon, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';

export const Auth: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
  const { setUser } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const simulateAuth = (userData: { name: string, email: string }) => {
    setLoading(true);
    // Simulate a luxury "Refining Selection" or "Authenticating" delay
    setTimeout(() => {
      setUser({
        ...userData,
        wishlist: []
      });
      setLoading(false);
      onAuthSuccess();
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = isLogin ? (formData.email.split('@')[0]) : formData.name;
    simulateAuth({ name, email: formData.email });
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth popup and success
    simulateAuth({ 
      name: 'Julian Vane', 
      email: 'julian.vane@gmail.com' 
    });
  };

  const toggleMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({ name: '', email: '', password: '' });
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex bg-ivory selection:bg-gold/20">
      {/* Left Side: Editorial Cinematic Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/30 z-10" />
        <div className="absolute inset-0 z-[5] bg-gradient-to-r from-charcoal/20 to-transparent" />
        <img 
          src={isLogin 
            ? "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1200" 
            : "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200"} 
          className={`w-full h-full object-cover transition-all duration-1000 scale-105 ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
          alt="Luxury Perfumery" 
        />
        
        {/* Brand Overlay on Image */}
        <div className="absolute top-12 left-12 z-20">
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-serif tracking-widest uppercase text-white">Frag</span>
            <span className="text-[10px] font-sans tracking-[0.5em] uppercase text-white/60">Avenue</span>
          </div>
        </div>

        <div className="absolute bottom-20 left-20 z-20 max-w-md space-y-8 text-ivory">
          <div className={`transition-all duration-700 delay-100 ${isTransitioning ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h2 className="text-6xl font-serif italic mb-4 leading-tight">
              {isLogin ? 'Welcome Home' : 'Begin Your Journey'}
            </h2>
            <div className="w-12 h-1 bg-gold mb-6" />
            <p className="text-xs uppercase tracking-[0.4em] leading-relaxed opacity-70">
              {isLogin 
                ? 'Step back into the world of artisanal scents and exclusive curation.' 
                : 'Join our prestigious circle. Discover scents as unique as your own signature.'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Member" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/50">Joined by 10k+ Connoisseurs</span>
          </div>
        </div>
      </div>

      {/* Right Side: Sophisticated Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-24 relative overflow-hidden">
        {/* Background Texture/Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        
        <div className={`w-full max-w-sm space-y-10 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <div className="space-y-4 text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Maison de Parfum</span>
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">
              {isLogin ? 'The Return' : 'The Awakening'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {!isLogin && (
                <div className="space-y-1.5 group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal/40 group-focus-within:text-gold transition-colors block pl-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 group-focus-within:text-gold transition-colors" />
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Alexander Saint"
                      className="w-full bg-white/50 border border-charcoal/5 rounded-sm pl-11 pr-4 py-3.5 text-sm outline-none focus:border-gold/50 focus:bg-white transition-all shadow-sm placeholder:text-charcoal/10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5 group">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal/40 group-focus-within:text-gold transition-colors block pl-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 group-focus-within:text-gold transition-colors" />
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="concierge@fragavenue.com"
                    className="w-full bg-white/50 border border-charcoal/5 rounded-sm pl-11 pr-4 py-3.5 text-sm outline-none focus:border-gold/50 focus:bg-white transition-all shadow-sm placeholder:text-charcoal/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal/40 group-focus-within:text-gold transition-colors">
                    Security Key
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 group-focus-within:text-gold transition-colors" />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-white/50 border border-charcoal/5 rounded-sm pl-11 pr-12 py-3.5 text-sm outline-none focus:border-gold/50 focus:bg-white transition-all shadow-sm placeholder:text-charcoal/10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/20 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-all ${rememberMe ? 'bg-gold border-gold' : 'border-charcoal/20 group-hover:border-gold'}`}
                >
                  {rememberMe && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 group-hover:text-charcoal transition-colors">Remember Me</span>
              </label>
              {isLogin && (
                <button type="button" className="text-[10px] uppercase tracking-widest text-gold hover:text-charcoal transition-colors underline underline-offset-4">
                  Recovery
                </button>
              )}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full relative py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all overflow-hidden ${loading ? 'bg-charcoal/80' : 'bg-charcoal hover:bg-gold'} text-white shadow-2xl shadow-charcoal/20`}
            >
              <div className={`flex items-center justify-center space-x-3 transition-all duration-300 ${loading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <span>{isLogin ? 'Secure Entry' : 'Create Legacy'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-1.5 items-center">
                    <span className="text-[10px] animate-pulse">Refining...</span>
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </button>
          </form>

          <div className="space-y-8 pt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-charcoal/5"></div></div>
              <div className="relative flex justify-center text-[8px] uppercase tracking-[0.5em] font-bold"><span className="bg-ivory px-6 text-charcoal/20 tracking-[0.8em]">Atelier Connect</span></div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center space-x-4 border border-charcoal/10 py-4 hover:border-gold/40 hover:bg-white transition-all group rounded-sm shadow-sm disabled:opacity-50"
              >
                <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/60">Continue with Google</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <button 
                type="button"
                onClick={toggleMode}
                disabled={loading}
                className="group relative inline-block text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-gold transition-colors font-bold disabled:opacity-50"
              >
                <span>{isLogin ? "Become a Member" : "Registered Connoisseur?"}</span>
                <span className="block h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-300 mx-auto mt-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating background elements for depth */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
};
