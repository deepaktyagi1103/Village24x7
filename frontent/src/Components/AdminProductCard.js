// import React, { useState } from 'react';
// import { MdModeEditOutline } from 'react-icons/md';
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';

// const AdminProductCard = ({ data, fetchdata }) => {
//     const [editProduct, setEditProduct] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <div 
//             className='bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             <div className='p-4 space-y-4'>
//                 <div className='relative aspect-square rounded-lg overflow-hidden bg-gray-50'>
//                     <img 
//                         src={data?.productImage[0]} 
//                         alt={data.productName}
//                         className={`w-full h-full object-cover transition-all duration-500 ${
//                             isHovered ? 'scale-110 blur-[2px]' : 'scale-100'
//                         }`}
//                     />
//                     <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
//                         isHovered ? 'opacity-100' : 'opacity-0'
//                     }`} />
//                 </div>

//                 <div className='space-y-3'>
//                     <h3 className='font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-purple-600 transition-colors'>
//                         {data.productName}
//                     </h3>
                    
//                     <div className='flex items-center justify-between'>
//                         <p className='text-lg font-bold text-purple-600'>
//                             {displayINRCurrency(data.sellingPrice)}
//                         </p>
//                         <button
//                             onClick={() => setEditProduct(true)}
//                             className='p-2 text-purple-500 hover:text-white hover:bg-purple-500 rounded-full transition-all duration-300 transform hover:rotate-12'
//                         >
//                             <MdModeEditOutline size={20} />
//                         </button>
//                     </div>

//                     <div className='text-sm text-gray-500'>
//                         Brand: <span className='font-medium text-gray-700'>{data.brandName}</span>
//                     </div>
//                 </div>
//             </div>

//             {editProduct && (
//                 <AdminEditProduct 
//                     productData={data} 
//                     onClose={() => setEditProduct(false)} 
//                     fetchdata={fetchdata} 
//                 />
//             )}
//         </div>
//     );
// }

// export default AdminProductCard;

import React, { useState } from 'react';
import { Edit2, MoreHorizontal, ExternalLink, Eye } from 'lucide-react';
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    return (
        <div 
            className="product-card hover-scale"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowMenu(false);
            }}
        >
            <div className="relative group overflow-hidden">
                <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                    <img 
                        src={data?.productImage[0]} 
                        alt={data.productName}
                        className={`product-card-image ${isHovered ? 'scale-110 filter brightness-90' : ''}`}
                        loading="lazy"
                    />
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setEditProduct(true)}
                            className="btn btn-primary btn-icon text-sm px-3 py-1.5"
                        >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                        </button>
                        
                        <button
                            onClick={toggleMenu}
                            className="btn btn-icon bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                {showMenu && (
                    <div className="absolute top-12 right-4 bg-white rounded-lg shadow-lg py-1 min-w-36 z-10 animate-fade-in">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                        </button>
                    </div>
                )}
            </div>
            
            <div className="product-card-content">
                <div className="flex items-center mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {data.category}
                    </span>
                </div>
                
                <h3 className="product-card-title">
                    {data.productName}
                </h3>
                
                <div className="flex items-center justify-between">
                    <div>
                        <p className="product-card-price">
                            {displayINRCurrency(data.sellingPrice)}
                        </p>
                        {data.price > data.sellingPrice && (
                            <p className="text-sm text-gray-500 line-through">
                                {displayINRCurrency(data.price)}
                            </p>
                        )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">{data.brandName}</span>
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)} 
                    fetchdata={fetchdata} 
                />
            )}
        </div>
    );
}

export default AdminProductCard;