import React from 'react';
import { motion } from 'framer-motion';
import Basil from '../../assets/basil-leaf.png';

const BasilImage = () => {
    return (
        <motion.div 
            className="flex justify-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.img 
                src={Basil} 
                alt="Basil Leaf" 
                className="h-16 md:h-20 lg:h-24 w-auto -mt-8"
                animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 3, 0, -3, 0]
                }}
                transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

export default BasilImage;