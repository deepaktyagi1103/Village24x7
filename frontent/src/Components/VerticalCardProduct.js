import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

// Helpers and context
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import scrollTop from '../helpers/scrollTop';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);
  const scrollElement = useRef(null); // ✅ Fixed useRef syntax

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft += 350;
    }
  };

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft -= 350;
    }
  };

  return (
    <div className="container mx-auto px-4 my-12 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-black bg-clip-text text-transparent">
          {heading}
        </h2>
        <div className="flex gap-2">
          <button 
            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-all duration-300 shadow-sm" 
            onClick={scrollLeft}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-all duration-300 shadow-sm" 
            onClick={scrollRight}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-6 snap-x" 
        ref={scrollElement} // ✅ Proper useRef usage
      >
        {loading ? (
          loadingList.map((_, index) => (
            <div 
              key={`loading-${index}`} 
              className="min-w-[280px] md:min-w-[320px] snap-start bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 animate-pulse"
            >
              <div className="h-56 bg-slate-200"></div>
              <div className="p-5 space-y-4">
                <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
                <div className="flex gap-3">
                  <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded-full w-full"></div>
              </div>
            </div>
          ))
        ) : (
          data.map((product, index) => (
            <div 
              key={`product-${product._id || index}`} 
              className="min-w-[280px] md:min-w-[320px] snap-start bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <Link 
                to={`/product/${product._id}`} 
                className="block"
                onClick={scrollTop}
              >
                <div className="h-56 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  <img 
                    src={product.productImage[0]} 
                    alt={product.productName} 
                    className="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
              </Link>
              
              <div className="p-5 space-y-3">
                <Link 
                  to={`/product/${product._id}`} 
                  className="block"
                  onClick={scrollTop}
                >
                  <h3 className="font-medium text-lg text-ellipsis line-clamp-1 text-gray-800 hover:text-primary transition-colors">
                    {product.productName}
                  </h3>
                  <p className="text-sm capitalize text-gray-500 mb-2">
                    {product.category}
                  </p>
                </Link>
                
                <div className="flex items-center gap-3">
                  <p className="text-lg font-semibold text-emerald-600">
                    {displayINRCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {displayINRCurrency(product.price)}
                  </p>
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
                  </span>
                </div>
                
                <button 
                  className="w-full mt-3 bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-primary text-pink-400 py-2.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-md transition-all duration-300"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
