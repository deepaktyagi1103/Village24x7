import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../Components/VerticalCard';
import SummaryApi from '../common';
import { Filter, ShoppingBag, ArrowUpDown, SlidersHorizontal, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;

    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }));
  };

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === 'asc') {
      setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName;
      }
      return null;
    }).filter(el => el);

    setFilterCategoryList(arrayOfCategory);

    // Format for URL change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory, navigate]);

  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  const calculateDiscountPercentage = (originalPrice, sellingPrice) => {
    return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
  };

  // Calculate aggregated metrics for display in summary
  const totalItems = data.length;
  const totalSavings = data.reduce((sum, item) => 
    sum + ((item.price - item.sellingPrice) * 1), 0); // assuming quantity 1 for calculation
  const averageDiscount = data.length > 0 
    ? Math.round(data.reduce((sum, item) => 
        sum + calculateDiscountPercentage(item.price, item.sellingPrice), 0) / data.length) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="mb-6 text-center">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Products</h1> */}
        <p className="text-gray-600"><b>Find the perfect items for your needs</b></p>
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden sticky top-0 z-10 bg-white rounded-lg shadow-md p-3 mb-4 flex justify-between items-center">
        <button 
          onClick={toggleMobileFilter}
          className="flex items-center gap-2 text-gray-700 font-medium"
        >
          <Filter size={18} />
          Filters & Sort
        </button>
        <div className="flex items-center gap-2 text-gray-700">
          <ShoppingBag size={18} />
          <span className="font-medium">{totalItems} Products</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 relative">
        {/* Filter sidebar - Mobile */}
        <div 
          className={cn(
            "lg:hidden fixed inset-0 bg-gray-500 bg-opacity-75 z-20 transition-opacity duration-300",
            mobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={toggleMobileFilter}
        ></div>

        <div 
          className={cn(
            "lg:hidden fixed right-0 top-0 bottom-0 w-80 bg-white z-30 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto",
            mobileFilterOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Filters & Sort</h2>
            <button onClick={toggleMobileFilter} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base uppercase font-medium text-gray-700 mb-3 flex items-center gap-2">
              <ArrowUpDown size={16} />
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md">
                <input 
                  type="radio" 
                  name="sortBy" 
                  checked={sortBy === 'asc'} 
                  onChange={handleOnChangeSortBy} 
                  value="asc"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Price - Low to High</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md">
                <input 
                  type="radio" 
                  name="sortBy" 
                  checked={sortBy === 'dsc'} 
                  onChange={handleOnChangeSortBy} 
                  value="dsc"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Price - High to Low</span>
              </label>
            </form>
          </div>

          <div className="p-4">
            <h3 className="text-base uppercase font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Filter size={16} />
              Category
            </h3>
            <form className="text-sm flex flex-col gap-3">
              {productCategory.map((categoryName, index) => (
                <label 
                  key={index}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md"
                >
                  <input 
                    type="checkbox" 
                    name="category" 
                    checked={selectCategory[categoryName?.value] || false} 
                    value={categoryName?.value} 
                    id={`mobile-${categoryName?.value}`} 
                    onChange={handleSelectCategory}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span>{categoryName?.label}</span>
                </label>
              ))}
            </form>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-4">
          <div className="mb-6">
            <h3 className="text-base uppercase font-medium text-gray-700 mb-3 flex items-center gap-2 border-b pb-2 border-gray-200">
              <ArrowUpDown size={16} />
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md">
                <input 
                  type="radio" 
                  name="sortBy" 
                  checked={sortBy === 'asc'} 
                  onChange={handleOnChangeSortBy} 
                  value="asc"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Price - Low to High</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md">
                <input 
                  type="radio" 
                  name="sortBy" 
                  checked={sortBy === 'dsc'} 
                  onChange={handleOnChangeSortBy} 
                  value="dsc"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Price - High to Low</span>
              </label>
            </form>
          </div>

          <div className="mb-6">
            <h3 className="text-base uppercase font-medium text-gray-700 mb-3 flex items-center gap-2 border-b pb-2 border-gray-200">
              <Filter size={16} />
              Category
            </h3>
            <form className="text-sm flex flex-col gap-3">
              {productCategory.map((categoryName, index) => (
                <label 
                  key={index}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md"
                >
                  <input 
                    type="checkbox" 
                    name="category" 
                    checked={selectCategory[categoryName?.value] || false} 
                    value={categoryName?.value} 
                    id={categoryName?.value} 
                    onChange={handleSelectCategory}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span>{categoryName?.label}</span>
                </label>
              ))}
            </form>
          </div>

          {/* Shopping summary card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-base font-medium text-blue-800 mb-3 flex items-center gap-2">
              <ShoppingBag size={16} />
              Shopping Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              {totalItems > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Discount:</span>
                    <span className="font-medium text-green-600">{averageDiscount}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potential Savings:</span>
                    <span className="font-medium text-green-600">₹{totalSavings.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-gray-800 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-blue-600" />
                <span>Search Results: <span className="font-bold">{data.length}</span></span>
              </h2>
              
              {/* Desktop active filters display */}
              <div className="hidden md:flex flex-wrap gap-2">
                {filterCategoryList.map((category, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {category}
                  </span>
                ))}
                {sortBy && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                    {sortBy === 'asc' ? 'Price: Low to High' : 'Price: High to Low'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Products list */}
          <div className="min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : data.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button 
                  onClick={() => setSelectCategory({})} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;