import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              {/* Copyright section */}
              <div className="relative group">
                <span className="text-gray-600 dark:text-gray-300 font-light text-sm tracking-wide">
                  Copyright © {new Date().getFullYear()}{' '}
                  <Link 
                    to="#" 
                    className="relative inline-block text-gray-800 dark:text-white font-medium 
                    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                    after:bottom-0 after:left-0 after:bg-gray-800 dark:after:bg-white 
                    after:origin-bottom-right after:transition-transform after:duration-300 
                    hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    Village 24x7
                  </Link>
                </span>
              </div>
              
              {/* Social icons */}
              <div className="flex space-x-5">
                <SocialIcon to="#" icon={<Facebook size={18} />} label="Facebook" />
                <SocialIcon to="#" icon={<Twitter size={18} />} label="Twitter" />
                <SocialIcon to="https://www.instagram.com/village24x7/" icon={<Instagram size={18} />} label="Instagram" />
                <SocialIcon to="#" icon={<Linkedin size={18} />} label="LinkedIn" />
                <SocialIcon to="https://www.youtube.com/channel/UCPj_ppblfhDPIgDcVZv3Rhw" icon={<Youtube size={18} />} label="YouTube" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social icon component with beautiful hover animation
const SocialIcon = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <Link
    to={to}
    aria-label={label}
    className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 
    text-gray-600 dark:text-gray-400 transition-all duration-300 
    hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white 
    hover:scale-110 hover:shadow-lg"
  >
    <span className="transform transition-transform duration-300 group-hover:-translate-y-px">
      {icon}
    </span>
    <span className="absolute -bottom-8 scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 text-xs text-gray-600 dark:text-gray-400 font-light">
      {label}
    </span>
  </Link>
);

export default Footer;