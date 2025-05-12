import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils.js';

import { ShoppingCart } from "lucide-react";

const DiscountBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [discount, setDiscount] = useState(25);
  const [bgColorIndex, setBgColorIndex] = useState(0);
  
  // Array of gradient backgrounds for dynamic effect
  const gradients = [
    "bg-gradient-to-r from-primary/80 to-primary",
    "bg-gradient-to-r from-amber-400 to-orange-500",
    "bg-gradient-to-r from-pink-400 to-rose-500"
  ];
  
  useEffect(() => {
    // Animate in after mounting
    const timer = setTimeout(() => setIsVisible(true), 500);
    
    // Change background color every 8 seconds
    const bgInterval = setInterval(() => {
      setBgColorIndex(prev => (prev + 1) % gradients.length);
    }, 8000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(bgInterval);
    };
  }, []);
  
  return (
    <div className="relative overflow-hidden bg-accent/40 py-6 px-4">
      {/* Decorative elements */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Main banner */}
      <div 
        className={cn(
          "flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto px-6 py-6 md:py-4 rounded-xl md:rounded-full shadow-lg backdrop-blur-sm",
          gradients[bgColorIndex],
          "transition-all duration-700 ease-in-out transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}
      >
        {/* Left side with decorative elements and text */}
        <div className="flex items-center mb-4 md:mb-0">
          <div className="hidden md:flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mr-4">
            <span className="text-white text-2xl font-bold">{discount}%</span>
          </div>
          
          <div className="text-center md:text-left">
            <span className="block text-white/80 text-sm font-medium uppercase tracking-wider animate-pulse-soft">Limited Time Offer</span>
            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">
              Get <span className="md:hidden">{discount}%</span> Off On Your First Purchase!
            </h2>
          </div>
        </div>
        
        {/* Shop now button with hover effects */}
        <button 
          className="group relative overflow-hidden w-full md:w-auto px-8 py-3 bg-white rounded-full text-primary font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
          onClick={() => console.log("Shop now clicked")}
        >
          <span className="relative z-10 flex items-center justify-center">
            Shop Now
            <ShoppingCart className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  );
};

export default DiscountBanner;