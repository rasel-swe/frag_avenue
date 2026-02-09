
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CreditCard, Truck, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

export const Checkout: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { cart, totalCartPrice, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
        clearCart();
      }, 2500);
    }
  };

  if (step === 4) {
    return (
      <div className="pt-40 pb-20 max-w-lg mx-auto px-6 text-center space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-serif">Thank You</h1>
          <p className="text-sm uppercase tracking-widest text-charcoal/40">Order #FRV-994102 has been received</p>
        </div>
        <p className="text-charcoal/60 leading-relaxed text-sm">Your selection is currently being prepared by our artisans. Our Dhaka concierge will contact you shortly for delivery scheduling.</p>
        <button 
          onClick={onComplete}
          className="bg-charcoal text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-xl"
        >
          Return to House
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 w-full lg:w-[80%] mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Checkout Steps */}
        <div className="flex-1 space-y-12">
          {/* Progress Bar */}
          <div className="flex items-center space-x-4 border-b border-charcoal/5 pb-8">
            {[
              { id: 1, label: 'Concierge Delivery' },
              { id: 2, label: 'Payment Details' },
              { id: 3, label: 'Final Review' }
            ].map((s) => (
              <React.Fragment key={s.id}>
                <div className={`flex items-center space-x-3 ${step === s.id ? 'text-charcoal' : 'text-charcoal/30'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${step === s.id ? 'bg-charcoal text-white border-charcoal' : 'border-current'}`}>
                    {s.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{s.label}</span>
                </div>
                {s.id < 3 && <div className="flex-1 h-px bg-charcoal/10" />}
              </React.Fragment>
            ))}
          </div>

          <div className="animate-fade-in min-h-[400px]">
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Dhaka Delivery Address</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">First Name</label>
                    <input className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all text-sm" />
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Last Name</label>
                    <input className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all text-sm" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Address (Road / House No)</label>
                    <input className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all text-sm" />
                  </div>
                  <div className="space-y-1 col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Area (e.g. Gulshan, Banani)</label>
                    <input className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all text-sm" />
                  </div>
                  <div className="space-y-1 col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Contact Number</label>
                    <input className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all text-sm" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Payment Selection</h2>
                <div className="space-y-6">
                  <div className="border border-gold p-6 bg-gold/5 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="w-6 h-6 text-gold" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest">Premium Card / Local Gateway</p>
                        <p className="text-[10px] text-charcoal/40">Secure encryption provided</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-gold flex items-center justify-center">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Card Number</label>
                      <input placeholder="**** **** **** ****" className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Expiry Date</label>
                        <input placeholder="MM/YY" className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all" />
                      </div>
                       <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">CVC</label>
                        <input placeholder="***" className="w-full bg-ivory border-b border-charcoal/20 py-3 outline-none focus:border-gold transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Final Review</h2>
                <p className="text-sm text-charcoal/60 leading-relaxed">Please review your selections and concierge details before confirming your order. Secured via Dhaka Atelier Concierge.</p>
                <div className="bg-beige/10 border p-6 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-charcoal/40 uppercase tracking-widest">Delivery Context</span>
                        <span className="font-medium">Gulshan 2, Dhaka</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-charcoal/40 uppercase tracking-widest">Payment Method</span>
                        <span className="font-medium">Visa Elite Selection</span>
                    </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-12">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 hover:text-charcoal disabled:opacity-0"
            >
              Previous Step
            </button>
            <button 
              onClick={handleNext}
              className="bg-charcoal text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all flex items-center space-x-4 shadow-xl"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>{step === 3 ? 'Confirm Order' : 'Continue'}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 space-y-8">
          <div className="bg-white shadow-lg p-8 space-y-6">
            <h3 className="text-xl font-serif">Order Summary</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="text-charcoal/60">1x {item.size} Edition</span>
                  <span className="font-semibold">৳{item.priceAtSelection.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-charcoal/10 pt-6 space-y-4">
              <div className="flex justify-between text-xs text-charcoal/40 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-gold font-bold uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between text-lg font-serif">
                <span>Total</span>
                <span>৳{totalCartPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-[10px] text-charcoal/30 uppercase tracking-widest pt-4">
              <Lock className="w-3 h-3" />
              <span>Secure SSL Checkout</span>
            </div>
          </div>
          
          <div className="p-8 border border-gold/10 bg-gold/5 flex items-center space-x-4">
             <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm">
                <Truck className="w-6 h-6 text-gold" />
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Dhaka Premium Express</p>
                <p className="text-[10px] text-charcoal/40">Expected arrival: 24-48 Hours</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
