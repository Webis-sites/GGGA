'use client';

import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsShowcase from '../components/ProductsShowcase';
import ServicesSection from '../components/ServicesSection';
import BookingSystem from '../components/BookingSystem';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import LocationMap from '../components/LocationMap';
import ContactForm from '../components/ContactForm';
import FooterSection from '../components/FooterSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This will be replaced when components are added
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
          <div className="h-4 w-56 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to your new website</h1>
        <p className="text-xl mb-8">
          Start building your site by adding components to this page.
        </p>
      </div>
    
      <HeroSection />
    
      <AboutSection />
    
      <ProductsShowcase />
    
      <ServicesSection />
    
      <BookingSystem />
    
      <TestimonialsCarousel />
    
      <LocationMap />
    
      <ContactForm />
    
      <FooterSection />
    </main>
  );
}