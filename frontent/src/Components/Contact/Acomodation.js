import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from "../../lib/utils";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "How does Village 24x7 ensure the quality of its products?",
      answer: "We prioritize high-quality, natural, and eco-friendly products sourced directly from villages. Our team works closely with local farmers and artisans to ensure that every item meets our strict standards for freshness, purity, and authenticity."
    },
    {
      question: "Does Village 24x7 support local farmers and artisans?",
      answer: "Yes, supporting local farmers and artisans is at the core of our mission. By sourcing directly from villages, we help empower rural communities and promote traditional craftsmanship, bringing their unique offerings to a wider audience."
    },
    {
      question: "Can I order Village 24x7 products online and get them delivered to my home?",
      answer: "Absolutely! Village 24x7 makes it easy to connect with the heart of the village anytime, anywhere. You can browse our selection of organic and handcrafted products online, place an order, and have them delivered right to your doorstep."
    },
    {
      question: "Are the products from Village 24x7 eco-friendly and sustainable?",
      answer: "Yes, all our products are carefully selected to ensure they are eco-friendly and sustainable. We focus on natural, chemical-free items that promote healthy living and minimize environmental impact, aligning with our commitment to purity and sustainability."
    },
    {
      question: "What makes Village 24x7's organic products different from others?",
      answer: "Our organic products are sourced directly from villages, ensuring they are fresh, natural, and free from harmful chemicals. We prioritize traditional farming practices and quality, providing you with products that promote healthy living and preserve rural authenticity."
    },
    {
      question: "Does Village 24x7 offer handcrafted goods as well as food items?",
      answer: "Yes, along with organic food items, we offer a variety of handcrafted goods that showcase traditional craftsmanship. These unique, eco-friendly items reflect the beauty and heritage of rural life, adding a touch of authenticity to your home."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((item, index) => (
            <li 
              key={index} 
              className={cn(
                "bg-white border border-green-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300",
                "transform hover:translate-y-[-5px]"
              )}
            >
              <button
                className="w-full text-left flex justify-between items-center p-5 cursor-pointer bg-gradient-to-r from-green-50 to-transparent"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="font-medium text-green-800 pr-8">{item.question}</h3>
                <span className="text-green-600 flex-shrink-0">
                  {openIndex === index ? 
                    <Minus className="h-5 w-5" /> : 
                    <Plus className="h-5 w-5 animate-pulse" />
                  }
                </span>
              </button>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-5 pt-0 border-t border-green-50">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;