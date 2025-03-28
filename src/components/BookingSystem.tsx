'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

// Define TypeScript interfaces for form data
interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  message: string;
}

const BookingSystem: React.FC = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form submission
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      console.log('Form data submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      reset(); // Reset form after successful submission
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots from 8:00 to 20:00
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="font-sans rtl" dir="rtl">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#FF6B6B]">
          הזמנת שולחן בבית קפה אלפא
        </h2>
        
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md text-center transition-all duration-300 ease-in-out">
            ההזמנה נשלחה בהצלחה! ניצור איתך קשר בהקדם.
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                שם מלא <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="הכנס את שמך המלא"
                {...register('name', { required: 'שדה חובה' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-gray-700 font-medium">
                טלפון <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="הכנס את מספר הטלפון שלך"
                {...register('phone', { 
                  required: 'שדה חובה',
                  pattern: {
                    value: /^[0-9]{9,10}$/,
                    message: 'מספר טלפון לא תקין'
                  }
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                אימייל <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="הכנס את כתובת האימייל שלך"
                {...register('email', { 
                  required: 'שדה חובה',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'כתובת אימייל לא תקינה'
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-gray-700 font-medium">
                תאריך <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
                min={format(new Date(), 'yyyy-MM-dd')}
                {...register('date', { required: 'שדה חובה' })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            {/* Time Field */}
            <div className="space-y-2">
              <label htmlFor="time" className="block text-gray-700 font-medium">
                שעה <span className="text-red-500">*</span>
              </label>
              <select
                id="time"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('time', { required: 'שדה חובה' })}
              >
                <option value="">בחר שעה</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time.message}</p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-gray-700 font-medium">
              הודעה
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              placeholder="הוסף הערות או בקשות מיוחדות"
              {...register('message')}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-opacity-50 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  מעבד...
                </span>
              ) : (
                'קבע תור עכשיו'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>לשאלות ובירורים ניתן ליצור קשר בטלפון: <span className="font-medium">03-1234567</span></p>
          <p className="mt-1">שעות פעילות: א׳-ה׳ 8:00-21:00, ו׳ 8:00-15:00, שבת סגור</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;