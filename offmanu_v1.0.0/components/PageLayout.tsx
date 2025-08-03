"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

interface PageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  showBackButton?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = "",
  showBackButton = true
}) => {
  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-geist-sans)]">
      {/* Page Header */}
      <section className={`py-xl bg-background ${className}`}>
        <div className="max-w-[1400px] mx-auto px-base mb-md">
          {/* Back Button */}
          {showBackButton && (
            <div className="mb-base">
              <Link 
                href="/" 
                className="inline-flex items-center gap-sm text-body text-text-secondary"
              >
                <div className="w-10 h-10 bg-section-bg dark:bg-gray-800 border border-border-light dark:border-gray-600 rounded-full flex items-center justify-center">
                  <FiArrowLeft className="w-4 h-4 text-foreground" />
                </div>
                <span className="font-medium">返回首页</span>
              </Link>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-title-large font-bold text-foreground mb-xs">{title}</h1>
              <p className="text-body-large text-text-secondary">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="max-w-[1400px] mx-auto px-base">
          {children}
        </div>
      </section>
    </div>
  );
};

export default PageLayout;