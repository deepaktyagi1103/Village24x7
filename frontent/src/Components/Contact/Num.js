import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactCard = ({ 
  icon, 
  title, 
  line1, 
  line2, 
  bgColor = "bg-green-50",
  iconColor = "text-green-600"
}) => {
  return (
    <div className="w-full md:w-80 h-auto transform transition-all duration-300 hover:translate-y-[-8px] mb-6 md:mb-0">
      <div className={`${bgColor} border border-green-100 rounded-xl shadow-lg p-6 h-full`}>
        <div className={`${iconColor} flex justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-green-800 font-medium text-lg mb-2">{title}</h3>
        <p className="text-gray-600 hover:text-green-700 transition-colors">{line1}</p>
        <p className="text-gray-600 hover:text-green-700 transition-colors">{line2}</p>
      </div>
    </div>
  );
};

const Num = () => {
  return (
    <div className="relative">
      <div className="w-full bg-gradient-to-b from-white to-gray-50 pt-6 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 relative -mt-16 z-20">
          <div className="bg-white rounded-2xl shadow-xl py-8 px-4 md:p-10 relative overflow-hidden">
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-green-800 mb-4">Contact Information</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reach out to us through any of the following channels. We'd love to hear from you!
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-around items-stretch gap-6 relative z-10">
              <ContactCard 
                icon={<Phone size={28} strokeWidth={1.5} className="animate-bounce" />}
                title="Call Us"
                line1="9639316742"
                line2="9911064925"
                bgColor="bg-green-50"
              />
              
              <ContactCard 
                icon={<Mail size={28} strokeWidth={1.5} className="animate-pulse" />}
                title="Email Us"
                line1="infovillage24x7@gmail.com"
                line2="baliyanaman6@gmail.com"
                bgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              
              <ContactCard 
                icon={<MapPin size={28} strokeWidth={1.5} className="animate-bounce" />}
                title="Visit Us"
                line1="128, Gyaspur, Modinagar"
                line2="Ghaziabad, Uttar Pradesh"
                bgColor="bg-amber-50"
                iconColor="text-amber-600"
              />
            </div>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full -ml-12 -mb-12 opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Num;