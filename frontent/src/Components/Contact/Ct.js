import React from 'react';

const Ct = () => {
  return (
    <div className="bg-gradient-to-b from-green-100 to-green-50 py-16 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-green-800 mb-6 leading-tight">
            <span className="relative inline-block">
              Get In Touch
              <span className="absolute bottom-2 left-0 w-full h-3 bg-green-200 opacity-40 -z-0"></span>
            </span>
          </h1>
          <p className="text-green-700 max-w-2xl mx-auto text-lg">
            We're here to assist you with any questions or inquiries about our products and services.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-green-200 rounded-full -mr-32 opacity-20"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-green-200 rounded-full -ml-32 opacity-20"></div>
    </div>
  );
};

export default Ct;