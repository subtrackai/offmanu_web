"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaTag, FaCalendar } from "react-icons/fa";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date?: string;
  author?: string;
  link: string;
}

interface ContentGridProps {
  items: ContentItem[];
  viewMode: 'grid' | 'list';
  type: 'articles' | 'projects' | 'portfolio';
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, viewMode }) => {
  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const renderGridView = () => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={`${item.id}-${viewMode}`}
            variants={itemVariants}
            layout
            layoutId={`item-${item.id}`}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            whileTap={{ scale: 0.98 }}
            exit="exit"
          >
            <Link href={item.link} className="group block">
              <div className="space-y-base">
                {/* 1:1 Square Image */}
                <motion.div 
                  className="relative aspect-square overflow-hidden rounded-apple-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                </motion.div>

                {/* Content - Left aligned with image */}
                <motion.div 
                  className="space-y-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  {/* Title - at the top */}
                  <h3 className="text-body-large font-semibold text-foreground line-clamp-2 group-hover:text-link-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-text-secondary line-clamp-1">
                    {item.description}
                  </p>

                  {/* Date and Category - side by side */}
                  <div className="flex items-center gap-base text-caption text-text-secondary">
                    {item.date && (
                      <div className="flex items-center gap-xs">
                        <FaCalendar className="w-3 h-3" />
                        {item.date}
                      </div>
                    )}
                    <div className="flex items-center gap-xs">
                      <FaTag className="w-3 h-3" />
                      {item.category}
                    </div>
                  </div>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  const renderListView = () => (
    <motion.div 
      className="space-y-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div 
            key={`${item.id}-${viewMode}`}
            variants={itemVariants}
            layout
            layoutId={`item-${item.id}`}
            exit="exit"
          >
            <motion.div
              whileHover={{ 
                x: 8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.99 }}
            >
              <Link href={item.link} className="group block">
                <div className="py-lg">
                  <motion.div 
                    className="space-y-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    {/* Title */}
                    <h3 className="text-headline font-semibold text-foreground group-hover:text-link-blue transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-body text-text-secondary line-clamp-1">
                      {item.description}
                    </p>

                    {/* Date and Category - side by side */}
                    <div className="flex items-center gap-base text-caption text-text-secondary">
                      {item.date && (
                        <motion.div 
                          className="flex items-center gap-xs"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.3 }}
                        >
                          <FaCalendar className="w-3 h-3" />
                          {item.date}
                        </motion.div>
                      )}
                      <motion.div 
                        className="flex items-center gap-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.35 }}
                      >
                        <FaTag className="w-3 h-3" />
                        {item.category}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
            {/* Separator line - not shown after last item */}
            {index < items.length - 1 && (
              <motion.div 
                className="border-b border-border-light"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.05 + 0.4, duration: 0.3 }}
                style={{ originX: 0 }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1]
        }}
      >
        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContentGrid;