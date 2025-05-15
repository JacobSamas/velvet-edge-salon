
import React, { useState } from 'react';
import { GalleryHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryItem {
  id: number;
  title: string;
  beforeImage: string;
  afterImage: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Modern Bob Transformation",
    beforeImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
    afterImage: "https://images.unsplash.com/photo-1595499231368-5b0d999ae558?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    category: "Cut"
  },
  {
    id: 2,
    title: "Platinum Blonde Masterpiece",
    beforeImage: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    afterImage: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    category: "Color"
  },
  {
    id: 3,
    title: "Textured Pixie Revolution",
    beforeImage: "https://images.unsplash.com/photo-1595302269056-82f27023cs9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80",
    afterImage: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Style"
  },
  {
    id: 4,
    title: "Rich Auburn Transformation",
    beforeImage: "https://images.unsplash.com/photo-1523264941296-68cee83f1fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    afterImage: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=812&q=80",
    category: "Color"
  },
  {
    id: 5,
    title: "Elegant Wedding Updo",
    beforeImage: "https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=882&q=80",
    afterImage: "https://images.unsplash.com/photo-1528228059013-ab44c1c233cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=858&q=80",
    category: "Special"
  },
  {
    id: 6,
    title: "Men's Executive Cut",
    beforeImage: "https://images.unsplash.com/photo-1529245856630-f4853233d2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1889&q=80",
    afterImage: "https://images.unsplash.com/photo-1584696423519-32d35260ceb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=886&q=80",
    category: "Cut"
  }
];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];
  
  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest mb-3 font-medium">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">Transformation Gallery</h2>
          <div className="w-24 h-1 bg-velvet mx-auto mt-6"></div>
        </div>
        
        <div className="flex justify-center mb-10 flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-4 py-2 rounded-sm transition-all duration-300",
                activeFilter === category
                  ? "bg-velvet text-white"
                  : "bg-black text-white/70 border border-white/20 hover:border-white/40"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 -left-36 w-72 h-72 bg-velvet/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-36 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
    </section>
  );
};

const GalleryCard = ({ item }: { item: GalleryItem }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="group relative h-80 overflow-hidden rounded-sm glass-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Before image (always visible) */}
        <img 
          src={item.beforeImage} 
          alt={`Before: ${item.title}`} 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          style={{ 
            opacity: isHovering ? 0 : 1, 
            transform: isHovering ? 'scale(1.05)' : 'scale(1)' 
          }}
        />
        
        {/* After image (visible on hover) */}
        <img 
          src={item.afterImage} 
          alt={`After: ${item.title}`} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
          style={{ 
            opacity: isHovering ? 1 : 0,
            transform: isHovering ? 'scale(1)' : 'scale(1.05)' 
          }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 p-6 flex flex-col justify-end">
        <div className="transform transition-all duration-500 ease-out" style={{ 
          opacity: isHovering ? 1 : 0.7,
          transform: isHovering ? 'translateY(0)' : 'translateY(10px)' 
        }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gold text-sm font-medium">{item.category}</span>
            <div className="h-px bg-gold/30 flex-grow"></div>
            <GalleryHorizontal className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-white text-xl font-playfair font-medium">{item.title}</h3>
          
          <div className="mt-3 space-x-2">
            <span className={cn(
              "text-white/80 text-sm transition-all duration-500",
              isHovering ? "opacity-0" : "opacity-100"
            )}>Hover to reveal</span>
            
            <span className={cn(
              "text-white text-sm transition-all duration-500",
              isHovering ? "opacity-100" : "opacity-0"
            )}>After</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
