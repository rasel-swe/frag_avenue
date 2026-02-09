
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, ProductSize, Product, User } from '../types';
import { PRODUCTS } from '../data';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  addToCart: (productId: string, size: ProductSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCartPrice: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUserState] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('frag_ave_cart');
    const savedWishlist = localStorage.getItem('frag_ave_wishlist');
    const savedUser = localStorage.getItem('frag_ave_user');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUserState(JSON.parse(savedUser));
  }, []);

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('frag_ave_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('frag_ave_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('frag_ave_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('frag_ave_user');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const addToCart = useCallback((productId: string, size: ProductSize, quantity: number = 1) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.productId === productId && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem: CartItem = {
        id: Math.random().toString(36).substr(2, 9),
        productId,
        size,
        quantity,
        priceAtSelection: product.price 
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  }, []);

  const updateCartQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalCartPrice = cart.reduce((total, item) => {
    const p = PRODUCTS.find(prod => prod.id === item.productId);
    return total + (p ? p.price * item.quantity : 0);
  }, 0);

  return (
    <StoreContext.Provider value={{ 
      cart, wishlist, user, addToCart, removeFromCart, 
      updateCartQuantity, toggleWishlist, clearCart, setUser, logout,
      isCartOpen, setIsCartOpen, totalCartPrice
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
