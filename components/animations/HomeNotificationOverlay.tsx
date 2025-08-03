"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";

const HomeNotificationOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // 动态加载Lottie动画数据
    const loadAnimation = async () => {
      try {
        const response = await fetch('/lottile/Notification.json');
        const data = await response.json();
        setAnimationData(data);
        console.log('Lottie animation loaded successfully');
      } catch (error) {
        console.error('Failed to load Lottie animation:', error);
        // 如果加载失败，立即隐藏
        setIsVisible(false);
      }
    };

    loadAnimation();
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed');
    // 动画播放完成后立即消失
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* 响应式通知动画 - 小屏幕全宽，大屏幕50% */}
      <div className="flex justify-center px-base">
        <div className="w-full max-w-[1400px] lg:max-w-[700px] relative">
          <div className="w-full h-64 sm:h-80 lg:h-40">
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={false}
                autoplay={true}
                onComplete={handleAnimationComplete}
                className="w-full h-full object-contain"
                style={{ 
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNotificationOverlay;