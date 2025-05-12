import React from 'react';
import { motion } from 'framer-motion';

const AboutHeader = () => {
  return (
    <motion.div 
      className="w-full text-center h-auto bg-gradient-to-r from-organic-50 to-organic-100 py-20 md:py-28 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative circles */}
      <div className="absolute top-10 left-20 w-32 h-32 rounded-full bg-organic-200/30 blur-xl"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-organic-300/20 blur-xl"></div>
      
      <motion.h1 
        className="font-serif font-semibold text-4xl md:text-5xl lg:text-6xl text-organic-800 px-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        About Us
      </motion.h1>
      
      <motion.div 
        className="w-24 h-1 bg-organic-400 mx-auto mt-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "6rem" }}
        transition={{ delay: 0.6, duration: 0.4 }}
      ></motion.div>
    </motion.div>
  );
};

export default AboutHeader;