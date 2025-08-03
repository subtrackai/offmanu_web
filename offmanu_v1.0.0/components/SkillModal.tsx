"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface SkillItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillItem | null;
  detailContent?: {
    overview: string;
    keyPoints: string[];
    achievements: string[];
    tools: string[];
  };
}

const SkillModal = ({ isOpen, onClose, skill, detailContent }: SkillModalProps) => {
  // 监听 ESC 键关闭弹窗
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 动画变量
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && skill && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
        >
          {/* 背景遮罩 */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* 弹窗内容 */}
          <motion.div 
            className="relative w-full max-w-2xl mx-4 bg-background rounded-apple-xl max-h-[90vh] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* 头部 */}
            <motion.div 
              className="flex items-center justify-between p-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex items-center gap-base">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-apple flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <div className="text-xl text-blue-600 dark:text-blue-400">
                    {skill.icon}
                  </div>
                </motion.div>
                <motion.h2 
                  className="text-title font-bold text-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  {skill.title}
                </motion.h2>
              </div>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-section-bg flex items-center justify-center hover:bg-section-bg-darker transition-colors duration-200"
                aria-label="关闭弹窗"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes className="w-4 h-4 text-text-secondary" />
              </motion.button>
            </motion.div>

            {/* 内容区域 */}
            <motion.div 
              className="p-lg overflow-y-auto max-h-[calc(90vh-120px)]"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* 概述 */}
              <motion.div 
                className="mb-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="text-headline font-bold text-foreground mb-sm">概述</h3>
                <p className="text-body text-text-secondary leading-relaxed">
                  {detailContent?.overview || skill.description}
                </p>
              </motion.div>

              {/* 关键要点 */}
              {detailContent?.keyPoints && detailContent.keyPoints.length > 0 && (
                <motion.div 
                  className="mb-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <h3 className="text-headline font-bold text-foreground mb-sm">核心能力</h3>
                  <div className="space-y-sm">
                    {detailContent.keyPoints.map((point, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start gap-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      >
                        <div className="w-2 h-2 bg-link-blue rounded-full mt-2 flex-shrink-0" />
                        <p className="text-body text-text-secondary leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 主要成就 */}
              {detailContent?.achievements && detailContent.achievements.length > 0 && (
                <motion.div 
                  className="mb-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <h3 className="text-headline font-bold text-foreground mb-sm">主要成就</h3>
                  <div className="space-y-sm">
                    {detailContent.achievements.map((achievement, index) => (
                      <motion.div 
                        key={index} 
                        className="bg-section-bg rounded-apple p-sm"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      >
                        <p className="text-body text-foreground">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 工具技能 */}
              {detailContent?.tools && detailContent.tools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <h3 className="text-headline font-bold text-foreground mb-sm">相关工具</h3>
                  <div className="flex flex-wrap gap-xs">
                    {detailContent.tools.map((tool, index) => (
                      <motion.span 
                        key={index} 
                        className="px-sm py-micro bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-caption font-medium text-blue-700 dark:text-blue-300 rounded-apple"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05, duration: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkillModal;