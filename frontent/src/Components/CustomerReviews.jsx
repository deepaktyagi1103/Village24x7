import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, StarHalf, ChevronRight, Award, Users, ThumbsUp } from 'lucide-react';
import { cn } from '../lib/utils.js';
import { useToast } from '../hooks/use-toast.js';

interface RatingBarProps {
  stars: number;
  percent: number;
  delay: number;
}

const RatingBar = ({ stars, percent, delay }: RatingBarProps) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percent);
    }, delay);
    return () => clearTimeout(timer);
  }, [percent, delay]);

  return (
    <div className="flex items-center gap-4 mb-2 group">
      <span className="text-sm font-medium w-16 group-hover:text-yellow-500 transition-colors">
        {stars} star{stars !== 1 ? 's' : ''}
      </span>
      <div className="relative h-2.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-sm font-medium w-12 text-right group-hover:font-bold transition-all">
        {width}%
      </span>
    </div>
  );
};

interface LogoProps {
  src: string;
  alt: string;
  index: number;
}

const Logo = ({ src, alt, index }: LogoProps) => {
  const animationDelay = `${index * 0.1}s`;
  
  return (
    <div 
      className="p-2 bg-white/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-white"
      style={{ animationDelay }}
    >
      <div className="h-10 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
    </div>
  );
};

const CustomerReviews = () => {
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  
  // Rating data
  const ratings = [
    { stars: 5, percent: 84 },
    { stars: 4, percent: 9 },
    { stars: 3, percent: 4 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  // Logo placeholders since we don't have the actual logo files
  const logos = [
    { src: '../assets/logo-1.svg', alt: 'Logo 1' },
    { src: '../assets/logo-2.svg', alt: 'Logo 2' },
    { src: '../assets/logo-3.svg', alt: 'Logo 3' },
    { src: '../assets/logo-4.svg', alt: 'Logo 4' },
    { src: '../assets/logo-5.svg', alt: 'Logo 5' },
  ];

  const handleRatingInfoClick = () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      toast({
        title: "Rating Calculation Method",
        description: "Our ratings are calculated based on verified customer reviews, with special weighting for recent purchases.",
      });
    }
  };

  // Statistics
  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "1,240+", label: "Active Users" },
    { icon: <Award className="w-5 h-5" />, value: "98%", label: "Satisfaction" },
    { icon: <ThumbsUp className="w-5 h-5" />, value: "24/7", label: "Support" },
  ];

  return (
    <div className="max-w-2xl mx-auto perspective-1000">
      <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl animate-fade-in hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-2">
            Customer Reviews
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full mb-4"></div>
          
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 mb-2">
                  {stat.icon}
                </div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating summary */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 shadow-inner transform transition-all duration-300 hover:from-gray-100 hover:to-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-1.5 text-yellow-500">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-8 h-8 fill-current" />
              ))}
              <StarHalf className="w-8 h-8 fill-current" />
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold text-gray-800">4.7</div>
              <div className="text-sm text-gray-500">out of 5</div>
            </div>
          </div>
          <p className="text-center text-gray-600 font-medium">
            Based on <span className="font-bold">40</span> customer ratings
          </p>
        </div>

        {/* Rating bars */}
        <div className="space-y-3 mb-6">
          {ratings.map((rating, index) => (
            <RatingBar 
              key={rating.stars} 
              stars={rating.stars} 
              percent={rating.percent} 
              delay={200 + index * 150} 
            />
          ))}
        </div>

        {/* How we calculate */}
        <div className="text-center mb-8">
          <button
            onClick={handleRatingInfoClick}
            className={cn(
              "inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors",
              "relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5",
              "after:bottom-0 after:left-0 after:bg-blue-600 after:origin-bottom-right",
              "after:transition-transform after:duration-300 hover:after:scale-x-100",
              "hover:after:origin-bottom-left"
            )}
          >
            How do we calculate rating?
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Collapsible explanation */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              Our rating system combines weighted averages from verified purchases, with recent reviews having more impact. 
              We verify all ratings to ensure authenticity and filter out potential spam or inappropriate content.
            </p>
          </div>
        </div>

        {/* Logos */}
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-gray-500 mb-4">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center gap-4">
            {logos.map((logo, index) => (
              <Logo key={index} src={logo.src} alt={logo.alt} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;