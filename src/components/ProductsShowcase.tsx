'use client';

// ProductsShowcase.tsx
import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Define product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "קפה שחור קלאסי",
    description: "קפה ארומטי עשיר, נטחן טרי מפולים אורגניים",
    price: "₪12",
    image: "/images/black-coffee.jpg",
    category: "משקאות חמים"
  },
  {
    id: 2,
    name: "סלט קינואה בריאות",
    description: "קינואה אורגנית עם ירקות טריים, אבוקדו וטחינה ביתית",
    price: "₪42",
    image: "/images/quinoa-salad.jpg",
    category: "מנות עיקריות"
  },
  {
    id: 3,
    name: "סמוזי ירוק",
    description: "תערובת של תרד, קייל, אננס ובננה עם חלב שקדים",
    price: "₪24",
    image: "/images/green-smoothie.jpg",
    category: "משקאות קרים"
  },
  {
    id: 4,
    name: "טוסט אבוקדו",
    description: "לחם מחמצת עם אבוקדו טרי, ביצה עלומה ומיקרו עשבים",
    price: "₪32",
    image: "/images/avocado-toast.jpg",
    category: "ארוחות בוקר"
  },
  {
    id: 5,
    name: "עוגת גבינה טבעונית",
    description: "עוגת גבינה ללא מוצרי חלב עם בסיס אגוזים ופירות יער",
    price: "₪28",
    image: "/images/vegan-cheesecake.jpg",
    category: "קינוחים"
  },
  {
    id: 6,
    name: "קפוצ'ינו חלב שקדים",
    description: "קפוצ'ינו עשיר עם חלב שקדים וקצף קטיפתי",
    price: "₪16",
    image: "/images/almond-cappuccino.jpg",
    category: "משקאות חמים"
  },
  {
    id: 7,
    name: "כריך אבוקדו וחלומי",
    description: "כריך בלחם מלא עם אבוקדו, גבינת חלומי צלויה וירקות טריים",
    price: "₪38",
    image: "/images/halloumi-sandwich.jpg",
    category: "כריכים"
  },
  {
    id: 8,
    name: "גרנולה ביתית",
    description: "גרנולה ביתית עם יוגורט יווני, פירות טריים ודבש אורגני",
    price: "₪34",
    image: "/images/granola.jpg",
    category: "ארוחות בוקר"
  }
];

// Define filter categories
const categories = ["הכל", ...Array.from(new Set(products.map(product => product.category)))];

const ProductsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter products by category
  const filteredProducts = activeCategory === "הכל" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentSlide(0);
  };

  // Handle slider navigation
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16 rtl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">התפריט שלנו</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            המנות הבריאות והטעימות ביותר, מוכנות בקפידה עם חומרי גלם טריים ואיכותיים
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-[#FF6B6B] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-[#D4A5A5] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 md:hidden">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <span className="text-[#FF6B6B] font-bold">{product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <span className="inline-block px-3 py-1 bg-[#D4A5A5] bg-opacity-20 text-[#FF6B6B] text-xs rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative">
          <div 
            className="overflow-x-auto hide-scrollbar flex gap-6 snap-x snap-mandatory scroll-smooth"
            ref={sliderRef}
          >
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="min-w-[300px] lg:min-w-[350px] flex-shrink-0 snap-start bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 w-full">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="350px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <span className="text-[#FF6B6B] font-bold text-lg">{product.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <span className="inline-block px-3 py-1 bg-[#D4A5A5] bg-opacity-20 text-[#FF6B6B] text-xs rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('right')}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-[#FF6B6B] hover:text-white transition-colors duration-300"
            aria-label="הבא"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('left')}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-[#FF6B6B] hover:text-white transition-colors duration-300"
            aria-label="הקודם"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">מוזמנים לבקר אותנו ולטעום ממגוון המנות הטריות והבריאות שלנו</p>
          <a 
            href="#reservation" 
            className="inline-block px-6 py-3 bg-[#FF6B6B] text-white font-medium rounded-lg hover:bg-[#D4A5A5] transition-colors duration-300"
          >
            הזמינו מקום עכשיו
          </a>
        </div>
      </div>

      {/* Custom styles for hiding scrollbar but allowing scroll functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        .rtl {
          direction: rtl;
        }
      `}</style>
    </section>
  );
};

export default ProductsShowcase;