'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

// Define types for our service items
interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Props interface for our component
interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const ServicesSection: FC<ServicesSectionProps> = ({
  title = "השירותים המיוחדים שלנו",
  subtitle = "בית קפה אלפא מציע מגוון שירותים ייחודיים מעבר לחוויית הקפה הרגילה",
  ctaText = "למידע נוסף על השירותים שלנו",
  ctaLink = "/services",
}) => {
  // Service items data
  const services: ServiceItem[] = [
    {
      id: 1,
      icon: "🍽️",
      title: "שירותי קייטרינג",
      description: "אנו מציעים שירותי קייטרינג איכותיים לאירועים פרטיים ועסקיים עם תפריט מותאם אישית לצרכים שלך."
    },
    {
      id: 2,
      icon: "🎉",
      title: "אירועים פרטיים",
      description: "הפכו את האירוע שלכם לבלתי נשכח עם המרחב המעוצב שלנו. מושלם למסיבות, כנסים ואירועים מיוחדים."
    },
    {
      id: 3,
      icon: "☕",
      title: "טעימות קפה מיוחדות",
      description: "חוויית טעימות קפה מודרכת המציגה את מגוון הקפה הייחודי שלנו, מושלם לחובבי קפה וקבוצות."
    },
    {
      id: 4,
      icon: "🧁",
      title: "סדנאות אפייה",
      description: "סדנאות אפייה אינטראקטיביות בהן תלמדו להכין מאפים ייחודיים בהדרכת השפים המומחים שלנו."
    },
    {
      id: 5,
      icon: "📱",
      title: "הזמנות מותאמות אישית",
      description: "שירות הזמנות דיגיטלי המאפשר לכם להתאים אישית את המנות והמשקאות האהובים עליכם."
    }
  ];

  // Animation variants for subtle animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-white text-right" dir="rtl">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF6B6B]">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-[#FF6B6B]"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-[#FF6B6B]">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-14 text-center">
          <motion.a
            href={ctaLink}
            className="inline-block px-6 py-3 bg-[#FF6B6B] hover:bg-[#D4A5A5] text-white font-medium rounded-md transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaText}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;