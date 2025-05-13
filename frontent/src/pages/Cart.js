import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { Minus, Plus, Trash, ShoppingCart, ShoppingBag, ArrowRight, Package } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { cn } from "../lib/utils";
import { toast } from 'sonner';

interface CartItem {
  _id: string;
  quantity: number;
  productId: {
    _id: string;
    productName: string;
    category: string;
    price: number;
    sellingPrice: number;
    productImage: string[];
  };
}

const Cart = () => {
    const [data, setData] = useState<CartItem[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(Context);
    
    useEffect(() => {
        const loadCart = async () => {
            setLoading(true);
            try {
                const response = await fetch(SummaryApi.addToCartProductView.url, {
                    method: SummaryApi.addToCartProductView.method,
                    credentials: "include",
                    headers: { "content-type": "application/json" },
                });
                const responseData = await response.json();
                if (responseData.success) {
                    setData(responseData.data);
                }
            } catch (error) {
                console.error("Failed to load cart:", error);
                toast.error("Failed to load your cart. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    const updateQuantity = async (id: string, qty: number, type: "increase" | "decrease") => {
        const newQty = type === "increase" ? qty + 1 : qty - 1;
        if (newQty < 1) return;

        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ _id: id, quantity: newQty }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData((prev) =>
                    prev.map((item) =>
                        item._id === id ? { ...item, quantity: newQty } : item
                    )
                );
                context.fetchUserAddToCart();
                toast.success("Cart updated successfully");
            }
        } catch (error) {
            console.error("Failed to update quantity:", error);
            toast.error("Failed to update quantity. Please try again.");
        }
    };

    const deleteCartProduct = async (id: string) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ _id: id }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData((prev) => prev.filter((item) => item._id !== id));
                context.fetchUserAddToCart();
                toast.success("Item removed from cart");
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
            toast.error("Failed to remove item. Please try again.");
        }
    };

    const loadRazorpay = () =>
        new Promise<boolean>((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    
    const handlePayment = async () => {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            toast.error("Razorpay SDK failed to load");
            return;
        }
    
        try {
            const response = await fetch(SummaryApi.payment.url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: grandTotal })
            });
    
            if (!response.ok) {
                const text = await response.text();
                console.error("Error Response:", text);
                toast.error("Payment initialization failed.");
                return;
            }
    
            const result = await response.json();
    
            if (!result.success || !result.order) {
                toast.error("Payment creation failed");
                return;
            }
    
            const { order } = result;
    
            const options = {
                key: "rzp_test_your_key_here", // Replace with actual key from env
                amount: order.amount,
                currency: order.currency,
                name: "Village 24x7",
                description: "Order Payment",
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const verify = await fetch(SummaryApi.verifyPayment.url, {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                items: data,
                                totalPrice: grandTotal
                            }),
                        });
    
                        const verifyResult = await verify.json();
    
                        if (verifyResult.success) {
                            toast.success("Payment Successful & Verified!");
                            navigate("/success");
                        } else {
                            toast.error("Payment verification failed");
                            navigate("/cancel");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        toast.error("Something went wrong during verification.");
                        navigate("/cancel");
                    }
                },
                prefill: {
                    name: "Customer",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#8B5CF6",
                },
                modal: {
                    ondismiss: function () {
                        toast.warning("Payment cancelled by user");
                        navigate("/cancel");
                    },
                },
            };
    
            // @ts-ignore
            const razorpay = new window.Razorpay(options);
            razorpay.open();
    
        } catch (error) {
            console.error("Payment flow error:", error);
            toast.error("Something went wrong. Please try again.");
            navigate("/cancel");
        }
    };
    
    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = data.reduce(
        (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
        0
    );
    const originalPrice = data.reduce(
        (prev, curr) => prev + curr.quantity * curr?.productId?.price,
        0
    );
    const discountAmount = originalPrice - totalPrice;
    const discountPercentage = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;
    const shippingCharge = totalPrice >= 499 ? 0 : 40;
    const grandTotal = totalPrice + shippingCharge;

    // Cart item loading skeleton
    const CartItemSkeleton = () => (
        <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center gap-4">
                <div className="bg-gray-200 w-24 h-24 rounded-md"></div>
                <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Your Shopping Cart</h1>
                <p className="text-gray-500">{totalQty > 0 ? `You have ${totalQty} item${totalQty > 1 ? 's' : ''} in your cart` : 'Your cart is waiting to be filled'}</p>
            </div>

            {loading ? (
                <div className="space-y-4 max-w-4xl mx-auto">
                    {[1, 2, 3].map(i => <CartItemSkeleton key={i} />)}
                </div>
            ) : (
                <div className="flex flex-col xl:flex-row gap-8">
                    <div className="flex-1">
                        {data.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center">
                                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                                <button
                                    className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 inline-flex items-center"
                                    onClick={() => window.location.href = '/'}
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                                    <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <ShoppingBag size={18} className="text-purple-600" />
                                        Cart Items ({totalQty})
                                    </h2>
                                    <div className="divide-y">
                                        {data.map((product) => (
                                            <div
                                                key={product._id}
                                                className="py-4 first:pt-0 last:pb-0 group"
                                            >
                                                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                                                    <div className="relative bg-gray-50 rounded-lg overflow-hidden w-24 h-24 p-2 group-hover:shadow-md transition-shadow duration-300">
                                                        <img
                                                            src={product?.productId?.productImage[0]}
                                                            alt={product?.productId?.productName}
                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        {product?.productId?.price > product?.productId?.sellingPrice && (
                                                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-md">
                                                                {Math.round((product?.productId?.price - product?.productId?.sellingPrice) / product?.productId?.price * 100)}% OFF
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-gray-800">
                                                            {product?.productId?.productName}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 capitalize">
                                                            {product?.productId?.category}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="font-medium text-purple-700">
                                                                {displayINRCurrency(product?.productId?.sellingPrice)}
                                                            </span>
                                                            {product?.productId?.price > product?.productId?.sellingPrice && (
                                                                <span className="text-sm text-gray-500 line-through">
                                                                    {displayINRCurrency(product?.productId?.price)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center justify-between mt-3">
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => updateQuantity(product._id, product.quantity, "decrease")}
                                                                    className={cn(
                                                                        "p-1.5 border border-gray-300 rounded-l-md hover:bg-gray-100 transition-colors",
                                                                        product.quantity <= 1 && "text-gray-400"
                                                                    )}
                                                                    disabled={product.quantity <= 1}
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className="px-4 py-1 border-t border-b border-gray-300 font-medium text-center min-w-[40px]">
                                                                    {product.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(product._id, product.quantity, "increase")}
                                                                    className="p-1.5 border border-gray-300 rounded-r-md hover:bg-gray-100 transition-colors"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => deleteCartProduct(product._id)}
                                                                className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all"
                                                                title="Remove from cart"
                                                            >
                                                                <Trash size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {data.length > 0 && (
                        <div className="w-full xl:w-80">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h2 className="text-xl font-semibold mb-4 flex items-center border-b pb-3">
                                    <Package size={20} className="mr-2 text-purple-600" />
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Items ({totalQty}):</span>
                                        <span className="font-medium">{displayINRCurrency(originalPrice)}</span>
                                    </div>
                                    
                                    {discountAmount > 0 && (
                                        <div className="flex justify-between py-1 text-green-600">
                                            <span className="flex items-center">
                                                Discount ({discountPercentage}% off):
                                            </span>
                                            <span className="font-medium">-{displayINRCurrency(discountAmount)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">{displayINRCurrency(totalPrice)}</span>
                                    </div>
                                    
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Shipping:</span>
                                        <span className={shippingCharge === 0 ? "text-green-600 font-medium" : ""}>
                                            {shippingCharge === 0 ? "Free" : displayINRCurrency(shippingCharge)}
                                        </span>
                                    </div>
                                    
                                    {shippingCharge > 0 && (
                                        <div className="text-xs text-gray-500 italic mt-1">
                                            Add {displayINRCurrency(499 - totalPrice)} more for free shipping
                                        </div>
                                    )}
                                    
                                    <div className="border-t border-dashed mt-3 pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span className="text-purple-700">{displayINRCurrency(grandTotal)}</span>
                                        </div>
                                        
                                        {discountAmount > 0 && (
                                            <div className="mt-2 bg-green-50 text-green-700 text-xs p-2 rounded text-center">
                                                You saved {displayINRCurrency(discountAmount)} on this order!
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <button
                                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all flex items-center justify-center"
                                    onClick={handlePayment}
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                                
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="text-purple-600 hover:text-purple-800 text-sm flex items-center"
                                    >
                                        <ShoppingBag className="mr-1 h-4 w-4" />
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;