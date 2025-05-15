
import React, { useEffect } from 'react';
import { Scissors } from 'lucide-react';

const HeroSection = () => {
  useEffect(() => {
    const animateText = () => {
      const textElements = document.querySelectorAll('.animate-title span');
      textElements.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('opacity-100');
          span.classList.remove('opacity-0', 'translate-y-8');
        }, 100 * index);
      });
    };

    setTimeout(animateText, 500);
  }, []);

  const triggerScissorAnimation = () => {
    const scissor = document.querySelector('.hero-scissor');
    scissor?.classList.add('animate-scissor-cut');
    
    setTimeout(() => {
      scissor?.classList.remove('animate-scissor-cut');
    }, 500);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/80 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          <div className="mb-6 relative">
            <Scissors 
              size={60} 
              className="text-gold hero-scissor rotate-45 transition-all duration-300 hover:text-velvet" 
              onMouseEnter={triggerScissorAnimation}
            />
          </div>
          
          <h1 className="animate-title text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
            {"Where Precision Meets".split('').map((letter, i) => (
              <span key={i} className="inline-block opacity-0 translate-y-8 transition-all duration-500">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
            <br />
            <span className="text-velvet">
              {"Elegance".split('').map((letter, i) => (
                <span key={i} className="inline-block opacity-0 translate-y-8 transition-all duration-500 delay-300">
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          
          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-8 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            Experience the art of transformation at our premium salon. 
            Where every cut tells a story of luxury and unique style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <a 
              href="#booking" 
              className="bg-velvet hover:bg-velvet-light text-white px-8 py-3 rounded-sm font-medium transition-all duration-300 btn-hover-effect"
            >
              Book Your Experience
            </a>
            <a 
              href="#services" 
              className="border border-gold/70 hover:border-gold text-gold hover:text-gold-light px-8 py-3 rounded-sm font-medium transition-colors duration-300"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-velvet-dark/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
