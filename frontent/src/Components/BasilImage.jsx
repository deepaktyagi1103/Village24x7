import React from 'react';
import Basil from '../assets/basil-leaf.png'; // Ensure this path is correct

const BasilImage = () => {
    return (
        <div className="flex justify-center basil"> {/* Added basil class for potential custom styles */}
            <img 
                src={Basil} 
                alt="Basil Leaf" 
                className="h-16 md:h-20 lg:h-24 w-auto -mb-10" 
            />
        </div>
    );
};

export default BasilImage;