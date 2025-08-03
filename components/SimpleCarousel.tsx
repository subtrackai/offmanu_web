"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaTag, FaCalendar, FaUser } from "react-icons/fa";
import Link from "next/link";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  category: string;
  link: string;
  image: string;
  icon?: React.ReactNode;
}

interface ArticleItem {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  link: string;
  image: string;
}

interface SimpleCarouselProps {
  title: string;
  subtitle?: string;
  type: 'projects' | 'articles';
  items: ProjectItem[] | ArticleItem[];
  className?: string;
}

const SimpleCarousel = ({ title, subtitle, type, items, className = "" }: SimpleCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, index: 0 });
  const [carouselConfig, setCarouselConfig] = useState({
    cardWidth: 320,
    gap: 24,
    visibleCards: 1,
    maxIndex: 0,
    titleOffset: 0,
    viewportWidth: 0,
    isMobile: false
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // 检测移动设备
  const isMobileDevice = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  }, []);

  // 计算轮播配置和对齐
  const calculateCarouselConfig = useCallback(() => {
    if (!scrollRef.current || !containerRef.current || !titleRef.current) return;

    // 使用 requestAnimationFrame 确保在下一帧进行计算
    requestAnimationFrame(() => {
      // 获取标题元素的精确位置
      const containerRect = containerRef.current?.getBoundingClientRect();
      const titleRect = titleRef.current?.getBoundingClientRect();
      
      if (!containerRect || !titleRect) return;
      
      // 计算标题相对于容器的偏移量
      const titleOffset = titleRect.left;
      
      // 全屏可用宽度（从标题位置开始）
      const fullScreenWidth = window.innerWidth;
      const viewportWidth = fullScreenWidth - titleOffset;
      const isMobile = isMobileDevice();
      
      const gap = isMobile ? 16 : 24; // 移动端减小间距
      
      // 响应式卡片宽度 - 移动端优化
      let cardWidth: number;
      
      if (fullScreenWidth >= 1280) {
        cardWidth = 320; // xl屏幕
      } else if (fullScreenWidth >= 1024) {
        cardWidth = 300; // lg屏幕
      } else if (fullScreenWidth >= 768) {
        cardWidth = 280; // md屏幕
      } else if (fullScreenWidth >= 640) {
        // sm屏幕：显示1.2个卡片，营造可滑动的视觉效果
        cardWidth = Math.floor(viewportWidth * 0.85 - gap);
      } else {
        // xs屏幕：显示1.1个卡片
        cardWidth = Math.floor(viewportWidth * 0.9 - gap);
      }
      
      // 确保最小卡片宽度
      cardWidth = Math.max(cardWidth, 240);
      
      // 计算在视口中可以完整显示的卡片数量
      const visibleCards = isMobile 
        ? 1 // 移动端始终按单个卡片滑动
        : Math.max(1, Math.floor((viewportWidth - 24) / (cardWidth + gap)));
      
      // 计算最大滑动索引
      const maxIndex = Math.max(0, items.length - (isMobile ? 1 : visibleCards));

      setCarouselConfig({
        cardWidth,
        gap,
        visibleCards,
        maxIndex,
        titleOffset,
        viewportWidth,
        isMobile
      });
    });
  }, [items.length, isMobileDevice]);

  // 响应式监听和初始化
  useEffect(() => {
    // 立即计算初始配置
    calculateCarouselConfig();
    
    // 延迟设置初始化状态，确保动画流畅
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    const handleResize = () => {
      calculateCarouselConfig();
      // 重置索引到有效范围内
      setCurrentIndex(prev => {
        const isMobile = isMobileDevice();
        const tempVisibleCards = isMobile ? 1 : Math.max(1, Math.floor((window.innerWidth - (titleRef.current?.getBoundingClientRect().left || 0) - 24) / (320 + 24)));
        const tempMaxIndex = Math.max(0, items.length - tempVisibleCards);
        return Math.min(prev, tempMaxIndex);
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateCarouselConfig, items.length, isMobileDevice]);

  // 组件卸载时重置状态
  useEffect(() => {
    return () => {
      setCurrentIndex(0);
      setIsInitialized(false);
    };
  }, []);

  // 滑动函数 - 每次滑动一个项目
  const scroll = (direction: "left" | "right") => {
    let newIndex: number;
    
    if (direction === "left") {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(carouselConfig.maxIndex, currentIndex + 1);
    }
    
    setCurrentIndex(newIndex);
  };

  // 触摸滑动处理
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselConfig.isMobile) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX,
      index: currentIndex
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselConfig.isMobile) return;
    
    // 阻止默认滚动行为
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !carouselConfig.isMobile) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = dragStart.x - touchEndX;
    const threshold = 50; // 滑动阈值
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex < carouselConfig.maxIndex) {
        // 向左滑动，显示下一个
        scroll("right");
      } else if (deltaX < 0 && currentIndex > 0) {
        // 向右滑动，显示上一个
        scroll("left");
      }
    }
    
    setIsDragging(false);
  };

  // 鼠标拖拽处理（桌面端）
  const handleMouseDown = (e: React.MouseEvent) => {
    if (carouselConfig.isMobile) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      index: currentIndex
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || carouselConfig.isMobile) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || carouselConfig.isMobile) return;
    
    const mouseEndX = e.clientX;
    const deltaX = dragStart.x - mouseEndX;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex < carouselConfig.maxIndex) {
        scroll("right");
      } else if (deltaX < 0 && currentIndex > 0) {
        scroll("left");
      }
    }
    
    setIsDragging(false);
  };

  // 判断按钮状态
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < carouselConfig.maxIndex;

  const renderCard = (item: ProjectItem | ArticleItem, index: number) => {
    return (
      <motion.div
        key={item.id}
        className="flex-shrink-0"
        style={{ width: carouselConfig.cardWidth }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInitialized ? 1 : 0, y: isInitialized ? 0 : 20 }}
        transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.4 }}
      >
        <div
          className={`relative overflow-hidden rounded-apple-xl h-[clamp(320px,40vw,400px)] flex flex-col cursor-pointer group`}
          onClick={() => console.log('Navigate to:', item.link)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${item.image})`,
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-md">
            {/* Category Tag */}
            <div className="mb-auto">
              <span className="inline-flex items-center px-sm py-micro text-caption font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                                      <FaTag className="w-3 h-3 mr-1" />
                {item.category}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="mt-auto">
              {/* Article Date & Author */}
              {type === 'articles' && (
                <div className="flex flex-col space-y-micro text-caption text-white/80 mb-sm">
                  <div className="flex items-center">
                                          <FaCalendar className="w-3 h-3 mr-1" />
                    {(item as ArticleItem).date}
                  </div>
                  <div className="flex items-center">
                    <FaUser className="w-3 h-3 mr-1" />
                    {(item as ArticleItem).author}
                  </div>
                </div>
              )}

              {/* Title */}
              <h3 className="text-body-large font-semibold text-white mb-sm line-clamp-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-caption text-white/80 mb-base line-clamp-3">
                {item.description}
              </p>

              {/* CTA Button */}
                            <Link
                href={type === 'projects' ? `/projects/${item.id}` : `/articles/${item.id}`}
                className="inline-flex items-center text-caption text-white hover:text-white/80 transition-colors duration-200 group/btn border-b border-white/30 hover:border-white/60 pb-1"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                查看详情
                <FaArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className={`py-xl ${className}`}>
      <div className="relative">
        {/* 标题区域 - 与页面其他部分对齐 */}
        <div ref={containerRef} className="max-w-[1400px] mx-auto px-base mb-md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 
                ref={titleRef}
                className="text-title-large font-bold text-foreground mb-xs"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-body-large text-text-secondary">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* 右侧按钮区域 */}
            <div className="flex items-center space-x-base ml-base">
              {/* 查看全部链接 - 所有屏幕尺寸显示 */}
              <a 
                href={type === 'projects' ? '/projects' : '/articles'} 
                className="text-body text-text-secondary hover:text-foreground transition-colors duration-200 whitespace-nowrap flex-shrink-0 flex items-center gap-1"
              >
                查看全部
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              {/* 桌面端控制按钮 */}
              {!carouselConfig.isMobile && (
                <div className="flex items-center space-x-xs">
                <motion.button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={`carousel-btn p-sm rounded-full transition-all duration-200 ${
                    canScrollLeft 
                      ? 'bg-muted/60 hover:bg-muted/80 active:bg-muted/50 cursor-pointer' 
                      : 'bg-muted/30 opacity-40 cursor-not-allowed'
                  }`}
                  whileHover={canScrollLeft ? { scale: 1.05 } : {}}
                  whileTap={canScrollLeft ? { scale: 0.95 } : {}}
                  aria-label="向左滚动"
                >
                  <FaChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 relative z-10 ${
                    canScrollLeft ? 'text-foreground/80' : 'text-muted-foreground/50'
                  }`} />
                </motion.button>
                <motion.button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={`carousel-btn p-sm rounded-full transition-all duration-200 ${
                    canScrollRight 
                      ? 'bg-muted/60 hover:bg-muted/80 active:bg-muted/50 cursor-pointer' 
                      : 'bg-muted/30 opacity-40 cursor-not-allowed'
                  }`}
                  whileHover={canScrollRight ? { scale: 1.05 } : {}}
                  whileTap={canScrollRight ? { scale: 0.95 } : {}}
                  aria-label="向右滚动"
                >
                  <FaChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 relative z-10 ${
                    canScrollRight ? 'text-foreground/80' : 'text-muted-foreground/50'
                  }`} />
                </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 轮播容器 - 与标题文字精确对齐，支持触摸滑动 */}
        <div className="relative w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="relative select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            <div 
              className={`flex ${isInitialized ? 'transition-transform duration-500 ease-out' : ''} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ 
                gap: `${carouselConfig.gap}px`,
                paddingLeft: `${carouselConfig.titleOffset}px`,
                paddingRight: carouselConfig.isMobile ? '16px' : '24px',
                transform: `translateX(-${currentIndex * (carouselConfig.cardWidth + carouselConfig.gap)}px)`,
                opacity: isInitialized ? 1 : 0,
                transition: isInitialized ? 'transform 500ms ease-out, opacity 300ms ease-out' : 'opacity 300ms ease-out'
              }}
            >
              {items.map((item, index) => renderCard(item, index))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default SimpleCarousel; 