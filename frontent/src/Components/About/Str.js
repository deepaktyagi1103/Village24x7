import React from 'react';
import { motion } from 'framer-motion';
import BlackBerry from '../../assets/blackkberry.jpg';

const FavoriteStore = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Side - Text Content */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-organic-800 mb-6">
              We Are Your Favourite Store!
            </h2>
            
            <div className="w-20 h-1 bg-organic-400 mb-6 rounded-full"></div>
            
            <p className="text-organic-700 leading-relaxed mb-6">
              Welcome to Village 24x7, your go-to hub for authentic village-inspired products and organic food. We bring the purity of rural life to your doorstep with eco-friendly, high-quality items sourced from local farmers and artisans.
            </p>
            
            <p className="text-organic-700 leading-relaxed">
              From farm-fresh produce to handcrafted goods, every product celebrates the richness of rural heritage. Shop wholesome grains, fresh fruits, and unique handmade treasures—connecting you to the heart of the village anytime, anywhere.
            </p>
          </motion.div>
          
          {/* Right Side - Image */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-organic-400 rounded-tl-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-organic-400 rounded-br-xl"></div>
              
              <img 
                src={BlackBerry} 
                alt="Organic Blackberries" 
                className="w-full h-auto rounded-lg shadow-2xl relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteStore;