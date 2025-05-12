import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { cn } from "../lib/utils";

interface ProductCardProps {
  product: any;
  onAddToCart: (e: React.MouseEvent, id: string) => Promise<void>;
  displayINRCurrency: (price: number) => string;
  scrollTop: () => void;
}

const ProductCard = ({ product, onAddToCart, displayINRCurrency, scrollTop }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="relative group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount badge */}
      {product.price > product.sellingPrice && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
          </div>
        </div>
      )}
      
      {/* Product image */}
      <Link 
        to={`/product/${product?._id}`} 
        onClick={scrollTop} 
        className="block relative overflow-hidden bg-accent/30 h-48 flex items-center justify-center"
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-accent animate-pulse-soft"></div>
        )}
        <img 
          src={product.productImage[0]} 
          alt={product.productName} 
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "object-contain h-40 w-auto mx-auto transition-all duration-500",
            isHovered ? "scale-110" : "scale-100",
            !imageLoaded && "opacity-0"
          )} 
        />
        
        {/* Quick view overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="bg-white p-2 rounded-full shadow-lg">
            <Eye className="w-5 h-5 text-primary" />
          </div>
        </div>
      </Link>
      
      {/* Product details */}
      <div className="p-4 space-y-3">
        <Link to={`/product/${product?._id}`} onClick={scrollTop}>
          <h3 className="font-medium text-lg text-gray-800 line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {product?.productName}
          </h3>
        </Link>
        
        <p className="text-sm capitalize text-gray-500">{product?.category}</p>
        
        <div className="flex items-center gap-2">
          <p className="text-primary font-semibold">{displayINRCurrency(product?.sellingPrice)}</p>
          {product.price > product.sellingPrice && (
            <p className="text-gray-400 text-sm line-through">{displayINRCurrency(product?.price)}</p>
          )}
        </div>
        
        <button 
          onClick={(e) => onAddToCart(e, product?._id)}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-full transition-all duration-200 hover:shadow-md group/btn"
        >
          <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;