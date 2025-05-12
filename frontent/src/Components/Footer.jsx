import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, ArrowRight, Send, Smartphone } from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="bg-eco-50 rounded-2xl p-8 mb-12 shadow-sm border border-eco-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Join Our Newsletter</h3>
              <p className="text-gray-600">Stay updated with our latest offers, product announcements and farming tips</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                />
              </div>
              <button className="bg-eco-600 hover:bg-eco-700 text-green-400 font-medium px-6 py-3 rounded-full transition-colors flex items-center justify-center shadow-md shadow-eco-600/20">
                Subscribe <Send size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-medium inline-block">
              Village<span className="text-eco-600">24x7</span>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              At Village 24x7, we bring you the finest organic products straight from farms to your doorstep, committed to promoting sustainable living.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-eco-600 transition-colors bg-white p-2.5 rounded-full shadow-sm border border-gray-100">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-600 transition-colors bg-white p-2.5 rounded-full shadow-sm border border-gray-100">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-600 transition-colors bg-white p-2.5 rounded-full shadow-sm border border-gray-100">
                <Instagram size={18} />
              </a>
            </div>
            <div className="pt-2">
              <div className="flex items-center mb-4 text-gray-600">
                <MapPin size={18} className="text-eco-600 mr-3" />
                <span>123 Organic Street, Green Valley, Nature State 12345</span>
              </div>
              <div className="flex items-center mb-4 text-gray-600">
                <Phone size={18} className="text-eco-600 mr-3" />
                <span>+91 1234 567 890</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="text-eco-600 mr-3" />
                <span>info@village24x7.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 pb-2 border-b border-gray-200">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-6 pb-2 border-b border-gray-200">Product Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/vegetables" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/category/fruits" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/category/dairy-products" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Dairy Products
                </Link>
              </li>
              <li>
                <Link to="/category/oils" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Oils
                </Link>
              </li>
              <li>
                <Link to="/category/dry-fruits" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Dry Fruits
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support & Downloads */}
          <div>
            <h3 className="font-semibold text-lg mb-6 pb-2 border-b border-gray-200">Support & More</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-eco-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-eco-500" />
                  FAQs
                </Link>
              </li>
            </ul>
            
            <h4 className="font-semibold text-base mb-4">Download Our App</h4>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="bg-black text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-900 transition-colors">
                <Smartphone className="mr-2" size={20} />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </a>
              <a href="#" className="bg-black text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-900 transition-colors">
                <Heart className="mr-2" size={20} />
                <div>
                  <div className="text-xs">Download on</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} Village24x7. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              🌱 Freshness Guaranteed
            </span>
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              🌏 Eco-Friendly
            </span>
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
              💚 Your Health, Our Priority
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;