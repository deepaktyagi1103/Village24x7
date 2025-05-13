import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

// Helper imports
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import scrollTop from '../helpers/scrollTop';
import Context from '../context';

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  sellingPrice: number;
  productImage: string[];
  description?: string;
}

interface VerticalCardProps {
  loading: boolean;
  data?: Product[];
}

const VerticalCard: React.FC<VerticalCardProps> = ({ loading, data = [] }) => {
  const loadingList = new Array(12).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const getDiscountPercentage = (originalPrice: number, sellingPrice: number) => {
    return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all">
      {loading ? (
        loadingList.map((_, index) => (
          <div 
            key={`loading-${index}`} 
            className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse h-[420px]"
          >
            <div className="h-48 bg-slate-200"></div>
            <div className="p-5 space-y-4">
              <div className="h-5 bg-slate-200 rounded-full w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
              <div className="flex gap-3">
                <div className="h-5 bg-slate-200 rounded-full w-1/3"></div>
                <div className="h-5 bg-slate-200 rounded-full w-1/3"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded-full w-full mt-4"></div>
            </div>
          </div>
        ))
      ) : (
        data.map((product, index) => (
          <div 
            key={`product-${product._id || index}`} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div className="relative">
              <Link 
                to={`/product/${product._id}`} 
                className="block"
                onClick={scrollTop}
              >
                <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 overflow-hidden">
                  <img 
                    src={product.productImage[0]} 
                    alt={product.productName} 
                    className="h-full object-contain mix-blend-multiply hover:scale-110 transition-all duration-500"
                  />
                </div>
              </Link>
              {getDiscountPercentage(product.price, product.sellingPrice) > 15 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {getDiscountPercentage(product.price, product.sellingPrice)}% OFF
                </div>
              )}
            </div>
            
            <div className="p-5 flex-grow flex flex-col">
              <Link 
                to={`/product/${product._id}`} 
                className="block flex-grow" 
                onClick={scrollTop}
              >
                <div className="flex items-center gap-1 mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(120)</span>
                </div>
                
                <h3 className="font-medium text-gray-800 text-ellipsis line-clamp-2 mb-1 hover:text-primary transition-colors">
                  {product.productName}
                </h3>
                
                <p className="text-sm capitalize text-gray-500 mb-auto">
                  {product.category}
                </p>
              </Link>
              
              <div className="mt-3">
                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-lg font-semibold text-emerald-600">
                    {displayINRCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 shadow-sm transition-all duration-300"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VerticalCard;