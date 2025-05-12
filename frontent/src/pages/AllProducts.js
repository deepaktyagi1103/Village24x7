import React, { useEffect, useState } from 'react';
import UploadProduct from '../Components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../Components/AdminProductCard';
import { Plus, Search, Filter, Package } from "lucide-react"; // Ensure Package is imported

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchAllProduct = async () => {
        try {
            setLoading(true);
            const response = await fetch(SummaryApi.allProduct.url);
            const dataResponse = await response.json();
            const products = dataResponse?.data || [];
            setAllProduct(products);
            setFilteredProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(allProduct);
        } else {
            const filtered = allProduct.filter(product => 
                product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, allProduct]);

    return (
        <div className='space-y-6 animate-slide-up'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>Product Management</h1>
                <button
                    className='btn btn-primary'
                    onClick={() => setOpenUploadProduct(true)}
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Product
                </button>
            </div>

            <div className='bg-white rounded-2xl shadow-sm p-6 space-y-6'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='relative flex-1'>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text"
                            placeholder="Search products..."
                            className="form-input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-secondary'>
                        <Filter className="w-5 h-5 mr-2" />
                        Filters
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full absolute border-4 border-gray-200"></div>
                            <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-primary border-t-transparent"></div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-500 mb-4">{filteredProducts.length} products found</p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {filteredProducts.map((product, index) => (
                                <AdminProductCard 
                                    key={index + "allProduct"} 
                                    data={product} 
                                    fetchdata={fetchAllProduct}
                                />
                            ))}
                        </div>
                        
                        {filteredProducts.length === 0 && !loading && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-1">No products found</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    {searchTerm ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'Add your first product to get started.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {openUploadProduct && (
                <UploadProduct 
                    onClose={() => setOpenUploadProduct(false)} 
                    fetchData={fetchAllProduct}
                />
            )}
        </div>
    );
}

export default AllProducts;