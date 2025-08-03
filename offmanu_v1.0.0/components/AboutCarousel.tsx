"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import SkillModal from "./SkillModal";

interface SkillItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SkillDetailContent {
  overview: string;
  keyPoints: string[];
  achievements: string[];
  tools: string[];
}

interface AboutCarouselProps {
  title: string;
  subtitle?: string;
  items: SkillItem[];
  className?: string;
  skillDetails?: Record<number, SkillDetailContent>;
}

const AboutCarousel = ({ title, subtitle, items, className = "", skillDetails }: AboutCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, index: 0 });
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // 处理弹窗
  const handleOpenModal = (skill: SkillItem) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
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

  const renderCard = (item: SkillItem) => {
    return (
      <div
        key={item.id}
        className="flex-shrink-0"
        style={{ 
          width: carouselConfig.cardWidth,
          height: carouselConfig.cardWidth
        }}
      >
        <div className="bg-section-bg rounded-apple-xl p-lg border border-border-light w-full h-full flex flex-col bg-cover bg-center bg-no-repeat relative overflow-hidden"
             style={{
               backgroundImage: `url('/images/skill-bg-${item.id}.jpg')`
             }}>
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 rounded-apple-xl"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Title */}
            <h3 className="text-headline font-bold text-white mb-sm text-left leading-tight drop-shadow-lg">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-body text-white/90 leading-relaxed text-left line-clamp-4 drop-shadow-md">
              {item.description}
            </p>

            {/* Plus Button - 右下角 */}
            <div className="mt-auto ml-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(item);
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
                aria-label={`查看${item.title}详情`}
              >
                <FaPlus className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>


        </div>
      </div>
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
              {/* 桌面端控制按钮 */}
              {!carouselConfig.isMobile && (
                <div className="flex items-center space-x-xs">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                    canScrollLeft 
                      ? 'bg-section-bg border-border-light hover:bg-section-bg-darker cursor-pointer' 
                      : 'bg-section-bg/50 border-border-light/50 opacity-50 cursor-not-allowed'
                  }`}
                  aria-label="向左滚动"
                >
                  <FaChevronLeft className={`w-4 h-4 transition-colors duration-200 ${
                    canScrollLeft ? 'text-text-secondary hover:text-foreground' : 'text-text-tertiary'
                  }`} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                    canScrollRight 
                      ? 'bg-section-bg border-border-light hover:bg-section-bg-darker cursor-pointer' 
                      : 'bg-section-bg/50 border-border-light/50 opacity-50 cursor-not-allowed'
                  }`}
                  aria-label="向右滚动"
                >
                  <FaChevronRight className={`w-4 h-4 transition-colors duration-200 ${
                    canScrollRight ? 'text-text-secondary hover:text-foreground' : 'text-text-tertiary'
                  }`} />
                </button>
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
              {items.map((item) => renderCard(item))}
            </div>
          </div>
        </div>


      </div>

      {/* 弹窗组件 */}
      <SkillModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        skill={selectedSkill}
        detailContent={selectedSkill && skillDetails ? skillDetails[selectedSkill.id] : undefined}
      />
    </section>
  );
};

export default AboutCarousel; 