import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import axios from "axios";


const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);

    useEffect(() => {
        const loadCart = async () => {
            setLoading(true);
            try {
                const response = await fetch(SummaryApi.addToCartProductView.url, {
                    method: SummaryApi.addToCartProductView.method,
                    credentials: 'include',
                    headers: { 'content-type': 'application/json' },
                });
                const responseData = await response.json();
                if (responseData.success) {
                    setData(responseData.data);
                }
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    const updateQuantity = async (id, qty, type) => {
        const newQty = type === 'increase' ? qty + 1 : qty - 1;
        if (newQty < 1) return;

        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ _id: id, quantity: newQty }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            setData(prev => prev.map(item => item._id === id ? { ...item, quantity: newQty } : item));
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ _id: id }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            setData(prev => prev.filter(item => item._id !== id));
            context.fetchUserAddToCart();
        }
    };
    const loadRazorpay = () =>
        new Promise((resolve) => {
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
        const handlePayment = async (amount) => {
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
        
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/payment/order`,
                    { amount: amount, currency: "INR" }
                );
        
                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
                    amount: data.amount,
                    currency: data.currency,
                    name: "My E-commerce",
                    description: "Test Transaction",
                    order_id: data.id,
                    handler: async function (response) {
                        const verifyRes = await axios.post(
                            `${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        );
        
                        if (verifyRes.data.message === "Payment successful") {
                            alert("Payment Successful!");
                        } else {
                            alert("Payment Verification Failed!");
                        }
                    },
                    prefill: {
                        name: "Deepak Tyagi",
                        email: "tyagideepak2004@gmail.com",
                        contact: "9639316742",
                    },
                    theme: { color: "#3399cc" },
                };
        
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } catch (error) {
                console.error("Payment Failed", error);
            }
        };
        
    

    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);
    const shippingCharge = totalPrice >= 499 ? 0 : 40;

    return (
        <div className='container mx-auto p-5'>
            <h1 className='text-2xl font-bold text-center mb-5'>Shopping Cart</h1>
            <div className='flex flex-col lg:flex-row gap-6'>

                {/* Cart Items */}
                <div className='w-full max-w-3xl space-y-4'>
                    {loading ? (
                        <p className='text-center'>Loading...</p>
                    ) : data.length === 0 ? (
                        <p className='text-center text-lg'>Your cart is empty</p>
                    ) : (
                        data.map((product) => (
                            <div key={product._id} className='bg-white p-4 rounded-lg shadow-md flex items-center gap-4'>
                                <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className='w-24 h-24 object-contain rounded-md' />
                                <div className='flex-1'>
                                    <h2 className='text-lg font-semibold'>{product?.productId?.productName}</h2>
                                    <p className='text-sm text-gray-500'>{product?.productId?.category}</p>
                                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                    <div className='flex items-center gap-2 mt-2'>
                                        <button onClick={() => updateQuantity(product._id, product.quantity, 'decrease')} className='p-1 bg-red-500 text-white rounded'><AiOutlineMinus /></button>
                                        <span className='text-lg'>{product.quantity}</span>
                                        <button onClick={() => updateQuantity(product._id, product.quantity, 'increase')} className='p-1 bg-green-500 text-white rounded'><AiOutlinePlus /></button>
                                    </div>
                                </div>
                                <button onClick={() => deleteCartProduct(product._id)} className='text-red-600 hover:bg-red-100 p-2 rounded-full'>
                                    <MdDelete size={24} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Cart Summary */}
                {data.length > 0 && (
                    <div className='w-full max-w-sm bg-white p-5 rounded-lg shadow-lg'>
                        <h2 className='text-xl font-semibold mb-3'>Order Summary</h2>

                        {/* Order Details */}
                        <div className='mb-3 border-b pb-2'>
                            {data.map((product) => {
                                const { productName, sellingPrice, price } = product?.productId || {};
                                const quantity = product.quantity;
                                const itemTotal = sellingPrice * quantity;
                                const discount = (price - sellingPrice) * quantity;
                                const grandTotal = totalPrice + shippingCharge;

                                return (
                                    <div key={product._id} className='flex flex-col gap-1 border-b py-2'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-sm font-medium'>{productName} (x{quantity})</span>
                                            <span className='text-sm text-gray-700'>{displayINRCurrency(itemTotal)}</span>
                                        </div>
                                        <div className='text-xs text-gray-500 flex justify-between'>
                                            <span>Price: {displayINRCurrency(sellingPrice)}</span>
                                            {discount > 0 && <span className='text-red-500'>Discount: -{displayINRCurrency(discount)}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Discount Applied */}
                        <div className='flex justify-between text-lg font-semibold text-green-600'>
                            <span>Discount Applied:</span>
                            <span>-{displayINRCurrency(data.reduce((prev, curr) => prev + ((curr.productId.price - curr.productId.sellingPrice) * curr.quantity), 0))}</span>
                        </div>

                        {/* Shipping Charges */}
                        <div className={`flex justify-between text-lg font-semibold ${shippingCharge === 0 ? 'text-green-600' : 'text-gray-600'}`}>
                            <span>Shipping:</span>
                            {shippingCharge === 0 ? <span className='text-green-500'>Free (Above ₹499)</span> : <span>{displayINRCurrency(shippingCharge)}</span>}
                        </div>

                        {/* Grand Total */}
                        <div className='flex justify-between text-xl font-bold border-t pt-3 mt-3'>
                            <span>Grand Total:</span>
                            <span className='text-red-600'>{displayINRCurrency(totalPrice + shippingCharge)}</span>
                        </div>

                        <button className="bg-blue-600 text-white w-full py-2 mt-4 rounded-lg hover:bg-blue-700"
    onClick={() => handlePayment()}>
    Proceed to Checkout
</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
