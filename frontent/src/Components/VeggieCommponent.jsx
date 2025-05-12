import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShoppingCart, Truck, Heart } from 'lucide-react';

const VeggieComponent = () => {
    const boxVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <div className="w-full py-16 overflow-hidden bg-gradient-to-br from-stone-100 via-emerald-50 to-green-100">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-800"
                >
                    Why Choose <span className="text-green-600">Organic</span>?
                </motion.h2>
                
                {/* Box Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Box 1 */}
                    <motion.div 
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={boxVariants}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-green-200/50 transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-600"></div>
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Leaf className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                                Fresh & Organic Products
                            </h3>
                            <p className="text-center text-gray-600 mb-6 flex-grow">
                                We source the freshest and most natural organic products directly from trusted farms
                            </p>
                            <div className="mt-auto pt-4 flex justify-center">
                                <button className="group flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg px-6 py-2.5 transition-all duration-300 hover:shadow-green-300/50 hover:scale-105 active:translate-y-1">
                                    <span>Shop Now</span>
                                    <ShoppingCart className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-12" />
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 right-0 w-28 h-28 bg-green-100/30 rounded-full -mr-14 -mb-14 z-0"></div>
                    </motion.div>
                    
                    {/* Box 2 */}
                    <motion.div 
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={boxVariants}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-green-200/50 transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-600"></div>
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Truck className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                                Farm-to-Door Convenience
                            </h3>
                            <p className="text-center text-gray-600 mb-6 flex-grow">
                                Enjoy 24x7 access to fresh, healthy, and organic products.
                                Hassle-free doorstep delivery
                            </p>
                            <div className="mt-auto pt-4 flex justify-center">
                                <button className="group flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg px-6 py-2.5 transition-all duration-300 hover:shadow-green-300/50 hover:scale-105 active:translate-y-1">
                                    <span>Shop Now</span>
                                    <ShoppingCart className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-12" />
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 right-0 w-28 h-28 bg-green-100/30 rounded-full -mr-14 -mb-14 z-0"></div>
                    </motion.div>
                    
                    {/* Box 3 */}
                    <motion.div 
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={boxVariants}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-green-200/50 transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-600"></div>
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Heart className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                                Health & Wellness First
                            </h3>
                            <p className="text-center text-gray-600 mb-6 flex-grow">
                                Your health is our priority. We deliver nothing but the best to nourish your body and mind.
                            </p>
                            <div className="mt-auto pt-4 flex justify-center">
                                <button className="group flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg px-6 py-2.5 transition-all duration-300 hover:shadow-green-300/50 hover:scale-105 active:translate-y-1">
                                    <span>Shop Now</span>
                                    <ShoppingCart className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-12" />
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 right-0 w-28 h-28 bg-green-100/30 rounded-full -mr-14 -mb-14 z-0"></div>
                    </motion.div>
                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-green-200/40 blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-amber-100/50 blur-xl"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-emerald-300/30 blur-lg"></div>
        </div>
    );
};

export default VeggieComponent;