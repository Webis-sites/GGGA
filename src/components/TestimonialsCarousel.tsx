'use client';

// TestimonialsCarousel.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

// Define types for testimonial data
interface Testimonial {
  id: number;
  name: string;
  quote: string;
  rating: number;
  image?: string;
}

interface TestimonialsCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}) => {
  // Sample testimonial data in Hebrew
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'שרה כהן',
      quote: 'הקפה הטוב ביותר שטעמתי! האווירה מדהימה והשירות מעולה. אני מגיעה לכאן כל בוקר לפני העבודה.',
      rating: 5,
      image: '/testimonials/person1.jpg',
    },
    {
      id: 2,
      name: 'דוד לוי',
      quote: 'המאפים הטריים והקפה האיכותי הפכו את בית הקפה אלפא למקום המועדף עליי לפגישות עסקיות. העיצוב האופנתי מוסיף המון לחוויה.',
      rating: 5,
      image: '/testimonials/person2.jpg',
    },
    {
      id: 3,
      name: 'מיכל ברקוביץ',
      quote: 'אני מתה על המקום הזה! התפריט המגוון והאווירה הנעימה הופכים כל ביקור לחוויה מיוחדת. הצוות תמיד אדיב ומקצועי.',
      rating: 4,
      image: '/testimonials/person3.jpg',
    },
    {
      id: 4,
      name: 'יוסי אברהם',
      quote: 'בית קפה אלפא הוא פנינה אמיתית! השילוב של אופנה וקפה איכותי יוצר אווירה ייחודית שלא תמצאו בשום מקום אחר.',
      rating: 5,
      image: '/testimonials/person4.jpg',
    },
    {
      id: 5,
      name: 'רונית שמעוני',
      quote: 'המקום המושלם לשבת עם חברות! העיצוב המודרני והקפה המשובח הופכים כל מפגש למיוחד. ממליצה בחום!',
      rating: 5,
      image: '/testimonials/person5.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex justify-center mt-2 mb-4" dir="ltr">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  // Handle next slide
  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
      setTimeout(() => setIsAnimating(false), 500); // Match this with the transition duration
    }
  }, [isAnimating, testimonials.length]);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
      setTimeout(() => setIsAnimating(false), 500); // Match this with the transition duration
    }
  }, [isAnimating, testimonials.length]);

  // Set up autoplay
  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(nextSlide, autoPlayInterval);
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Reset timer when manually changing slides
  const resetAutoPlayTimer = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = setInterval(nextSlide, autoPlayInterval);
    }
  };

  // Handle manual navigation with reset timer
  const handlePrev = () => {
    prevSlide();
    resetAutoPlayTimer();
  };

  const handleNext = () => {
    nextSlide();
    resetAutoPlayTimer();
  };

  // Calculate visible testimonials (current, previous, and next)
  const visibleTestimonials = [
    testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  return (
    <section 
      className={`w-full py-12 bg-white overflow-hidden ${className}`}
      dir="rtl"
      aria-label="חוות דעת לקוחות"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          מה הלקוחות שלנו אומרים
        </h2>
        
        {/* Testimonials carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Carousel container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${currentIndex * 100}%)` }}
            >
              {/* Main visible testimonial */}
              <div className="w-full flex-shrink-0 px-4">
                <div 
                  className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-2 border-[#D4A5A5] transition-all duration-300 hover:shadow-xl"
                  style={{ backgroundColor: 'rgba(255, 107, 107, 0.05)' }}
                >
                  <div className="flex flex-col items-center">
                    {testimonials[currentIndex].image && (
                      <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-[#FF6B6B]">
                        <div className="relative w-full h-full">
                          <Image 
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        </div>
                      </div>
                    )}
                    
                    <StarRating rating={testimonials[currentIndex].rating} />
                    
                    <blockquote className="text-center">
                      <p className="text-lg md:text-xl mb-4 text-gray-700 leading-relaxed">
                        "{testimonials[currentIndex].quote}"
                      </p>
                      <footer className="text-[#FF6B6B] font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  resetAutoPlayTimer();
                }}
                className={`mx-1 w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${
                  index === currentIndex ? 'bg-[#FF6B6B]' : 'bg-[#D4A5A5]'
                }`}
                aria-label={`עבור לחוות דעת ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] hover:bg-gray-50 transition-colors"
            aria-label="חוות דעת קודמת"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] hover:bg-gray-50 transition-colors"
            aria-label="חוות דעת הבאה"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;