
import React, { useState } from 'react';
import { Scissors, Facebook, Instagram, Twitter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { toast } = useToast();
  
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    
    toast({
      title: "Subscription Successful!",
      description: "Thank you for subscribing to our newsletter.",
      variant: "default",
    });
    
    setEmail('');
    setEmailError('');
  };
  
  return (
    <footer className="relative pt-24 pb-12 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="h-6 w-6 text-velvet rotate-45" />
              <span className="text-xl font-playfair font-bold">
                <span className="text-white">Velvet</span>
                <span className="text-velvet">Edge</span>
              </span>
            </div>
            
            <p className="text-white/70 mb-6">
              Where precision meets elegance. Our premier salon brings luxury styling with a personal touch.
            </p>
            
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook className="h-5 w-5" />} />
              <SocialIcon icon={<Instagram className="h-5 w-5" />} />
              <SocialIcon icon={<Twitter className="h-5 w-5" />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-playfair font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="#services">Our Services</FooterLink>
              <FooterLink href="#gallery">Gallery</FooterLink>
              <FooterLink href="#booking">Book Appointment</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-playfair font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-3 text-white/70">
              <li>123 Luxury Lane, Elegance Street</li>
              <li>New York, NY 10001</li>
              <li className="pt-2">+1 (212) 555-7890</li>
              <li>contact@velvetedge.com</li>
              <li className="pt-2">
                <span className="block font-medium text-gold">Opening Hours</span>
                Tue-Sat: 10AM - 8PM<br />
                Sun-Mon: Closed
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-playfair font-bold text-white mb-6">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-gold rounded-sm transition-colors duration-300"
                />
                {emailError && <p className="text-velvet text-sm mt-1">{emailError}</p>}
              </div>
              
              <button
                type="submit"
                className="w-full bg-velvet hover:bg-velvet-light text-white px-4 py-3 rounded-sm transition-colors duration-300 btn-hover-effect"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-16 mb-12 relative overflow-hidden h-64 rounded-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095891106!2d-74.00425908493885!3d40.74076737932913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1645564028872!5m2!1sen!2sus"
            className="w-full h-full border-0"
            loading="lazy"
            title="Map"
          ></iframe>
          
          {/* Glowing marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-6 h-6 bg-velvet rounded-full"></div>
              <div className="absolute inset-0 bg-velvet rounded-full animate-ping opacity-75"></div>
              <div className="absolute -inset-3 bg-velvet/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Velvet Edge. All rights reserved. | Portfolio project designed by a passionate frontend developer.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-white/70 hover:text-white transition-colors duration-300 underline-animation"
    >
      {children}
    </a>
  </li>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-velvet text-white/70 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
