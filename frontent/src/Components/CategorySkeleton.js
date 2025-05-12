import React from 'react';

interface CategorySkeletonProps {
  count?: number;
}

const CategorySkeleton = ({ count = 10 }: CategorySkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center px-2"
          style={{ 
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full relative overflow-hidden bg-accent/50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse-soft"></div>
          </div>
          <div className="mt-2 w-12 h-3 bg-accent/50 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse-soft"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySkeleton;
