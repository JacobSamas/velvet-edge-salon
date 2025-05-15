
import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface FormStep {
  id: number;
  title: string;
  description: string;
}

const steps: FormStep[] = [
  {
    id: 1,
    title: "Service Selection",
    description: "Choose the service you'd like to book"
  },
  {
    id: 2,
    title: "Personal Details",
    description: "Tell us about yourself"
  },
  {
    id: 3,
    title: "Schedule",
    description: "Select your preferred date and time"
  },
  {
    id: 4,
    title: "Confirmation",
    description: "Review and confirm your booking"
  }
];

const services = [
  "Signature Precision Cut",
  "Velvet Transformation",
  "Luxury Color Experience",
  "Executive Quick Service",
  "Bridal Experience"
];

const stylists = [
  "Alex Thompson - Master Stylist",
  "Jordan Blake - Color Specialist",
  "Morgan Reed - Creative Director",
  "Quinn Martins - Senior Stylist"
];

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    stylist: "",
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();
  
  const validateStep = (step: number) => {
    let newErrors: {[key: string]: string} = {};
    let isValid = true;
    
    if (step === 1) {
      if (!formData.service) {
        newErrors.service = "Please select a service";
        isValid = false;
      }
      if (!formData.stylist) {
        newErrors.stylist = "Please select a stylist";
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.name) {
        newErrors.name = "Name is required";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid";
        isValid = false;
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.date) {
        newErrors.date = "Please select a date";
        isValid = false;
      }
      if (!formData.time) {
        newErrors.time = "Please select a time";
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being filled
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      toast({
        title: "Booking Successful!",
        description: `We've confirmed your ${formData.service} with ${formData.stylist.split('-')[0]} on ${formData.date} at ${formData.time}.`,
        variant: "default",
      });
      
      // Reset form
      setFormData({
        service: "",
        stylist: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        notes: ""
      });
      setCurrentStep(1);
    }
  };
  
  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black/90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest mb-3 font-medium">Reserve Your Slot</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">Book Your Experience</h2>
          <div className="w-24 h-1 bg-velvet mx-auto mt-6"></div>
        </div>
        
        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center relative"
              >
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-500",
                    step.id === currentStep 
                      ? "bg-velvet text-white" 
                      : step.id < currentStep 
                        ? "bg-gold text-black" 
                        : "bg-white/10 text-white/50"
                  )}
                >
                  {step.id < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <p className={cn(
                  "text-sm font-medium transition-colors duration-500 text-center",
                  step.id === currentStep ? "text-white" : "text-white/50"
                )}>{step.title}</p>
              </div>
            ))}
          </div>
          
          {/* Connecting line */}
          <div className="relative h-0.5 bg-white/10 mt-5 mb-8">
            <div 
              className="absolute top-0 left-0 h-full bg-gold transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          <p className="text-white/70 text-center">{steps[currentStep - 1].description}</p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card p-8 rounded-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Select Service <span className="text-velvet">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div 
                        key={service} 
                        className={cn(
                          "border rounded-sm p-4 cursor-pointer transition-all duration-300",
                          formData.service === service 
                            ? "border-gold bg-black/40 shadow-md" 
                            : "border-white/20 hover:border-white/40"
                        )}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, service }));
                          if (errors.service) {
                            setErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.service;
                              return newErrors;
                            });
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            formData.service === service ? "border-gold" : "border-white/50"
                          )}>
                            {formData.service === service && (
                              <div className="w-3 h-3 rounded-full bg-gold"></div>
                            )}
                          </div>
                          <span className="text-white">{service}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.service && <p className="text-velvet text-sm mt-2">{errors.service}</p>}
                </div>
                
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Select Stylist <span className="text-velvet">*</span></label>
                  <select
                    name="stylist"
                    value={formData.stylist}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-sm bg-black/50 text-white border transition-colors duration-300",
                      errors.stylist ? "border-velvet" : "border-white/20 focus:border-gold"
                    )}
                  >
                    <option value="">Choose a stylist</option>
                    {stylists.map((stylist) => (
                      <option key={stylist} value={stylist}>{stylist}</option>
                    ))}
                  </select>
                  {errors.stylist && <p className="text-velvet text-sm mt-2">{errors.stylist}</p>}
                </div>
              </div>
            )}
            
            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Your Name <span className="text-velvet">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={cn(
                      "w-full px-4 py-3 rounded-sm bg-black/50 text-white border transition-colors duration-300",
                      errors.name ? "border-velvet" : "border-white/20 focus:border-gold"
                    )}
                  />
                  {errors.name && <p className="text-velvet text-sm mt-2">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Email Address <span className="text-velvet">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-sm bg-black/50 text-white border transition-colors duration-300",
                      errors.email ? "border-velvet" : "border-white/20 focus:border-gold"
                    )}
                  />
                  {errors.email && <p className="text-velvet text-sm mt-2">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Phone Number <span className="text-velvet">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className={cn(
                      "w-full px-4 py-3 rounded-sm bg-black/50 text-white border transition-colors duration-300",
                      errors.phone ? "border-velvet" : "border-white/20 focus:border-gold"
                    )}
                  />
                  {errors.phone && <p className="text-velvet text-sm mt-2">{errors.phone}</p>}
                </div>
              </div>
            )}
            
            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Select Date <span className="text-velvet">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={cn(
                        "w-full pl-10 px-4 py-3 rounded-sm bg-black/50 text-white border transition-colors duration-300",
                        errors.date ? "border-velvet" : "border-white/20 focus:border-gold"
                      )}
                    />
                  </div>
                  {errors.date && <p className="text-velvet text-sm mt-2">{errors.date}</p>}
                </div>
                
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Select Time <span className="text-velvet">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-white/50" />
                    </div>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={cn(
                        "w-full pl-10 px-4 py-3 rounded-sm bg-black/50 text-white border transition-colors duration-300",
                        errors.time ? "border-velvet" : "border-white/20 focus:border-gold"
                      )}
                    >
                      <option value="">Choose a time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                  {errors.time && <p className="text-velvet text-sm mt-2">{errors.time}</p>}
                </div>
                
                <div>
                  <label className="block text-white text-lg mb-3 font-playfair">Special Requests (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special requests or notes for your stylist"
                    rows={4}
                    className="w-full px-4 py-3 rounded-sm bg-black/50 text-white border border-white/20 focus:border-gold transition-colors duration-300"
                  ></textarea>
                </div>
              </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-playfair text-white mb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  <SummaryItem label="Service" value={formData.service} />
                  <SummaryItem label="Stylist" value={formData.stylist.split('-')[0]} />
                  <SummaryItem label="Name" value={formData.name} />
                  <SummaryItem label="Email" value={formData.email} />
                  <SummaryItem label="Phone" value={formData.phone} />
                  <SummaryItem label="Date" value={formData.date} />
                  <SummaryItem label="Time" value={formData.time} />
                  {formData.notes && <SummaryItem label="Notes" value={formData.notes} />}
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/70 mb-3">
                    By confirming your booking, you agree to our cancellation policy. You can reschedule or cancel your appointment up to 24 hours in advance.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-white/30 text-white rounded-sm hover:bg-black/30 transition-colors duration-300"
                >
                  Back
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-velvet hover:bg-velvet-light text-white rounded-sm transition-colors duration-300"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded-sm transition-colors duration-300"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-white/70">{label}:</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

export default BookingForm;
