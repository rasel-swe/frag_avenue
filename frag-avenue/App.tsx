
import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar, CartSlider, Footer, TrustBar } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { About } from './pages/About';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [initialCategory, setInitialCategory] = useState<'All' | 'Men' | 'Women'>('All');

  // Fix: Handle wishlist redirect at top level to follow Hook rules (cannot be inside switch/render logic)
  useEffect(() => {
    if (currentPage === 'wishlist') {
      setCurrentPage('profile');
    }
  }, [currentPage]);

  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (page: string, category: 'All' | 'Men' | 'Women' = 'All') => {
    // Check if it's a deep product link (product-p1, etc)
    if (page.startsWith('product-')) {
      navigateToProduct(page.replace('product-', ''));
      return;
    }
    setInitialCategory(category);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onProductClick={navigateToProduct} onNavigate={navigateToPage} />;
      case 'shop':
        return <Shop onProductClick={navigateToProduct} initialCategory={initialCategory} />;
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetail 
            productId={selectedProductId} 
            onBack={() => navigateToPage('shop')} 
            onProductClick={navigateToProduct}
          />
        ) : <Home onProductClick={navigateToProduct} onNavigate={navigateToPage} />;
      case 'checkout':
        return <Checkout onComplete={() => navigateToPage('home')} />;
      case 'login':
        return <Auth onAuthSuccess={() => navigateToPage('home')} />;
      case 'profile':
        return <Profile onNavigate={navigateToPage} />;
      case 'about':
        return <About />;
      case 'wishlist':
        return (
          <div className="pt-40 pb-20 w-full lg:w-[80%] mx-auto px-6 space-y-12">
            <h1 className="text-5xl font-serif text-center">Your Collection</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <p className="col-span-full text-center text-charcoal/40 italic">Redirecting to your personalized profile collection...</p>
            </div>
          </div>
        );
      default:
        return <Home onProductClick={navigateToProduct} onNavigate={navigateToPage} />;
    }
  };

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-ivory">
        <Navbar onNavigate={navigateToPage} />
        <CartSlider onNavigate={navigateToPage} />
        
        <main className="flex-1">
          {renderPage()}
        </main>

        <TrustBar />
        <Footer onNavigate={navigateToPage} />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideRight {
            from { transform: scaleX(0); transform-origin: left; }
            to { transform: scaleX(1); transform-origin: left; }
          }
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes pulseSlow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(0.98); }
          }
          .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
          .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
          .animate-slide-right { animation: slideRight 0.5s ease-out forwards; }
          .animate-slide-in { animation: slideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
          .animate-slide-in-left { animation: slideInLeft 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
          .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
          
          /* Custom ease for luxury motion */
          .ease-luxury { transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1); }
        `}} />
      </div>
    </StoreProvider>
  );
};

export default App;
