"use client";

import React from "react";
import Image from "next/image";

// 响应式配置常量
const CARD_CONFIG = {
  // 不同屏幕尺寸的卡片宽度
  WIDTH: {
    mobile: 240,    // 小屏幕
    tablet: 280,    // 平板
    desktop: 320    // 桌面
  },
  // 响应式间距
  GAP: {
    mobile: 16,     // 小屏幕间距
    tablet: 20,     // 平板间距  
    desktop: 24     // 桌面间距
  },
  MIN_COPIES: 3,
  RESIZE_THROTTLE: 100
} as const;

// 滚动策略配置 - 创造错位美学
const SCROLL_STRATEGIES = {
  speeds: ['30s', '45s', '35s'], // 不同速度
  delays: ['0s', '-15s', '-8s'], // 不同起始延迟
  directions: ['left', 'right', 'left'] as const, // 交替方向
  offsets: [0, 0.3, 0.6] // 错位偏移（相对于一个卡片周期）
} as const;

interface ScrollerItem {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
}

interface InfiniteScrollerProps {
  items: ScrollerItem[];
  rows?: number;
  spacing?: string;
  // speed 参数已移除 - 现在使用内置的错位滚动策略
  pauseOnHover?: boolean;
}

// 类型定义
type CardHoverProps = {
  uniqueKey: string;
  onHover: (uniqueKey: string, hovered: boolean) => void;
  isThisCardHovered: boolean;
  hasAnyCardHovered: boolean;
};

// 优化的卡片组件 - 分离关注点
const PortfolioCard = React.memo<ScrollerItem & CardHoverProps>(
  ({ title, description, image, gradient, uniqueKey, onHover, isThisCardHovered, hasAnyCardHovered }) => {
    // 悬停处理函数
    const handleMouseEnter = React.useCallback(() => onHover(uniqueKey, true), [uniqueKey, onHover]);
    const handleMouseLeave = React.useCallback(() => onHover(uniqueKey, false), [uniqueKey, onHover]);
    
    // 响应式动态样式计算
    const cardClassName = React.useMemo(() => 
      `relative w-[clamp(240px,30vw,320px)] aspect-[4/3] rounded-apple-xl overflow-hidden shadow-lg transition-all duration-500 flex-shrink-0 cursor-pointer group ${
        hasAnyCardHovered && !isThisCardHovered 
          ? 'blur-sm opacity-60 scale-95' 
          : 'blur-none opacity-100 scale-100'
      }`, [hasAnyCardHovered, isThisCardHovered]);

    return (
      <div 
        className={cardClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      <Image 
          src={image} 
          alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
        <div className={`absolute inset-0 ${gradient} mix-blend-multiply group-hover:opacity-80 transition-opacity duration-500`}></div>
      
      <div className={`absolute top-0 left-0 p-base text-white transition-all duration-500 ${
        isThisCardHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="space-y-xs">
          <h3 className="text-body-large font-bold leading-tight">
            {title}
          </h3>
          <p className="text-caption opacity-90 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
    );
  }
);

PortfolioCard.displayName = 'PortfolioCard';

// 获取当前屏幕尺寸对应的配置
const getCurrentConfig = (screenWidth: number) => {
  if (screenWidth < 640) { // sm breakpoint
    return {
      width: CARD_CONFIG.WIDTH.mobile,
      gap: CARD_CONFIG.GAP.mobile
    };
  } else if (screenWidth < 768) { // md breakpoint
    return {
      width: CARD_CONFIG.WIDTH.tablet,
      gap: CARD_CONFIG.GAP.tablet
    };
    } else {
    return {
      width: CARD_CONFIG.WIDTH.desktop,
      gap: CARD_CONFIG.GAP.desktop
    };
  }
};

// 自定义Hook：计算最小副本数
const useMinCopies = (itemsLength: number) => {
  const [minCopies, setMinCopies] = React.useState<number>(CARD_CONFIG.MIN_COPIES);

  React.useEffect(() => {
    const calculateCopies = () => {
      const screenWidth = window.innerWidth;
      const config = getCurrentConfig(screenWidth);
      const cardWithGap = config.width + config.gap;
      const calculated = Math.ceil(screenWidth / cardWithGap / itemsLength) + 2;
      setMinCopies(Math.max(calculated, CARD_CONFIG.MIN_COPIES));
    };

    // 节流处理
    let timeoutId: NodeJS.Timeout;
    const throttledCalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateCopies, CARD_CONFIG.RESIZE_THROTTLE);
    };

    calculateCopies();
    window.addEventListener('resize', throttledCalculate);
    
    return () => {
      window.removeEventListener('resize', throttledCalculate);
      clearTimeout(timeoutId);
    };
  }, [itemsLength]);

  return minCopies;
};

// 自定义Hook：检查行暂停状态
const useRowPauseStatus = (globalHoveredCard: string | null, items: ScrollerItem[]) => {
  return React.useMemo(() => 
    globalHoveredCard !== null && 
    items.some(item => globalHoveredCard.includes(`-${item.id}-`)),
    [globalHoveredCard, items]
  );
};

// 响应式样式生成函数 - 支持错位滚动
const generateMarqueeStyles = (
  direction: 'left' | 'right', 
  speed: string, 
  itemsLength: number, 
  isRowPaused: boolean, 
  pauseOnHover: boolean,
  delay: string = '0s',
  rowIndex: number = 0
) => {
  // 计算错位偏移
  const offset = SCROLL_STRATEGIES.offsets[rowIndex % SCROLL_STRATEGIES.offsets.length];
  
  return `
    .marquee-container-${rowIndex} {
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .marquee-content-${rowIndex} {
      display: flex;
      animation: scroll-${direction}-${rowIndex} ${speed} linear infinite;
      animation-delay: ${delay};
      animation-play-state: ${(pauseOnHover && isRowPaused) ? 'paused' : 'running'};
      will-change: transform;
      gap: clamp(16px, 2vw, 24px); /* Apple标准基础间距 */
    }

    /* 移动端动画关键帧 */
    @keyframes scroll-left-${rowIndex} {
      0% { 
        transform: translateX(calc(${offset} * (calc(-240px * ${itemsLength} - 16px * ${itemsLength})))); 
      }
      100% { 
        transform: translateX(calc(${offset} * (calc(-240px * ${itemsLength} - 16px * ${itemsLength})) + calc(-240px * ${itemsLength} - 16px * ${itemsLength}))); 
      }
    }

    @keyframes scroll-right-${rowIndex} {
      0% { 
        transform: translateX(calc(${offset} * (calc(-240px * ${itemsLength} - 16px * ${itemsLength})) + calc(-240px * ${itemsLength} - 16px * ${itemsLength}))); 
      }
      100% { 
        transform: translateX(calc(${offset} * (calc(-240px * ${itemsLength} - 16px * ${itemsLength})))); 
      }
    }

    /* 平板端动画覆盖 */
    @media (min-width: 640px) {
      @keyframes scroll-left-${rowIndex} {
        0% { 
          transform: translateX(calc(${offset} * (calc(-280px * ${itemsLength} - 20px * ${itemsLength})))); 
        }
        100% { 
          transform: translateX(calc(${offset} * (calc(-280px * ${itemsLength} - 20px * ${itemsLength})) + calc(-280px * ${itemsLength} - 20px * ${itemsLength}))); 
        }
      }

      @keyframes scroll-right-${rowIndex} {
        0% { 
          transform: translateX(calc(${offset} * (calc(-280px * ${itemsLength} - 20px * ${itemsLength})) + calc(-280px * ${itemsLength} - 20px * ${itemsLength}))); 
        }
        100% { 
          transform: translateX(calc(${offset} * (calc(-280px * ${itemsLength} - 20px * ${itemsLength})))); 
        }
      }
    }

    /* 桌面端动画覆盖 */
    @media (min-width: 768px) {
      @keyframes scroll-left-${rowIndex} {
        0% { 
          transform: translateX(calc(${offset} * (calc(-320px * ${itemsLength} - 24px * ${itemsLength})))); 
        }
        100% { 
          transform: translateX(calc(${offset} * (calc(-320px * ${itemsLength} - 24px * ${itemsLength})) + calc(-320px * ${itemsLength} - 24px * ${itemsLength}))); 
        }
      }

      @keyframes scroll-right-${rowIndex} {
        0% { 
          transform: translateX(calc(${offset} * (calc(-320px * ${itemsLength} - 24px * ${itemsLength})) + calc(-320px * ${itemsLength} - 24px * ${itemsLength}))); 
        }
        100% { 
          transform: translateX(calc(${offset} * (calc(-320px * ${itemsLength} - 24px * ${itemsLength})))); 
        }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee-content-${rowIndex} {
        animation-play-state: paused !important;
      }
    }
  `;
};

// 优化的无限循环行组件 - 支持错位滚动
type InfiniteRowProps = {
  items: ScrollerItem[];
  direction: 'left' | 'right';
  speed: string;
  pauseOnHover: boolean;
  globalHoveredCard: string | null;
  onCardHover: (uniqueKey: string | null) => void;
  rowIndex: number; // 新增：行索引用于错位效果
  delay?: string; // 新增：动画延迟
};

const InfiniteRow = React.memo<InfiniteRowProps>(({ 
  items, 
  direction, 
  speed, 
  pauseOnHover, 
  globalHoveredCard, 
  onCardHover, 
  rowIndex, 
  delay = '0s' 
}) => {
  // 使用自定义Hooks
  const minCopies = useMinCopies(items.length);
  const isRowPaused = useRowPauseStatus(globalHoveredCard, items);
  
  // 缓存样式 - 包含错位参数
  const marqueeStyles = React.useMemo(
    () => generateMarqueeStyles(direction, speed, items.length, isRowPaused, pauseOnHover, delay, rowIndex),
    [direction, speed, items.length, isRowPaused, pauseOnHover, delay, rowIndex]
  );

  // 渲染卡片列表
  const renderCards = React.useMemo(() => 
    Array.from({ length: minCopies }, (_, copyIndex) =>
      items.map((item, itemIndex) => {
        const uniqueKey = `${copyIndex}-${item.id}-${itemIndex}`;
        return (
          <PortfolioCard
            key={uniqueKey}
            {...item}
            uniqueKey={uniqueKey}
            isThisCardHovered={globalHoveredCard === uniqueKey}
            hasAnyCardHovered={globalHoveredCard !== null}
            onHover={(key, hovered) => onCardHover(hovered ? key : null)}
          />
        );
      })
    ).flat(),
    [minCopies, items, globalHoveredCard, onCardHover]
  );

  return (
    <div className={`marquee-container-${rowIndex}`}>
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />

      <div className={`marquee-content-${rowIndex}`}>
        {renderCards}
      </div>
    </div>
  );
});

InfiniteRow.displayName = 'InfiniteRow';

// 数据分配Hook
const useItemDistribution = (items: ScrollerItem[], rows: number) => {
  return React.useMemo(() => {
    const result: ScrollerItem[][] = Array.from({ length: rows }, () => []);
    
    // 平均分配到各行
    items.forEach((item, index) => {
      result[index % rows].push(item);
    });
    
    // 确保每行至少有足够项目进行无限循环
    result.forEach((row) => {
      while (row.length < CARD_CONFIG.MIN_COPIES) {
        row.push(...items.slice(0, Math.min(CARD_CONFIG.MIN_COPIES - row.length, items.length)));
      }
    });
    
    return result;
  }, [items, rows]);
};

// 主组件 - 错位滚动策划
const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  items,
  rows = 3,
  pauseOnHover = true
}) => {
  // 全局悬停状态
  const [globalHoveredCard, setGlobalHoveredCard] = React.useState<string | null>(null);

  // 使用自定义Hook分配数据
  const itemsByRow = useItemDistribution(items, rows);

  // 悬停处理函数
  const handleCardHover = React.useCallback((uniqueKey: string | null) => {
    setGlobalHoveredCard(uniqueKey);
  }, []);

  // 获取错位滚动配置
  const getRowConfig = React.useCallback((index: number) => ({
    direction: SCROLL_STRATEGIES.directions[index % SCROLL_STRATEGIES.directions.length],
    speed: SCROLL_STRATEGIES.speeds[index % SCROLL_STRATEGIES.speeds.length],
    delay: SCROLL_STRATEGIES.delays[index % SCROLL_STRATEGIES.delays.length]
  }), []);
            
            return (
    <div className="relative w-full overflow-hidden">
      {/* 错位三行无限循环 - 紧凑间距 */}
      <div className="space-y-sm py-xs">
        {itemsByRow.map((rowItems, index) => {
          const rowConfig = getRowConfig(index);
          return (
            <InfiniteRow
              key={index}
              items={rowItems}
              direction={rowConfig.direction}
              speed={rowConfig.speed}
              delay={rowConfig.delay}
              pauseOnHover={pauseOnHover}
              globalHoveredCard={globalHoveredCard}
              onCardHover={handleCardHover}
              rowIndex={index}
            />
            );
          })}
      </div>
    </div>
  );
};

export default InfiniteScroller;








