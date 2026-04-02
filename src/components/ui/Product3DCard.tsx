import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';

interface Product3DCardProps {
  frontViewSrc: string; // Shown by default
  otherViewSrc: string; // Shown on hover
  alt: string;
  name: string;
  price: string;
  description: string;
  rating?: string;
  reviewCount?: number;
}

export function Product3DCard({
  frontViewSrc,
  otherViewSrc,
  alt,
  name,
  price,
  description,
  rating = "4.5",
  reviewCount = 1200,
}: Product3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const originalPrice = (parseInt(price.replace(/[^\d]/g, '')) * 2).toFixed(0);
  const discount = "50% OFF";

  return (
    <div 
      className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Swap */}
      <div className="relative w-full aspect-[16/9] bg-white p-0">
        {/* Like Symbol */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300 ${
            isLiked ? 'text-red-500 bg-red-50 scale-110' : 'text-gray-300 bg-gray-50/50 hover:text-red-400'
          }`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </button>
        
        <div className="relative w-full h-full">
          {/* Swapped images as requested: Default = Front view, Hover = Other view */}
          <Image
            src={isHovered ? otherViewSrc : frontViewSrc}
            alt={alt}
            fill
            className={`object-contain transition-transform duration-500 ${
              (!isHovered && frontViewSrc.includes('front.png')) ? 'scale-[1.2]' : 'scale-100'
            } group-hover:scale-[1.1]`}
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 z-10 bg-blue-50/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          <span className="text-sm font-bold text-gray-900">{rating}</span>
          <Star size={12} className="fill-blue-600 text-blue-600" />
          <span className="text-[10px] text-gray-500 ml-1 font-medium">{reviewCount}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{name}</h3>
        <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-tighter font-semibold">Size: Medium • {description.split('.')[0]}</p>
        
        <div className="mt-auto flex items-center gap-2">
          <span className="text-lg font-black text-gray-900">{price}</span>
          <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
          <span className="text-xs text-teal-600 font-bold">({discount})</span>
        </div>
      </div>
    </div>
  );
}
