import React, { useState, useEffect, useCallback } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import DisplayImage from "./DisplayImage";
import { cn } from "../lib/utils";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productData) {
      setData({
        productName: productData?.productName || "",
        brandName: productData?.brandName || "",
        category: productData?.category || "",
        productImage: productData?.productImage || [],
        description: productData?.description || "",
        price: productData?.price || "",
        sellingPrice: productData?.sellingPrice || "",
      });
    }
  }, [productData]);

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProductImage = useCallback((index) => {
    setData((prev) => ({
      ...prev,
      productImage: prev.productImage.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchdata();
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-medium">Edit Product</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 max-h-[calc(85vh-80px)]">
          <div className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                value={data.productName}
                onChange={handleOnChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            {/* Brand Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={data.brandName}
                onChange={handleOnChange}
                placeholder="Enter brand name"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={data.category}
                onChange={handleOnChange}
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              >
                <option value="">Select Category</option>
                {productCategory.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Images</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                <Upload className="w-10 h-10 mb-2 text-gray-500" />
                <span className="text-sm">Click to upload</span>
                <input type="file" className="hidden" onChange={handleUploadProduct} disabled={isLoading} />
              </label>

              {/* Image Preview */}
              {data.productImage.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {data.productImage.map((image, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt="Product"
                        className="w-full h-24 object-cover rounded-lg cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(image);
                        }}
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Selling Price */}
            <div className="grid grid-cols-2 gap-4">
              <input type="number" name="price" value={data.price} onChange={handleOnChange} required placeholder="Price" />
              <input type="number" name="sellingPrice" value={data.sellingPrice} onChange={handleOnChange} required placeholder="Selling Price" />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>

      {openFullScreenImage && <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />}
    </div>
  );
};

export default AdminEditProduct;
