'use client';

// FooterSection.tsx
import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface SocialLink {
  id: number;
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

interface FooterLink {
  id: number;
  title: string;
  href: string;
}

const FooterSection: React.FC = () => {
  // Footer navigation links
  const footerLinks: FooterLink[] = [
    { id: 1, title: 'דף הבית', href: '/' },
    { id: 2, title: 'תפריט', href: '/menu' },
    { id: 3, title: 'אודות', href: '/about' },
    { id: 4, title: 'אירועים', href: '/events' },
    { id: 5, title: 'צור קשר', href: '/contact' },
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    { id: 1, icon: <FaFacebook />, href: 'https://facebook.com', ariaLabel: 'פייסבוק' },
    { id: 2, icon: <FaInstagram />, href: 'https://instagram.com', ariaLabel: 'אינסטגרם' },
    { id: 3, icon: <FaTwitter />, href: 'https://twitter.com', ariaLabel: 'טוויטר' },
  ];

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    console.log('Newsletter form submitted');
  };

  return (
    <footer className="bg-gray-100 text-right" dir="rtl">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-[#FF6B6B] mb-4">בית קפה אלפא</h2>
            <p className="text-gray-600 mb-4">
              אנחנו בית קפה מוביל בתחום הבריאות עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-[#FF6B6B] hover:text-[#D4A5A5] transition-colors duration-300"
                >
                  <span className="text-xl">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-[#FF6B6B] mb-4">ניווט מהיר</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-[#FF6B6B] transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact information */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-[#FF6B6B] mb-4">צור קשר</h3>
            <address className="not-italic text-gray-600">
              <p className="mb-2">רחוב הרצל 123, תל אביב</p>
              <p className="mb-2">טלפון: 03-1234567</p>
              <p className="mb-2">
                <a 
                  href="mailto:info@alphacafe.co.il" 
                  className="text-gray-600 hover:text-[#FF6B6B] transition-colors duration-300 flex items-center"
                >
                  <FaEnvelope className="ml-1" />
                  info@alphacafe.co.il
                </a>
              </p>
              <p className="mb-2">שעות פעילות: א'-ו' 08:00-22:00</p>
            </address>
          </div>

          {/* Newsletter signup */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-[#FF6B6B] mb-4">הרשמה לניוזלטר</h3>
            <p className="text-gray-600 mb-4">הירשמו לניוזלטר שלנו לקבלת עדכונים ומבצעים</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-2">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="כתובת אימייל"
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                  aria-label="כתובת אימייל לניוזלטר"
                />
                <button
                  type="submit"
                  className="bg-[#FF6B6B] hover:bg-[#D4A5A5] text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  הרשמה
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom footer with copyright and meta keywords */}
      <div className="bg-[#D4A5A5] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white mb-2 md:mb-0">
              © {currentYear} בית קפה אלפא. כל הזכויות שמורות.
            </div>
            <div className="text-xs text-white opacity-75">
              <span className="sr-only">מילות מפתח:</span>
              בית קפה, שירות, איכות, מקצועיות, ישראל
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;