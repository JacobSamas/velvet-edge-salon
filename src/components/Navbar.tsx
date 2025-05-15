
import React, { useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4',
      scrolled ? 'bg-black/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Scissors className="h-7 w-7 text-velvet rotate-45" />
          <span className="text-xl md:text-2xl font-playfair font-bold">
            <span className="text-white">Velvet</span>
            <span className="text-velvet">Edge</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#gallery">Gallery</NavLink>
          <NavLink href="#booking">Booking</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
        </div>
        
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <a 
          href="#booking" 
          className="hidden md:block bg-velvet hover:bg-velvet-light text-white px-5 py-2 rounded-sm transition-colors duration-300 btn-hover-effect"
        >
          Book Now
        </a>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-white/80 hover:text-white font-medium transition-colors duration-300 underline-animation"
  >
    {children}
  </a>
);

export default Navbar;
