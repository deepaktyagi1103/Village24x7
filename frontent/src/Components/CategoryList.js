import React, { useEffect, useState, useRef } from 'react';
import SummaryApi from '../common';
import CategoryItem from './CategoryItem';
import CategorySkeleton from './CategorySkeleton';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse?.data || []);
    } catch (err) {
      console.error("Error fetching category products:", err);
      setError("Failed to load categories. Please try again later.");
      setCategoryProduct([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="w-full py-6 px-4 md:px-6 bg-gradient-to-b from-accent/50 to-transparent backdrop-blur-sm animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium animate-fade-in">
            Explore Categories
          </span>
          <h2 className="text-lg md:text-xl font-medium mt-2 text-gray-800 animate-fade-in">
            Browse by Category
          </h2>
        </div>

        <div 
          ref={scrollRef}
          className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none py-4 px-2 -mx-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          {loading ? (
            <CategorySkeleton count={10} />
          ) : error ? (
            <div className="w-full text-center py-4 text-red-500 animate-fade-in">{error}</div>
          ) : categoryProduct.length > 0 ? (
            categoryProduct.map((product, index) => (
              <CategoryItem key={index} product={product} index={index} />
            ))
          ) : (
            <div className="w-full text-center py-4 text-gray-500 animate-fade-in">No categories available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;