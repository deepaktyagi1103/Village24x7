import React from 'react';
import logoLeaf from '../assets/logo-leaf-new.png';
import organicProductsImg from '../assets/organic-products-hero.png';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-emerald-50 to-green-100 min-h-[600px] md:min-h-[540px] rounded-b-3xl shadow-sm">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-green-200/40 blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-amber-100/50 blur-xl"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-emerald-300/30 blur-lg"></div>
            
            <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center">
                {/* Content section (order reversed on mobile for better UX) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:w-1/2 order-2 md:order-1 z-10 mt-8 md:mt-0"
                >
                    <div className="md:pr-6 max-w-lg">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-6"
                        >
                            <img src={logoLeaf} alt="Leaf Logo" className="h-[60px] w-auto hover:scale-110 transition-all duration-300" />
                        </motion.div>
                        
                        <motion.h5 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-lg font-medium text-emerald-700 mb-2 tracking-wide"
                        >
                            Best Quality Product
                        </motion.h5>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 leading-tight"
                        >
                            Join The <span className="text-green-600">Organic</span> <br /> Movement!
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-gray-600 mb-8 leading-relaxed"
                        >
                            The customer is very important, the customer will be followed by the customer. 
                            As the land of the land, the mourning nor the corporal of the land, the pillow of the lion.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <button className="group flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg px-8 py-3 transition-all duration-300 hover:shadow-green-300/50 hover:scale-105 active:translate-y-1">
                                <span>Shop Now</span>
                                <ShoppingCart className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:rotate-12" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* Image section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2 order-1 md:order-2 flex justify-center items-center z-10"
                >
                    <div className="relative">
                        {/* Circle behind image */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-white/70 blur-sm"></div>
                        
                        <motion.img 
                            initial={{ y: 20 }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 4,
                                ease: "easeInOut" 
                            }}
                            src={organicProductsImg} 
                            alt="Organic Products" 
                            className="relative z-10 h-auto max-w-full md:max-w-[90%] lg:max-w-[80%] drop-shadow-2xl hover:drop-shadow-[0_15px_15px_rgba(34,197,94,0.4)] transition-all duration-500" 
                        />
                        
                        {/* Floating badges */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute top-10 left-0 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100"
                        >
                            <span className="text-green-600 font-medium">100% Organic</span>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute bottom-10 right-0 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100"
                        >
                            <span className="text-green-600 font-medium">Natural</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;