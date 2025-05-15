
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "What makes Velvet Edge different from other salons?",
    answer: "Velvet Edge combines technical precision with artistic vision, creating personalized results that enhance your unique features. Our stylists undergo continuous education to master the latest techniques, and our intimate luxury space ensures you receive undivided attention during your visit."
  },
  {
    id: 2,
    question: "How often should I get my hair cut?",
    answer: "For most styles, we recommend maintenance cuts every 4-6 weeks. However, this varies based on your hair type, style, and growth rate. During your consultation, your stylist will recommend a personalized maintenance schedule for your specific needs."
  },
  {
    id: 3,
    question: "What should I bring to my first appointment?",
    answer: "We recommend bringing inspiration photos of styles you like, even if they're just elements you'd like to incorporate. Arrive with your hair in its natural state when possible, and be prepared to discuss your daily styling routine, concerns, and goals with your stylist."
  },
  {
    id: 4,
    question: "How long will my appointment take?",
    answer: "Service times vary depending on your specific needs. As a general guideline: precision cuts take approximately 60 minutes, color services range from 2-3 hours, and transformative services may require 3+ hours. We'll confirm timing when booking your appointment."
  },
  {
    id: 5,
    question: "What is your cancellation policy?",
    answer: "We understand that schedules change. We request 24 hours' notice for cancellations or rescheduling. Late cancellations or no-shows may incur a fee of 50% of the service price, which helps us compensate our stylists for their reserved time."
  },
  {
    id: 6,
    question: "Do you sell professional hair products?",
    answer: "Yes, we carry exclusive professional-grade products that are available only through licensed salons. Our stylists will recommend products specifically matched to your hair type, condition, and styling needs to help you maintain your look between visits."
  }
];

const FaqSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(1);
  
  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };
  
  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-black to-[#0A0A0A] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest mb-3 font-medium">Knowledge Base</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">Common Questions</h2>
          <div className="w-24 h-1 bg-velvet mx-auto mt-6"></div>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card p-8 rounded-sm">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="border-b border-white/10 last:border-b-0">
                <button
                  className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
                  onClick={() => toggleItem(item.id)}
                >
                  <h3 className="text-lg md:text-xl font-playfair text-white pr-8">{item.question}</h3>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-gold transition-transform duration-300",
                      openItem === item.id ? "transform rotate-180" : ""
                    )} 
                  />
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openItem === item.id ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-white/70 pb-5">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-white/70 mb-5">Still have questions? We're here to help.</p>
          <a 
            href="#" 
            className="inline-block border border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 rounded-sm transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 -right-36 w-72 h-72 bg-velvet/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-36 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default FaqSection;
