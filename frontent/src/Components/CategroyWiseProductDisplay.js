import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Context from '../context';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import scrollTop from '../helpers/scrollTop';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  
  const { fetchUserAddToCart } = useContext(Context); // Corrected line

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data || []);
    } catch (error) {
      console.error("Error fetching category products:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }
    return 3;
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleProducts = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-full bg-gradient-to-b from-accent/20 to-transparent py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
              Featured Collection
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
              {heading}
            </h2>
          </div>

          {!loading && data.length > itemsPerPage && (
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : data.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                displayINRCurrency={displayINRCurrency}
                scrollTop={scrollTop}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">No products available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;