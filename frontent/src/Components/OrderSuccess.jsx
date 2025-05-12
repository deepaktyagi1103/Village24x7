import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const [orderData, setOrderData] = useState(null);
  
  useEffect(() => {
    // Get order data from localStorage if it exists
    const savedOrderData = localStorage.getItem('lastOrderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
      
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    // Clean up localStorage after reading it
    return () => {
      localStorage.removeItem('lastOrderData');
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <motion.div 
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8">Your order has been placed successfully. Thank you for shopping with us!</p>
        
        {orderData && orderData.coinsEarned > 0 && (
          <motion.div 
            className="mb-8 p-4 bg-green-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">Congratulations!</h2>
            <p className="text-green-600">
              You earned <span className="font-bold">{orderData.coinsEarned} SmartCoins</span> with this purchase.
            </p>
            <p className="text-sm text-green-600 mt-1">
              You now have a total of <span className="font-bold">{orderData.totalCoins} SmartCoins</span> in your account.
            </p>
          </motion.div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/shop">
            <motion.button 
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </Link>
          <Link to="/profile">
            <motion.button 
              className="px-6 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              View My SmartCoins
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;