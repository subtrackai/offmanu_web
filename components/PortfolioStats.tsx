"use client";

import React from "react";
import { FiMapPin, FiClock, FiUser } from "react-icons/fi";
import { FaPinterest, FaBehance, FaArtstation } from "react-icons/fa";

interface AuthorInfo {
  name: string;
  title: string;
  location: string;
  experience: string;
}

interface PortfolioInfo {
  author: AuthorInfo;
  image: string;
}

interface PortfolioStatsProps {
  portfolioInfo: PortfolioInfo;
}

const PortfolioStats: React.FC<PortfolioStatsProps> = ({ portfolioInfo }) => {
  const { author, image } = portfolioInfo;

  return (
    <div className="mb-xl">
      {/* Apple 风格 Banner */}
      <div 
        className="relative overflow-hidden rounded-2xl md:rounded-3xl p-base md:p-lg lg:p-xl border border-white/20"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        <div className="relative z-10 grid grid-cols-1 gap-base md:gap-lg lg:gap-xl items-center">
          {/* 作者信息 - 居中 */}
          <div className="text-center">
            {/* 头像 */}
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-base">
              <FiUser className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            
            {/* 基本信息 */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-xs">
              {author.name}
            </h2>
            <p className="text-base md:text-lg text-white mb-sm md:mb-base font-medium">
              {author.title}
            </p>
            
            {/* 位置和经验 */}
            <div className="flex flex-wrap items-center justify-center gap-sm md:gap-base mb-sm md:mb-base text-white">
              <div className="flex items-center gap-xs">
                <FiMapPin className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">{author.location}</span>
              </div>
              <div className="flex items-center gap-xs">
                <FiClock className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">{author.experience}</span>
              </div>
            </div>
            
            {/* 社交链接 */}
            <div className="flex items-center justify-center gap-xs">
              {/* Pinterest */}
              <a 
                href="#" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Pinterest"
              >
                <FaPinterest className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>

              {/* Behance */}
              <a 
                href="#" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Behance"
              >
                <FaBehance className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>

              {/* ArtStation */}
              <a 
                href="#" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="ArtStation"
              >
                <FaArtstation className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>

              {/* 站酷 */}
              <a 
                href="#" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="站酷"
              >
                <span className="text-white text-xs md:text-sm font-bold">站</span>
              </a>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default PortfolioStats;