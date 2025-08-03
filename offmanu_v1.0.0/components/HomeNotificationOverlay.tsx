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
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay={true}
            onComplete={handleAnimationComplete}
            style={{ 
              width: '400px', 
              height: '400px'
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default HomeNotificationOverlay;