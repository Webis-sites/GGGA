import { FC } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  /**
   * Optional custom class name
   */
  className?: string;
}

/**
 * Hero section component for בית קפה אלפא
 * 
 * This component displays a hero section with headline, subheadline,
 * CTA button and a background image of a stylish café interior.
 */
const HeroSection: FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <section 
      dir="rtl"
      className={`relative w-full h-[80vh] min-h-[600px] overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cafe-interior.jpg" // Replace with your actual image path
          alt="בית קפה אלפא - אווירה מעוצבת"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Headline */}
          <h1 
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sans"
          >
            בית קפה מוביל בישראל
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white mb-8 font-light">
            חווית לקוח מושלמת בכל ביקור
          </p>
          
          {/* CTA Button */}
          <button 
            className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4A5A5] focus:ring-opacity-50"
            aria-label="קבע תור עכשיו לבית קפה אלפא"
          >
            קבע תור עכשיו
          </button>
          
          {/* Business Description - Optional */}
          <p className="text-white text-sm mt-12 max-w-xl mx-auto opacity-90">
            אנחנו בית קפה מוביל בתחום הבריאות עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
          </p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#D4A5A5]/30 to-transparent"></div>
    </section>
  );
};

export default HeroSection;