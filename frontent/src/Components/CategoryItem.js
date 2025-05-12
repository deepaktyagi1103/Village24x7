import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "../lib/utils";

interface CategoryItemProps {
  product: {
    category: string;
    productImage: string[];
  };
  index: number;
}

const CategoryItem = ({ product, index }: CategoryItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Link 
      to={`/product-category?category=${product?.category}`} 
      className="category-wrapper flex flex-col items-center group relative px-2"
      style={{ 
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full category-image-wrapper 
                      shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] border border-primary/20
                      overflow-hidden flex items-center justify-center bg-white">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-accent animate-pulse-soft rounded-full" />
          )}
          <img 
            src={product?.productImage[0]} 
            alt={product?.category} 
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "h-full w-full object-cover category-image",
              !imageLoaded && "opacity-0",
              imageLoaded && "animate-scale-in"
            )}
          />
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="relative mt-2 text-center">
        <span className="absolute -top-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <p className="text-center text-xs md:text-sm capitalize font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
          {product?.category}
        </p>
      </div>
    </Link>
  );
};

export default CategoryItem;