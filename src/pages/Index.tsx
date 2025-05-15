
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GallerySection from '@/components/GallerySection';
import BookingForm from '@/components/BookingForm';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="page-transition min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <GallerySection />
      <BookingForm />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
