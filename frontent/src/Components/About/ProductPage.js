import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import Certified from '../../assets/certified.png';

const CertifiedProducts = () => {
  const productCategories = [
    "Fresh fruits",
    "Organic vegetables",
    "Natural juices",
    "Handmade products",
    "Wholesome grains"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-organic-50 to-organic-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block"
            >
              <img
                src={Certified}
                alt="Organic Certification"
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6"
              />
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold text-organic-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Certified Products
            </motion.h2>
            
            <motion.div 
              className="w-24 h-1 bg-organic-400 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.3, duration: 0.4 }}
            ></motion.div>
            
            <motion.p 
              className="text-lg text-organic-700 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover high-quality, organic, and eco-friendly products sourced directly from nature. 
              We ensure the best for you and your family's health and wellbeing.
            </motion.p>
            
            <motion.h3 
              className="text-2xl md:text-3xl font-serif text-organic-700 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We Deal With Various Quality Organic Products!
            </motion.h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
            <motion.div 
              className="md:w-1/2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {productCategories.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center mb-6"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-organic-100 flex items-center justify-center mr-4 border border-organic-200">
                    <Check size={20} className="text-organic-600" />
                  </div>
                  <span className="text-lg font-medium text-organic-800">{item}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 border border-organic-100 w-full max-w-md">
                <h3 className="text-2xl font-serif font-semibold text-organic-800 mb-4">Ready to Experience?</h3>
                <p className="text-organic-700 mb-6">
                  Browse our extensive collection of certified organic products and start your journey to a healthier lifestyle today.
                </p>
                <button className="btn-primary w-full flex items-center justify-center space-x-2 group">
                  <span>Start Shopping</span>
                  <ShoppingBag size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertifiedProducts;