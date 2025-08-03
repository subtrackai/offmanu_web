"use client";

import { useState, useRef, useEffect } from "react";

export default function AICard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      setMousePosition({ x: deltaX * 15, y: -deltaY * 15 });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-20 h-20 overflow-visible"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Main container */}
      <div className="absolute inset-0">
        <label className="flex items-center justify-center cursor-pointer w-full h-full">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0 absolute"
            checked={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
          />
          
          {/* Card */}
          <div 
            ref={cardRef}
            className={`
              relative w-20 h-20 rounded-2xl transition-all duration-600 ease-out
              transform-gpu will-change-transform flex items-center justify-center
              hover:shadow-[0_10px_40px_rgba(0,0,60,0.25),inset_0_0_10px_rgba(255,255,255,0.5)]
              ${isExpanded ? 'w-72 h-44 z-50' : ''}
            `}
            style={{ 
              transformStyle: "preserve-3d", 
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) translateZ(${isExpanded ? 50 : 25}px)`,
              transformOrigin: "center center"
            }}
          >
            {/* Background with animated balls */}
            <div 
              className={`
                absolute inset-0 rounded-2xl overflow-hidden transition-all duration-300
                bg-white/80 backdrop-blur-sm
                ${isExpanded ? 'rounded-2xl' : ''}
              `}
              style={{ zIndex: -10 }}
            >
              <div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
                style={{ animation: "rotate 10s linear infinite" }}
              >
                {/* Colored balls - smaller for compact size */}
                <div className="w-8 h-8 absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 rounded-full blur-[15px]" />
                <div className="w-8 h-8 absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-400 rounded-full blur-[15px]" />
                <div className="w-8 h-8 absolute top-1/2 -left-4 transform -translate-y-1/2 bg-pink-500 rounded-full blur-[15px]" />
                <div className="w-8 h-8 absolute top-1/2 -right-4 transform -translate-y-1/2 bg-cyan-400 rounded-full blur-[15px]" />
              </div>
            </div>

            {/* Content */}
            <div 
              className={`
                w-full h-full rounded-2xl transition-all duration-300 overflow-hidden
                ${isExpanded ? 'w-72 h-44' : 'w-20 h-20'}
              `}
            >
              <div className="w-full h-full backdrop-blur-[50px]">
                {/* Eyes */}
                <div 
                  className={`
                    absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${isExpanded ? 'opacity-0' : 'opacity-100'}
                  `}
                >
                  {/* Normal eyes - smaller for compact size */}
                  <div className="w-2 h-6 bg-white rounded-xl animate-blink" />
                  <div className="w-2 h-6 bg-white rounded-xl animate-blink" />
                </div>

                {/* Happy eyes (SVG) - shown when expanded */}
                <div 
                  className={`
                    absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    flex items-center justify-center text-white gap-0 transition-all duration-300
                    ${!isExpanded ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                  `}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                    />
                  </svg>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                    />
                  </svg>
                </div>

                {/* Chat interface - shown when expanded */}
                <div 
                  className={`
                    absolute inset-0 p-1 transition-all duration-300
                    ${isExpanded ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}
                  `}
                >
                  <div className="flex flex-col justify-between rounded-xl w-full h-full p-1 overflow-hidden bg-white">
                    {/* Chat input area */}
                    <div className="relative flex h-full transition-all duration-300">
                      <textarea
                        className="
                          bg-transparent rounded-xl border-none w-full h-full text-gray-500
                          text-xs font-normal p-2 resize-none outline-none
                          placeholder-gray-300 focus:placeholder-gray-500
                          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                        "
                        placeholder="Imagine Something...✦˚"
                        rows={3}
                      />
                    </div>

                    {/* Options */}
                    <div className="flex justify-between items-end p-2">
                      {/* Add buttons */}
                      <div className="flex gap-1">
                        <button className="flex text-black/10 bg-transparent border-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:text-gray-500">
                          <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill="none" />
                          </svg>
                        </button>
                        <button className="flex text-black/10 bg-transparent border-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm0-8h6m-3-3v6" />
                          </svg>
                        </button>
                        <button className="flex text-black/10 bg-transparent border-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667" />
                          </svg>
                        </button>
                      </div>

                      {/* Submit button */}
                      <button 
                        className="
                          flex p-0.5 bg-gradient-to-t from-red-500 via-purple-500 to-blue-500 
                          rounded-xl shadow-[inset_0_4px_2px_-2px_rgba(255,255,255,0.5)]
                          cursor-pointer border-none outline-none opacity-70 transition-all duration-150
                          hover:opacity-100 focus:opacity-100 active:scale-95
                        "
                      >
                        <div className="w-6 h-6 p-1 bg-black/10 rounded-xl backdrop-blur-sm text-gray-300">
                          <svg viewBox="0 0 512 512" className="w-full h-full transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_5px_#ffffff] focus:text-white focus:drop-shadow-[0_0_5px_#ffffff] focus:scale-110 focus:rotate-45 focus:-translate-x-0.5 focus:translate-y-0.5">
                            <path d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05" fill="currentColor" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>

      <style jsx global>{`
        @keyframes rotate {
          from { transform: translateX(-50%) translateY(-50%) rotate(360deg); }
          to { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
        }
        
        @keyframes blink {
          0%, 46%, 50%, 96%, 100% { height: 1.5rem; }
          48%, 98% { height: 0.5rem; }
        }
        
        .animate-blink {
          animation: blink 10s infinite linear;
        }
        
        .animate-spin-slow {
          animation: rotate 10s linear infinite;
        }
      `}</style>
    </div>
  );
}