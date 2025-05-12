import React from 'react';
import { Leaf } from 'lucide-react';

const Design = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-cyan-50 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-green-800 relative inline-block">
              <span className="relative z-10">Frequently Asked Questions</span>
              <span className="absolute bottom-0 left-0 h-3 w-1/2 bg-green-200 opacity-50 -z-0"></span>
            </h2>
            <p className="mt-4 text-green-700 max-w-2xl">
              Find answers to common questions about our products, services, and mission.
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg flex items-center justify-center p-4 animate-[pulse_4s_ease-in-out_infinite]">
              <Leaf className="w-full h-full text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full -mr-20 -mt-20 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-200 rounded-full -ml-10 -mb-10 opacity-20"></div>
    </div>
  );
};

export default Design;