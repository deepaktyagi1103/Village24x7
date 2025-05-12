import React, { useState, useEffect } from 'react';
import { Star, UserCircle2, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils.js';
import { motion } from 'framer-motion';

interface TestimonialProps {
  name: string;
  username: string;
  rating: number;
  comment: string;
  index: number;
}

const TestimonialCard = ({ name, username, rating, comment, index }: TestimonialProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Creating a staggered animation effect based on card index
  const animationDelay = `${index * 0.1}s`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 m-3",
        "transform transition-all duration-300",
        "border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
        "hover:-translate-y-2 hover:shadow-xl",
        isHovered ? "z-10" : "z-0"
      )}
      style={{ width: '330px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"></div>
      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10"></div>

      <div className="box-top flex justify-between items-start mb-5 relative z-10">
        <div className="profile flex items-center">
          <div className="profile-img w-14 h-14 rounded-full overflow-hidden mr-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden">
              <UserCircle2 className="w-full h-full text-gray-400 dark:text-gray-600" strokeWidth={1.5} />
            </div>
          </div>
          <div className="name-user flex flex-col">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg">{name}</h4>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{username}</span>
          </div>
        </div>
        <div className="reviews flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-5 h-5 transition-all",
                i < rating 
                  ? "text-yellow-400 dark:text-yellow-300 fill-current" 
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <Quote className="absolute -top-1 -left-1 w-6 h-6 text-gray-200 dark:text-gray-700 opacity-50" />
        <div className="client-comment text-gray-600 dark:text-gray-300 pl-5 pt-2 leading-relaxed">
          <p>{comment}</p>
        </div>
      </div>

      {/* Highlight box that appears on hover */}
      <div 
        className={cn(
          "absolute inset-0 border-2 rounded-xl transition-all duration-500",
          isHovered 
            ? "border-gradient-to-r from-yellow-400 via-orange-500 to-purple-500 opacity-100" 
            : "opacity-0"
        )}
      ></div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  const testimonials = [
    {
      name: "Deepak Tyagi",
      username: "@deepaktyagi",
      rating: 4,
      comment: "🌟 \"Absolutely love the freshness of the products from Village 24x7! It's like having a farmer's market delivered to my doorstep. Highly recommend! 🥦🍎\""
    },
    {
      name: "Aman",
      username: "@aman",
      rating: 5,
      comment: "🌿 \"Finally found a store I can trust for pure organic groceries. The quality and service are top-notch! Thank you, Village 24x7, for making healthy living so easy. 💚\""
    },
    {
      name: "Chitranshu Chauhan",
      username: "@chituu",
      rating: 4,
      comment: "🚛 \"Fast delivery, great packaging, and the fruits taste AMAZING! Village 24x7 is my go-to for all organic essentials. 🌾\""
    },
    {
      name: "Aryan Tyagi",
      username: "@aryantyagi",
      rating: 4,
      comment: "💡 \"The attention to sustainability and freshness is incredible. I've switched entirely to Village 24x7 for my family's groceries, and we couldn't be happier! 🌱🍋\""
    }
  ];

  // For mobile view, show one at a time with controls
  const isMobile = window.innerWidth < 768;
  
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      if (isMobile) {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length, isMobile]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.section 
      id="testimonials" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative w-full py-16 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
          <div className="absolute right-0 bottom-0 h-full w-1/2 bg-gradient-to-l from-yellow-500/20 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="testimonial-heading text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-yellow-500/10 dark:to-orange-500/10 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium tracking-wider uppercase mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Clients</span> Say
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Discover what customers love about our service through their authentic experiences and stories.
          </p>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap justify-center gap-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              name={testimonial.name}
              username={testimonial.username}
              rating={testimonial.rating}
              comment={testimonial.comment}
              index={index}
            />
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden relative">
          <div className="flex justify-center">
            <TestimonialCard 
              name={testimonials[currentIndex].name}
              username={testimonials[currentIndex].username}
              rating={testimonials[currentIndex].rating}
              comment={testimonials[currentIndex].comment}
              index={0}
            />
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center mt-4 gap-3">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex gap-1.5 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoplay(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === index 
                      ? "bg-orange-500 w-6" 
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-10 top-1/4 w-20 h-20 bg-yellow-400 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute right-10 bottom-1/4 w-24 h-24 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </motion.section>
  );
};

export default Testimonials;