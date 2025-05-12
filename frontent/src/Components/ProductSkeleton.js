import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="bg-accent/30 h-48 flex items-center justify-center">
        <div className="w-40 h-40 bg-accent rounded"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-accent/50 rounded-md w-3/4"></div>
        <div className="h-4 bg-accent/40 rounded-md w-1/2"></div>
        <div className="flex gap-2 items-center">
          <div className="h-5 bg-accent/60 rounded-md w-1/4"></div>
          <div className="h-4 bg-accent/40 rounded-md w-1/4"></div>
        </div>
        <div className="h-10 bg-accent/50 rounded-full w-full"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;