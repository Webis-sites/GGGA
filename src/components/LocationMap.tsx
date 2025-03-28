'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaClock, FaPhone, FaEnvelope, FaMapMarkerAlt, FaDirections } from 'react-icons/fa';

// Define types for the component props
interface LocationMapProps {
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    day: string;
    hours: string;
  }[];
  images: {
    src: string;
    alt: string;
  }[];
}

const LocationMap: React.FC<LocationMapProps> = ({
  address = 'רחוב הרצל 123, תל אביב',
  phone = '03-1234567',
  email = 'info@alphacafe.co.il',
  coordinates = { lat: 32.0853, lng: 34.7818 }, // Tel Aviv coordinates
  hours = [
    { day: 'ראשון - חמישי', hours: '08:00 - 22:00' },
    { day: 'שישי', hours: '08:00 - 15:00' },
    { day: 'שבת', hours: 'סגור' },
  ],
  images = [
    { src: '/images/cafe-exterior-1.jpg', alt: 'חזית בית הקפה' },
    { src: '/images/cafe-interior-1.jpg', alt: 'חלל הישיבה הפנימי' },
    { src: '/images/cafe-exterior-2.jpg', alt: 'אזור הישיבה החיצוני' },
  ],
}) => {
  const [activeImage, setActiveImage] = useState(0);

  // Function to generate Google Maps URL for directions
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  };

  // Function to handle image gallery navigation
  const navigateGallery = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <section 
      className="w-full py-12 bg-white font-sans dir-rtl" 
      dir="rtl"
      aria-labelledby="location-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          id="location-heading" 
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
        >
          המיקום שלנו
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information and Hours */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#FF6B6B]">
            <h3 className="text-2xl font-bold mb-6 text-[#FF6B6B]">בית קפה אלפא</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#FF6B6B] flex-shrink-0" />
                <p className="text-gray-700">{address}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#FF6B6B] flex-shrink-0" />
                <p className="text-gray-700 hover:text-[#FF6B6B] transition-colors">
                  <a href={`tel:${phone.replace(/-/g, '')}`} aria-label="מספר טלפון">
                    {phone}
                  </a>
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#FF6B6B] flex-shrink-0" />
                <p className="text-gray-700 hover:text-[#FF6B6B] transition-colors">
                  <a href={`mailto:${email}`} aria-label="כתובת אימייל">
                    {email}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
                <FaClock className="text-[#FF6B6B]" />
                <span>שעות פעילות</span>
              </h4>
              
              <ul className="space-y-2">
                {hours.map((item, index) => (
                  <li key={index} className="flex justify-between text-gray-700">
                    <span className="font-medium">{item.day}</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <a 
                href={getDirectionsUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#e05e5e] text-white py-2 px-4 rounded-md transition-colors duration-300"
                aria-label="קבל הוראות הגעה"
              >
                <FaDirections />
                <span>קבל הוראות הגעה</span>
              </a>
            </div>
          </div>
          
          {/* Map and Gallery */}
          <div className="space-y-8">
            {/* Interactive Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-[300px] md:h-[400px] relative">
              <iframe
                title="מפת מיקום בית הקפה"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${coordinates.lat},${coordinates.lng}&language=iw`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="מפת גוגל מציגה את מיקום בית הקפה"
              ></iframe>
              
              {/* Fallback for when iframe might not load */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0">
                <p className="text-gray-500">טוען מפה...</p>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-[250px] md:h-[300px]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === activeImage ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                
                {/* Gallery Navigation */}
                <button
                  onClick={() => navigateGallery('prev')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  aria-label="תמונה קודמת"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateGallery('next')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  aria-label="תמונה הבאה"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex p-2 gap-2 bg-[#D4A5A5]/10">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-16 flex-1 overflow-hidden rounded ${
                      index === activeImage ? 'ring-2 ring-[#FF6B6B]' : 'opacity-70'
                    }`}
                    aria-label={`צפה בתמונה: ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 33vw, 10vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;