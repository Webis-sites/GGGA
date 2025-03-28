'use client';

import { FC, useEffect, useRef } from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: FC<AboutSectionProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simple fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      dir="rtl" 
      className={`py-16 bg-white ${className}`}
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div 
          ref={sectionRef}
          className="max-w-6xl mx-auto transition-all duration-700 opacity-0 translate-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Column */}
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/cafe-interior.jpg" 
                alt="פנים בית הקפה אלפא" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 right-6 bg-white/90 p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-[#FF6B6B]">שנים של ניסיון</p>
                <p className="text-3xl font-bold text-[#D4A5A5]">15+</p>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="space-y-6">
              <div className="inline-block">
                <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-[#FF6B6B] mb-2">אודות בית קפה אלפא</h2>
                <div className="h-1 w-24 bg-[#D4A5A5] rounded-full"></div>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700">
                אנחנו בית קפה מוביל בתחום הבריאות עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-[#FF6B6B]">
                  <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">איכות ללא פשרות</h3>
                  <p className="text-gray-700">אנו בוחרים רק את חומרי הגלם הטובים ביותר לקפה ולמאכלים שלנו.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-[#D4A5A5]">
                  <h3 className="text-xl font-semibold text-[#D4A5A5] mb-2">חדשנות באופנה</h3>
                  <p className="text-gray-700">המקום שלנו משלב את עולם הקפה עם אווירת אופנה עכשווית וייחודית.</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B6B] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">מוצרים אורגניים</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#D4A5A5] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">צוות מקצועי</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B6B] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">אווירה ייחודית</span>
                </div>
              </div>
              
              <button 
                className="mt-8 px-6 py-3 bg-[#FF6B6B] text-white font-medium rounded-lg hover:bg-[#D4A5A5] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-opacity-50"
                aria-label="קרא עוד על בית קפה אלפא"
              >
                קרא עוד עלינו
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;