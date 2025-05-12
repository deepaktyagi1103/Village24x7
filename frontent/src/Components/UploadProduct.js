import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DisplayImage from './DisplayImage';

interface UploadProductProps {
  onClose: () => void;
  fetchData: () => void;
}

const UploadProduct = ({ onClose, fetchData }: UploadProductProps) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [], // Removed the TypeScript type assertion
    description: "",
    price: "",
    sellingPrice: ""
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }));
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProductImage = (index: number) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.productName || !data.brandName || !data.category || 
        data.productImage.length === 0 || !data.description || 
        !data.price || !data.sellingPrice) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchData();
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      toast.error("Failed to upload product. Please try again.");
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <CgClose className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto p-5 flex-grow">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="productName" 
                placeholder="Enter product name" 
                name="productName"
                value={data.productName} 
                onChange={handleOnChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="brandName" 
                placeholder="Enter brand name" 
                value={data.brandName} 
                name="brandName"
                onChange={handleOnChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select 
                required 
                value={data.category} 
                name="category" 
                onChange={handleOnChange} 
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                <option value="">Select Category</option>
                {productCategory.map((el, index) => (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
                Product Images <span className="text-red-500">*</span>
              </label>
              <label 
                htmlFor="uploadImageInput"
                className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    {isUploading ? "Uploading..." : "Click to upload product images"}
                  </p>
                </div>
                <input 
                  type="file" 
                  id="uploadImageInput" 
                  className="hidden" 
                  onChange={handleUploadProduct}
                  disabled={isUploading}
                />
              </label>
              
              {data.productImage.length > 0 ? (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {data.productImage.map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={img} 
                        alt={`Product image ${index + 1}`} 
                        className="h-20 w-20 object-cover border rounded-lg cursor-pointer hover:shadow-md transition"
                        onClick={() => {
                          setFullScreenImage(img);
                          setOpenFullScreenImage(true);
                        }}
                      />
                      <button
                        type="button" 
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 text-xs mt-1">*Please upload at least one product image</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  id="price" 
                  placeholder="Enter price" 
                  value={data.price} 
                  name="price"
                  onChange={handleOnChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  id="sellingPrice" 
                  placeholder="Enter selling price" 
                  value={data.sellingPrice} 
                  name="sellingPrice"
                  onChange={handleOnChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="description"
                className="w-full p-3 h-32 bg-gray-50 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" 
                placeholder="Enter product description" 
                name="description"
                value={data.description}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Upload Product
              </button>
            </div>
          </form>
        </div>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
// import React, { useState } from 'react'
// import { CgClose } from "react-icons/cg";
// import productCategory from '../helpers/productCategory';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../helpers/uploadImage';
// // import DisplayImage from './DisplayImage';
// import { MdDelete } from "react-icons/md";
// import SummaryApi from '../common';
// import {toast} from 'react-toastify'
// import DisplayImage from './DisplayImage';

// const UploadProduct = ({
//     onClose,
//     fetchData
// }) => {
//   const [data,setData] = useState({
//     productName : "",
//     brandName : "",
//     category : "",
//     productImage : [],
//     description : "",
//     price : "",
//     sellingPrice : ""
//   })
//   const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
//   const [fullScreenImage,setFullScreenImage] = useState("")


//   const handleOnChange = (e)=>{
//       const { name, value} = e.target

//       setData((preve)=>{
//         return{
//           ...preve,
//           [name]  : value
//         }
//       })
//   }

//   const handleUploadProduct = async(e) => {
//     const file = e.target.files[0]
//     const uploadImageCloudinary = await uploadImage(file)

//     setData((preve)=>{
//       return{
//         ...preve,
//         productImage : [ ...preve.productImage, uploadImageCloudinary.url]
//       }
//     })
//   }

//   const handleDeleteProductImage = async(index)=>{
//     console.log("image index",index)
    
//     const newProductImage = [...data.productImage]
//     newProductImage.splice(index,1)

//     setData((preve)=>{
//       return{
//         ...preve,
//         productImage : [...newProductImage]
//       }
//     })
    
//   }


//   // {/**upload product */}
//   const handleSubmit = async(e) =>{
//     e.preventDefault()
//     console.log("data",data)

//     if (!data.productName || !data.brandName || !data.category || data.productImage.length === 0 || !data.description || !data.price || !data.sellingPrice) {
//       toast.error("Please fill in all required fields.");
//       return;
//   }
    
//     const response = await fetch(SummaryApi.uploadProduct.url, {
//       method : SummaryApi.uploadProduct.method,
//       credentials : 'include',
//       headers : {
//         "content-type" : "application/json"
//       },
//       body : JSON.stringify(data)
//     });

//     const responseData = await response.json();

//     if(responseData.success){
//         toast.success(responseData?.message);
//         onClose()
//         fetchData()
//         // fetchData()
//     }


//     else{
//       toast.error(responseData?.message);
//     }
  

//   }

//   return (
//     <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
//        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

//             <div className='flex justify-between items-center pb-3'>
//                 <h2 className='font-bold text-lg'>Upload Product</h2>
//                 <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
//                     <CgClose/>
//                 </div>
//             </div>

//           <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
//             <label htmlFor='productName'>Product Name :</label>
//             <input 
//               type='text' 
//               id='productName' 
//               placeholder='enter product name' 
//               name='productName'
//               value={data.productName} 
//               onChange={handleOnChange}
//               className='p-2 bg-slate-100 border rounded'
//               required
//             />


//             <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
//             <input 
//               type='text' 
//               id='brandName' 
//               placeholder='enter brand name' 
//               value={data.brandName} 
//               name='brandName'
//               onChange={handleOnChange}
//               className='p-2 bg-slate-100 border rounded'
//               required
//             />

//               <label htmlFor='category' className='mt-3'>Category :</label>
//               <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
//                   <option value={""}>Select Category</option>
//                   {
//                     productCategory.map((el,index)=>{
//                       return(
//                         <option value={el.value} key={el.value+index}>{el.label}</option>
//                       )
//                     })
//                   }
//               </select>

//               <label htmlFor='productImage' className='mt-3'>Product Image :</label>
//               <label htmlFor='uploadImageInput'>
//               <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
//                         <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
//                           <span className='text-4xl'><FaCloudUploadAlt/></span>
//                           <p className='text-sm'>Upload Product Image</p>
//                           <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
//                         </div>
//               </div>
//               </label> 
//               <div>
//                   {
//                     data?.productImage[0] ? (
//                         <div className='flex items-center gap-2'>
//                             {
//                               data.productImage.map((el,index)=>{
//                                 return(
//                                   <div className='relative group'>
//                                       <img 
//                                         src={el} 
//                                         alt={el} 
//                                         width={80} 
//                                         height={80}  
//                                         className='bg-slate-100 border cursor-pointer'  
//                                         onClick={()=>{
//                                           setOpenFullScreenImage(true)
//                                           setFullScreenImage(el)
//                                         }}/>

//                                         <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
//                                           <MdDelete/>  
//                                         </div>
//                                   </div>
                                  
//                                 )
//                               })
//                             }
//                         </div>
//                     ) : (
//                       <p className='text-red-600 text-xs'>*Please upload product image</p>
//                     )
//                   }
                  
//               </div>

//               <label htmlFor='price' className='mt-3'>Price :</label>
//               <input 
//                 type='number' 
//                 id='price' 
//                 placeholder='enter price' 
//                 value={data.price} 
//                 name='price'
//                 onChange={handleOnChange}
//                 className='p-2 bg-slate-100 border rounded'
//                 required
//               />


//               <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
//               <input 
//                 type='number' 
//                 id='sellingPrice' 
//                 placeholder='enter selling price' 
//                 value={data.sellingPrice} 
//                 name='sellingPrice'
//                 onChange={handleOnChange}
//                 className='p-2 bg-slate-100 border rounded'
//                 required
//               />

//               <label htmlFor='description' className='mt-3'>Description :</label>
//               <textarea 
//                 className='h-28 bg-slate-100 border resize-none p-1' 
//                 placeholder='enter product description' 
//                 rows={3} 
//                 onChange={handleOnChange} 
//                 name='description'
//                 value={data.description}
//               >
//               </textarea>





//               <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
//           </form> 



      
//        </div>



//        {/***display image full screen */}
//        {
//         openFullScreenImage && (
//           <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
//         )
//        }
        

//     </div>
//   )
// }

// export default UploadProduct