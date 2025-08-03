"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
  category?: string;
  tags?: string[];
}

interface PortfolioGridProps {
  items: PortfolioItem[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-base">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-[4/3] rounded-apple-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Background Image */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 25vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 md:bg-black/40 md:group-hover:bg-black/20 transition-all duration-500" />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 ${item.gradient} mix-blend-multiply opacity-90 md:opacity-100 md:group-hover:opacity-80 transition-opacity duration-500`} />

          {/* Content */}
          <div className={`absolute inset-0 p-base flex flex-col justify-between text-white transition-all duration-500 ${
            hoveredId === item.id ? 'opacity-100' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100'
          }`}>
            {/* Category Tag */}
            {item.category && (
              <div className="self-start">
                <span className="px-sm py-micro bg-white/20 backdrop-blur-sm text-caption rounded-full">
                  {item.category}
                </span>
              </div>
            )}

            {/* Title and Description */}
            <div className="space-y-xs">
              <h3 className="text-body-large font-bold leading-tight">
                {item.title}
              </h3>
              <p className="text-caption opacity-90 leading-relaxed line-clamp-3">
                {item.description}
              </p>
              
              {/* Tags */}
              {item.tags && (
                <div className="flex flex-wrap gap-xs mt-xs">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-xs py-micro bg-white/10 backdrop-blur-sm text-caption rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hover Indicator */}
          <div className="absolute top-base right-base opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <HiOutlineExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;