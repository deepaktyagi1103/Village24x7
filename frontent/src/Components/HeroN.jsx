import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Award, BadgeDollarSign, RefreshCw } from 'lucide-react';

const featureItems = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Above ₹299 Only",
    delay: 0.1
  },
  {
    icon: Award,
    title: "Certified Organic",
    description: "100% Guarantee",
    delay: 0.2
  },
  {
    icon: BadgeDollarSign,
    title: "Huge Savings",
    description: "At Lowest Price",
    delay: 0.3
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "No Question Asked",
    delay: 0.4
  }
];

const Bniche = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black py-10 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-green-500 to-green-300"></div>
      <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-green-500/10 blur-xl"></div>
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-green-500/5 blur-xl"></div>
      
      <motion.div 
        className="flex flex-col md:flex-row justify-center items-center mx-auto max-w-screen-xl gap-4 md:gap-6 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {featureItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm text-center rounded-xl p-6 w-full md:w-64 flex flex-col items-center border border-gray-700/50 shadow-xl"
            variants={itemVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: item.delay }}
          >
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-sm opacity-75"></div>
              <div className="relative bg-gray-800 p-3 rounded-full">
                <item.icon className="text-green-400 w-7 h-7" />
              </div>
            </div>
            <h4 className="text-white font-semibold text-lg mb-1">{item.title}</h4>
            <p className="text-gray-300 text-sm">{item.description}</p>
            
            <motion.div 
              className="w-12 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ delay: item.delay + 0.2, duration: 0.5 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Bniche;