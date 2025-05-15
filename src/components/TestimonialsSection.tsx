
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer Aniston",
    role: "Actress",
    text: "The attention to detail at Velvet Edge is unmatched. My hair has never looked more vibrant and healthy. It's not just a haircut, it's a complete experience.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "David Beckham",
    role: "Former Athlete",
    text: "I've been to salons around the world, but Velvet Edge brings something unique to the table. Their precision cutting technique is on another level.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emma Watson",
    role: "Actress & Activist",
    text: "The team at Velvet Edge understands my style perfectly. They consistently deliver a look that makes me feel confident and elegant.",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    name: "Michael B. Jordan",
    role: "Actor",
    text: "I always leave Velvet Edge feeling like a million bucks. The level of expertise and attention they provide is exactly what I need for my demanding schedule.",
    image: "https://randomuser.me/api/portraits/men/40.jpg"
  },
  {
    id: 5,
    name: "Zendaya",
    role: "Actress & Fashion Icon",
    text: "Velvet Edge has been my secret weapon for years. They understand how to create versatile styles that work both on and off camera.",
    image: "https://randomuser.me/api/portraits/women/90.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black/90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest mb-3 font-medium">Client Stories</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">Our Reputation</h2>
          <div className="w-24 h-1 bg-velvet mx-auto mt-6"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative h-[400px] md:h-[450px]">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
            const isNext = index === (activeIndex + 1) % testimonials.length;
            
            let position = '';
            let opacity = 'opacity-0';
            let scale = 'scale-95';
            let zIndex = 'z-0';
            
            if (isActive) {
              position = 'top-0 left-1/2 -translate-x-1/2';
              opacity = 'opacity-100';
              scale = 'scale-100';
              zIndex = 'z-30';
            } else if (isPrev) {
              position = 'top-10 left-0';
              opacity = 'opacity-50';
              zIndex = 'z-20';
            } else if (isNext) {
              position = 'top-10 right-0';
              opacity = 'opacity-50';
              zIndex = 'z-20';
            }
            
            return (
              <div 
                key={testimonial.id}
                className={cn(
                  "absolute glass-card p-8 rounded-sm transition-all duration-500 ease-out max-w-lg",
                  isActive ? 'animate-float' : '',
                  position,
                  opacity,
                  scale,
                  zIndex
                )}
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-velvet rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-medium">{testimonial.name}</h3>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-white/80 italic mb-6">"{testimonial.text}"</p>
                
                <div className="flex justify-end">
                  <div className="w-20 h-0.5 bg-gold/50"></div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === activeIndex ? "bg-gold w-6" : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
