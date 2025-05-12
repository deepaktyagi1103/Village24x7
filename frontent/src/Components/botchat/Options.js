import React from "react";
import { cn } from "../../lib/utils";

const Options = (props) => {
  const options = [

    { text: "Coffee", icon: "☕", handler: () => props.actionProvider.handleProductInquiry("coffee"), id: 1 },
    { text: "Dairy", icon: "🥛", handler: () => props.actionProvider.handleProductInquiry("dairy products"), id: 2 },
    { text: "Fruits", icon: "🍇", handler: () => props.actionProvider.handleProductInquiry("fruits"), id: 3 },
    { text: "Medicines", icon: "💊", handler: () => props.actionProvider.handleProductInquiry("medicines"), id: 4 },
    { text: "Dry Fruits", icon: "🌰", handler: () => props.actionProvider.handleProductInquiry("dry fruits"), id: 5 },
    { text: "Arts", icon: "🎨", handler: () => props.actionProvider.handleProductInquiry("handmade arts"), id: 6 },
    { text: "Pulses", icon: "🌾", handler: () => props.actionProvider.handleProductInquiry("pulses"), id: 7 },
    { text: "Vegetables", icon: "🥕", handler: () => props.actionProvider.handleProductInquiry("vegetables"), id: 8 },
    { text: "Oils", icon: "🛢️", handler: () => props.actionProvider.handleProductInquiry("oils"), id: 9 },
  ];

  return (
    <div className="px-2 py-3">
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Explore our categories</p>
        <div className="h-[1px] w-16 bg-gradient-to-r from-gray-300 to-transparent"></div>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={option.handler}
            className={cn(
              "group relative px-3 py-2 rounded-lg transition-all duration-300",
              "bg-white border border-gray-100 hover:border-gray-200",
              "shadow-sm hover:shadow-md",
              "flex flex-col items-center justify-center gap-1",
              "transform hover:translate-y-[-2px]"
            )}
          >
            <span className="text-lg">{option.icon}</span>
            <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{option.text}</span>
            <span className="absolute inset-0 bg-gray-50 opacity-0 rounded-lg group-hover:opacity-10 transition-opacity"></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;