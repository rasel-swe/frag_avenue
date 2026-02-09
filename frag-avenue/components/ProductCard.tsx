import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group flex flex-col space-y-4 animate-fade-in cursor-pointer">
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-white border border-gold/[0.03] transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) group-hover:border-gold/20 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)]"
        onClick={onClick}
      >
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[3s] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-105"
        />
        
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-charcoal text-white text-[6px] uppercase font-bold tracking-[0.5em] px-2 py-1 z-10">
            New
          </div>
        )}

        <div className="absolute top-4 right-4 flex flex-col space-y-2.5 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-luxury z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`w-9 h-9 flex items-center justify-center bg-white shadow-sm transition-all duration-500 hover:bg-gold hover:text-white ${isWishlisted ? 'text-gold fill-gold' : 'text-charcoal/20'}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product.id, '50ml'); }}
            className="w-9 h-9 flex items-center justify-center bg-white shadow-sm text-charcoal/20 hover:bg-charcoal hover:text-white transition-all duration-500"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 py-3 bg-white/95 backdrop-blur-md text-[8px] font-bold uppercase tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-700 text-center z-10 border-t border-gold/5 text-charcoal">
          Explore
        </div>
      </div>

      <div className="space-y-1.5 text-center px-2" onClick={onClick}>
        <div className="inline-block relative">
          <h4 className="text-[8px] uppercase tracking-editorial text-charcoal/30 font-bold mb-0.5 transition-colors duration-700 group-hover:text-gold/80">
            {product.brand}
          </h4>
        </div>
        <h3 className="font-serif text-[13px] leading-tight text-charcoal group-hover:text-gold transition-colors duration-500 truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-center space-x-2 pt-0.5">
           <span className="w-3 h-[1px] bg-gold/20" />
           <p className="text-[10px] font-bold text-gold tracking-widest italic">
             ৳{product.price.toLocaleString()}
           </p>
           <span className="w-3 h-[1px] bg-gold/20" />
        </div>
      </div>
    </div>
  );
};

export const ProductSkeleton = () => (
  <div className="flex flex-col space-y-4">
    <div className="aspect-[4/5] skeleton w-full bg-charcoal/[0.02] rounded-none" />
    <div className="h-2 w-1/4 skeleton mx-auto opacity-30" />
    <div className="h-3 w-3/4 skeleton mx-auto" />
    <div className="h-2.5 w-1/5 skeleton mx-auto opacity-50" />
  </div>
);