
import React, { useState } from 'react';
import { Scissors, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    title: "Signature Precision Cut",
    description: "Our signature precision cut technique, tailored to your face shape and hair texture for a truly bespoke look.",
    price: "$85+",
    duration: "60 min",
    icon: <Scissors className="h-6 w-6 text-gold" />
  },
  {
    id: 2,
    title: "Velvet Transformation",
    description: "A complete restyle with our expert stylists, including consultation, cut, and styling to redefine your look.",
    price: "$120+",
    duration: "90 min",
    icon: <Scissors className="h-6 w-6 text-gold" />
  },
  {
    id: 3,
    title: "Luxury Color Experience",
    description: "Premium color services using the finest products for rich, vibrant, and lasting results that enhance your natural beauty.",
    price: "$150+",
    duration: "120 min",
    icon: <Scissors className="h-6 w-6 text-gold" />
  },
  {
    id: 4,
    title: "Executive Quick Service",
    description: "Premium grooming on your timeline, perfect for busy professionals needing to maintain their polished appearance.",
    price: "$65+",
    duration: "30 min",
    icon: <Clock className="h-6 w-6 text-gold" />
  },
  {
    id: 5,
    title: "Bridal Experience",
    description: "Comprehensive bridal package including trials, day-of styling, and touch-ups for your perfect wedding look.",
    price: "$250+",
    duration: "Varies",
    icon: <Calendar className="h-6 w-6 text-gold" />
  }
];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextService = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/90 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest mb-3 font-medium">Our Expertise</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">Luxury Services</h2>
          <div className="w-24 h-1 bg-velvet mx-auto mt-6"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative h-[450px] flex items-center justify-center">
            {services.map((service, index) => {
              // Calculate the position of each card relative to the current index
              const position = (index - currentIndex + services.length) % services.length;
              const isActive = position === 0;
              
              let cardClass = "absolute w-full max-w-md transition-all duration-700 ease-out glass-card p-8 rounded-sm";
              let zIndex = "z-0";
              let transform = "";
              let opacity = "opacity-0";
              
              if (position === 0) {
                // Current card
                transform = "translate(0, 0) scale(1)";
                opacity = "opacity-100";
                zIndex = "z-30";
              } else if (position === 1 || position === services.length - 1) {
                // Next card or previous card
                transform = position === 1 
                  ? "translate(75%, -10%) scale(0.85) rotate(5deg)" 
                  : "translate(-75%, -10%) scale(0.85) rotate(-5deg)";
                opacity = "opacity-75";
                zIndex = "z-20";
              } else if (position === 2 || position === services.length - 2) {
                // Card two steps away
                transform = position === 2 
                  ? "translate(120%, -20%) scale(0.7) rotate(10deg)" 
                  : "translate(-120%, -20%) scale(0.7) rotate(-10deg)";
                opacity = "opacity-50";
                zIndex = "z-10";
              }
              
              return (
                <div 
                  key={service.id}
                  className={cn(cardClass, opacity, zIndex)}
                  style={{ transform }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-black/50 p-3 rounded-full">
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <span className="block text-gold text-2xl font-playfair">{service.price}</span>
                      <span className="text-white/70 text-sm flex items-center justify-end gap-1">
                        <Clock className="h-4 w-4" /> {service.duration}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-playfair font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-white/70 mb-6">{service.description}</p>
                  
                  {isActive && (
                    <a href="#booking" className="inline-block bg-velvet hover:bg-velvet-light text-white px-6 py-2 rounded-sm transition-colors duration-300 btn-hover-effect">
                      Book Now
                    </a>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevService}
              className="bg-black/50 hover:bg-velvet/60 text-white p-3 rounded-full transition-colors duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextService}
              className="bg-black/50 hover:bg-velvet/60 text-white p-3 rounded-full transition-colors duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
