import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, CircleDot, Circle } from 'lucide-react';
import { cn } from "../lib/utils";

const desktopImages = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
];

const mobileImages = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=1080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1080&auto=format&fit=crop"
];

const bannerContent = [
  {
    title: "Welcome to Village 24x7",
    subtitle: "Authentic village-inspired products and organic food at your doorstep",
    cta: "Explore Organic Foods"
  },
  {
    title: "Farm-Fresh Produce",
    subtitle: "Sourced directly from local farmers with sustainable practices",
    cta: "Shop Fresh"
  },
  {
    title: "Handcrafted Treasures",
    subtitle: "Unique artisanal goods celebrating rural heritage and craftsmanship",
    cta: "Discover Handcrafts"
  },
  {
    title: "Pure & Natural",
    subtitle: "Wholesome grains, fresh fruits, and organic products for your wellbeing",
    cta: "Browse Collection"
  },
  {
    title: "Village to Doorstep",
    subtitle: "Connecting you to the heart of the village anytime, anywhere",
    cta: "Learn Our Story"
  }
];

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const bannerRef = useRef(null); // Ensure this is correct if using TypeScript

  const nextImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentImage(prev => (prev < desktopImages.length - 1 ? prev + 1 : 0));
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentImage(prev => (prev > 0 ? prev - 1 : desktopImages.length - 1));
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToImage = (index) => {
    if (isTransitioning || index === currentImage) return;
    
    setIsTransitioning(true);
    setCurrentImage(index);
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 50) { // Swipe threshold
      if (diffX > 0) {
        nextImage(); // Swipe left, go to next
      } else {
        prevImage(); // Swipe right, go to previous
      }
    }
  };

  useEffect(() => {
    startAutoplay();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentImage, isHovering]);

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        nextImage();
      }, 5000);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    startAutoplay();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div 
        ref={bannerRef}
        className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-r from-primary/5 to-transparent"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-56 sm:h-64 md:h-80 lg:h-96 w-full relative overflow-hidden">
          <div className="hidden md:block h-full w-full">
            {desktopImages.map((imageUrl, index) => (
              <div 
                key={`desktop-${index}`}
                className={cn(
                  "absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-out",
                  currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0",
                  currentImage === index ? "translate-x-0" : 
                    index > currentImage ? "translate-x-full" : "translate-x-[-100%]"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-80 mix-blend-overlay z-10"></div>
                <img 
                  src={imageUrl} 
                  alt={`Banner slide ${index + 1}`} 
                  className="w-full h-full object-cover object-center transform transition-transform duration-[8000ms] ease-out hover:scale-105"
                />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-center z-20 p-8 md:p-16">
                  <div className="bg-black/40 backdrop-blur-sm p-4 md:p-6 rounded-xl max-w-xl transform transition-all duration-700 ease-out translate-y-0">
                    <h2 className="text-white text-2xl md:text-4xl font-bold mb-2 animate-fade-in">
                      {bannerContent[index].title}
                    </h2>
                    <p className="text-white/90 md:text-lg mb-4 max-w-md animate-fade-in" style={{animationDelay: "0.1s"}}>
                      {bannerContent[index].subtitle}
                    </p>
                    <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{animationDelay: "0.2s"}}>
                      {bannerContent[index].cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="md:hidden h-full w-full">
            {mobileImages.map((imageUrl, index) => (
              <div 
                key={`mobile-${index}`}
                className={cn(
                  "absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-out",
                  currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0",
                  currentImage === index ? "translate-x-0" : 
                    index > currentImage ? "translate-x-full" : "translate-x-[-100%]"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-80 mix-blend-overlay z-10"></div>
                <img 
                  src={imageUrl} 
                  alt={`Banner slide ${index + 1}`} 
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Mobile content overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-center z-20 p-6">
                  <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl max-w-full w-full transform transition-all duration-700 ease-out translate-y-0">
                    <h2 className="text-white text-xl font-bold mb-1 animate-fade-in">
                      {bannerContent[index].title}
                    </h2>
                    <p className="text-white/90 text-sm mb-2 max-w-full animate-fade-in" style={{animationDelay: "0.1s"}}>
                      {bannerContent[index].subtitle}
                    </p>
                    <button className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-all duration-300 animate-fade-in" style={{animationDelay: "0.2s"}}>
                      {bannerContent[index].cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons with improved styling and animations */}
          <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-6">
            <button 
              onClick={prevImage}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-primary transition-all duration-300",
                "hover:bg-white hover:text-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                "transform translate-y-0 opacity-60 hover:opacity-100",
                isHovering ? "translate-x-0 opacity-80" : "-translate-x-4 opacity-0 md:opacity-60",
                currentImage === 0 ? "cursor-not-allowed opacity-40 hover:opacity-40" : "cursor-pointer"
              )}
              disabled={isTransitioning}
              aria-label="Previous slide"
            >
              <ArrowLeft size={20} className="transform transition-transform group-hover:-translate-x-1" />
            </button>
            
            <button 
              onClick={nextImage}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-primary transition-all duration-300",
                "hover:bg-white hover:text-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                "transform translate-y-0 opacity-60 hover:opacity-100",
                isHovering ? "translate-x-0 opacity-80" : "translate-x-4 opacity-0 md:opacity-60",
                currentImage === desktopImages.length - 1 ? "cursor-not-allowed opacity-40 hover:opacity-40" : "cursor-pointer"
              )}
              disabled={isTransitioning}
              aria-label="Next slide"
            >
              <ArrowRight size={20} className="transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {desktopImages.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => goToImage(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "transition-all duration-300 focus:outline-none",
                  currentImage === index ? "scale-125" : "scale-100 opacity-70 hover:opacity-100"
                )}
              >
                {currentImage === index ? (
                  <CircleDot size={16} className="text-white drop-shadow-md" />
                ) : (
                  <Circle size={12} className="text-white drop-shadow-md" />
                )}
              </button>
            ))}
          </div>
          
          {/* Creative overlay element for visual interest */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;