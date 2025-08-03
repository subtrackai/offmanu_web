"use client";

import { FiGithub, FiMail, FiExternalLink } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFigma, SiX, SiLinkedin } from "react-icons/si";
import SimpleCarousel from "../components/SimpleCarousel";
import InfiniteScroller from "../components/InfiniteScroller";
import AICard from "../components/AICard";
import { HomeNotificationOverlay } from "../components/animations";

export default function Home() {
  // 精选项目数据
  const featuredProjects = [
    {
      id: 1,
      title: "现代化电商平台",
      description: "基于Next.js构建的全栈电商解决方案，包含用户管理、商品展示、购物车、支付集成等完整功能。采用现代化的设计语言和流畅的用户体验。",
      category: "Web应用",
      link: "/projects/ecommerce-platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "智能数据分析平台",
      description: "企业级数据可视化和分析平台，支持多种数据源接入，提供实时图表、报告生成、智能预测等功能。帮助企业做出数据驱动的决策。",
      category: "数据分析",
      link: "/projects/data-platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "移动端设计系统",
      description: "为移动应用构建的完整设计系统，包含组件库、设计规范、交互指南等。提升开发效率，保证设计一致性。",
      category: "设计系统",
      link: "/projects/mobile-design-system",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "AI聊天机器人",
      description: "基于最新AI技术的智能对话系统，支持多轮对话、上下文理解、个性化回复等功能。可广泛应用于客服、教育等场景。",
      category: "人工智能",
      link: "/projects/ai-chatbot",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
    }
  ];

  // 最新文章数据
  const latestArticles = [
    {
      id: 1,
      title: "React 18 新特性深度解析",
      description: "深入探讨React 18中的并发特性、Suspense改进、以及新的Hooks API，通过实际案例展示如何在项目中应用这些新功能。",
      date: "2024年1月15日",
      author: "张三",
      category: "React",
      link: "/articles/react-18-features",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "构建现代化设计系统的最佳实践",
      description: "从零开始构建可扩展的设计系统，包括颜色规范、字体层级、组件库设计，以及如何在团队中有效推广和维护。",
      date: "2024年1月10日",
      author: "张三",
      category: "设计系统",
      link: "/articles/design-system-best-practices",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Next.js 性能优化完全指南",
      description: "全面的Next.js性能优化策略，涵盖图片优化、代码分割、缓存策略、服务端渲染优化等关键技术点。",
      date: "2024年1月5日",
      author: "张三",
      category: "Next.js",
      link: "/articles/nextjs-performance-optimization",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "TypeScript 高级类型系统实战",
      description: "深入学习TypeScript的高级类型特性，包括条件类型、映射类型、模板字面量类型等，提升代码的类型安全性。",
      date: "2023年12月28日",
      author: "张三",
      category: "TypeScript",
      link: "/articles/typescript-advanced-types",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "TypeScript 高级类型系统实战",
      description: "深入学习TypeScript的高级类型特性，包括条件类型、映射类型、模板字面量类型等，提升代码的类型安全性。",
      date: "2023年12月28日",
      author: "张三",
      category: "TypeScript",
      link: "/articles/typescript-advanced-types",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "TypeScript 高级类型系统实战",
      description: "深入学习TypeScript的高级类型特性，包括条件类型、映射类型、模板字面量类型等，提升代码的类型安全性。",
      date: "2023年12月28日",
      author: "张三",
      category: "TypeScript",
      link: "/articles/typescript-advanced-types",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
    },
    {
      id: 7,
      title: "TypeScript 高级类型系统实战",
      description: "深入学习TypeScript的高级类型特性，包括条件类型、映射类型、模板字面量类型等，提升代码的类型安全性。",
      date: "2023年12月28日",
      author: "张三",
      category: "TypeScript",
      link: "/articles/typescript-advanced-types",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
    }
  ];

  // 作品展示数据
  const portfolioItems = [
    {
      id: 1,
      title: "移动端音乐应用",
      description: "简洁现代的音乐播放器界面设计，支持多种音频格式和智能推荐",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-orange-500/90 to-red-500/80"
    },
    {
      id: 2,
      title: "任务管理系统",
      description: "团队协作的项目管理工具，提升工作效率和团队沟通",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-indigo-500/90 to-purple-500/80"
    },
    {
      id: 3,
      title: "微服务架构",
      description: "高性能的后端服务解决方案，支持高并发和弹性扩展",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-teal-500/90 to-green-500/80"
    },
    {
      id: 4,
      title: "品牌视觉系统",
      description: "完整的企业品牌识别设计，包含Logo、配色和应用规范",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-pink-500/90 to-rose-500/80"
    },
    {
      id: 5,
      title: "企业官网重构",
      description: "现代化的企业展示网站，响应式设计和SEO优化",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-amber-500/90 to-orange-500/80"
    },
    {
      id: 6,
      title: "组件库开发",
      description: "可复用的React组件库，提供统一的设计语言和开发规范",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-violet-500/90 to-purple-500/80"
    },
    {
      id: 7,
      title: "数据可视化平台",
      description: "企业级数据分析和展示系统，支持多维度数据挖掘",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-blue-500/90 to-cyan-500/80"
    },
    {
      id: 8,
      title: "移动端购物应用",
      description: "流畅的电商购物体验设计，支付安全和用户体验并重",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-emerald-500/90 to-teal-500/80"
    },
    {
      id: 9,
      title: "智能聊天机器人",
      description: "基于AI的客服解决方案，自然语言处理和智能回复",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
      gradient: "bg-gradient-to-br from-purple-500/90 to-indigo-500/80"
    }
  ];

  return (
    <>
      {/* Home Notification Animation - Independent Overlay */}
      <HomeNotificationOverlay />
      
      <div className="min-h-screen bg-background font-[family-name:var(--font-geist-sans)]">
        {/* Personal Banner Section */}
      <section id="banner" className="py-xl bg-background animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-base mb-md">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-title-large font-bold text-foreground mb-xs">OFCHEN HOME</h2>
              <p className="text-body-large text-text-secondary">
                欢迎来到我的数字世界，探索创意与技术的完美融合
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-base">
          <div className="grid lg:grid-cols-12 gap-base">
            {/* Main Introduction Card */}
            <div className="lg:col-span-5">
              <div className="bg-background rounded-apple-xl p-md border border-border-light transition-all duration-500 card-hover relative">
                {/* About Me Button */}
                <a
                  href="/about"
                  className="absolute top-md right-md w-10 h-10 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-foreground transition-all duration-200 group"
                  title="关于我"
                >
                  <FiExternalLink className="w-4 h-4 text-text-secondary group-hover:text-foreground transition-colors" />
                </a>
                <div className="space-y-base">
                  {/* Profile Section */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative">
                      <AICard />
                    </div>
                    <div>
                      <h1 className="text-title font-bold text-foreground">PENGYIN CHEN</h1>
                      <p className="text-body text-text-secondary">游戏技术&美术/Technical Artist</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-xs">
                    <span className="px-sm py-micro bg-section-bg text-caption rounded-full border border-border-light">Product Designer</span>
                    <span className="px-sm py-micro bg-section-bg text-caption rounded-full border border-border-light">Founder</span>
                    <span className="px-sm py-micro bg-section-bg text-caption rounded-full border border-border-light">AI Enthusiast</span>
                    <span className="px-sm py-micro bg-section-bg text-caption rounded-full border border-border-light">Tech Lover</span>
                  </div>

                  {/* Description */}
                  <div className="space-y-xs">
                    <h2 className="text-headline font-bold text-foreground">HOLA</h2>
                    <p className="text-body text-text-secondary leading-relaxed">
                      欢迎来到我的世界！我专注于创造优雅而实用的数字体验，
                      将创意想法转化为高质量的Web应用程序和用户界面。
                    </p>
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-sm">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                      title="GitHub"
                    >
                      <FiGithub className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                      title="X (Twitter)"
                    >
                      <SiX className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                      title="LinkedIn"
                    >
                      <SiLinkedin className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                    </a>
                    <a
                      href="mailto:your.email@example.com"
                      className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                      title="Email"
                    >
                      <FiMail className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-apple-xl p-md border border-border-light transition-all duration-500 card-hover h-full">
                <div className="space-y-base">
                  <h3 className="text-headline font-semibold text-foreground mb-xs">技术栈</h3>
                  
                  {/* Tech Icons Grid */}
                  <div className="grid grid-cols-3 gap-sm">
                    <div className="w-16 h-16 bg-background rounded-apple-lg flex items-center justify-center transition-all hover:-translate-y-1">
                      <SiReact className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="w-16 h-16 bg-background rounded-apple-lg flex items-center justify-center transition-all hover:-translate-y-1">
                      <SiNextdotjs className="w-8 h-8 text-foreground" />
                    </div>
                    <div className="w-16 h-16 bg-background rounded-apple-lg flex items-center justify-center transition-all hover:-translate-y-1">
                      <SiTypescript className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="w-16 h-16 bg-background rounded-apple-lg flex items-center justify-center transition-all hover:-translate-y-1">
                      <SiTailwindcss className="w-8 h-8 text-cyan-500" />
                    </div>
                    <div className="w-16 h-16 bg-background rounded-apple-lg flex items-center justify-center transition-all hover:-translate-y-1">
                      <SiNodedotjs className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="w-16 h-16 bg-background rounded-apple-lg flex items-center justify-center transition-all hover:-translate-y-1">
                      <SiFigma className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>

                  {/* Work Console */}
                  <div className="bg-background/50 rounded-apple p-sm border border-border-light">
                    <div className="flex items-center gap-xs mb-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-caption text-text-secondary ml-xs">Work Console</span>
                    </div>
                    <div className="text-caption font-mono text-text-secondary">
                      <div>$ npm run dev</div>
                      <div className="text-green-500">✓ Ready on http://localhost:3000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Card */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-apple-xl p-md border border-border-light transition-all duration-500 card-hover h-full text-white">
                <div className="space-y-base">
                  <div className="text-center">
                    <h3 className="text-title font-bold mb-xs">OFF-Manu</h3>
                    <div className="inline-flex px-sm py-xs bg-white/10 rounded-full text-caption">
                      www.off-manu.com
                    </div>
                  </div>
                  
                  <div className="space-y-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-body text-white/80">项目完成</span>
                      <span className="text-headline font-bold text-link-blue">50+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body text-white/80">工作经验</span>
                      <span className="text-headline font-bold text-link-blue">3年+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body text-white/80">客户满意度</span>
                      <span className="text-headline font-bold text-link-blue">100%</span>
                    </div>
                  </div>

                    <div className="pt-sm border-t border-white/10">
                      <span className="px-sm py-micro bg-white/10 text-caption rounded-full">
                        Entrepreneurial Journey
                      </span>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Fun Elements */}
          <div className="grid md:grid-cols-2 gap-base mt-base">
            {/* Creative Showcase */}
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-apple-xl p-md text-white transition-all duration-500 card-hover relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse-slow"></div>
        </div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-base">
                  <div className="space-y-xs">
                    <div className="flex items-center gap-xs">
                      <div className="w-10 h-10 bg-white/20 rounded-apple flex items-center justify-center backdrop-blur-sm">
                        <div className="text-xl">✨</div>
                      </div>
                      <h3 className="text-headline font-bold">创意工作室</h3>
                    </div>
                    <p className="text-body opacity-90 leading-relaxed max-w-xs">
                      将想象力转化为现实，用设计讲述故事，创造有温度的数字体验
          </p>
        </div>
                  <div className="text-5xl animate-float">🎨</div>
                </div>

                {/* Creative stats */}
                <div className="grid grid-cols-3 gap-sm mb-base">
                  <div className="text-center">
                    <div className="text-title font-bold">15+</div>
                    <div className="text-caption opacity-80">设计项目</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title font-bold">8</div>
                    <div className="text-caption opacity-80">设计奖项</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title font-bold">100%</div>
                    <div className="text-caption opacity-80">客户好评</div>
                  </div>
                </div>

                {/* Creative tools */}
                <div className="space-y-xs">
                  <h4 className="text-body font-semibold opacity-90">媒体</h4>
                  <div className="flex gap-xs">
                    <div className="px-sm py-micro bg-white/20 rounded-full text-caption backdrop-blur-sm">Figma</div>
                    <div className="px-sm py-micro bg-white/20 rounded-full text-caption backdrop-blur-sm">Sketch</div>
                    <div className="px-sm py-micro bg-white/20 rounded-full text-caption backdrop-blur-sm">Adobe CC</div>
                  </div>
                </div>

                {/* Floating design elements */}
                <div className="absolute top-4 right-20 w-6 h-6 bg-white/30 rounded-full animate-bounce-gentle"></div>
                <div className="absolute bottom-8 right-12 w-4 h-4 bg-white/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-16 right-8 w-3 h-3 bg-white/25 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* App Collection */}
            <div className="bg-background rounded-apple-xl p-md border border-border-light transition-all duration-500 card-hover">
              <div className="space-y-sm">
                <h3 className="text-headline font-semibold text-foreground">常用工具</h3>
                <div className="grid grid-cols-5 gap-xs">
                  <div className="w-12 h-12 bg-blue-500 rounded-apple flex items-center justify-center text-white text-lg">A</div>
                  <div className="w-12 h-12 bg-green-500 rounded-apple flex items-center justify-center text-white text-lg">🔄</div>
                  <div className="w-12 h-12 bg-purple-500 rounded-apple flex items-center justify-center text-white text-lg">🎯</div>
                  <div className="w-12 h-12 bg-orange-500 rounded-apple flex items-center justify-center text-white text-lg">🦊</div>
                  <div className="w-12 h-12 bg-red-500 rounded-apple flex items-center justify-center text-white text-lg">📱</div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-apple flex items-center justify-center text-white text-lg">⚡</div>
                  <div className="w-12 h-12 bg-pink-500 rounded-apple flex items-center justify-center text-white text-lg">🎵</div>
                  <div className="w-12 h-12 bg-indigo-500 rounded-apple flex items-center justify-center text-white text-lg">📊</div>
                  <div className="w-12 h-12 bg-teal-500 rounded-apple flex items-center justify-center text-white text-lg">🌟</div>
                  <div className="w-12 h-12 bg-cyan-500 rounded-apple flex items-center justify-center text-white text-lg">🚀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Featured Projects Section */}
      <SimpleCarousel
        title="精选项目"
        subtitle="这些是我最引以为豪的项目，展示了我在不同技术栈和设计理念上的探索"
        type="projects"
        items={featuredProjects}
        className="bg-section-bg"
      />

            {/* Latest Articles Section */}
      <SimpleCarousel
        title="最新文章"
        subtitle="分享我在开发过程中的思考、学习和实践经验"
        type="articles"
        items={latestArticles}
        className="bg-background"
      />

      {/* Portfolio Showcase Section */}
      <section id="portfolio" className="py-xl bg-section-bg animate-slide-up">
        <div className="max-w-[1400px] mx-auto px-base mb-md">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <h2 className="text-title-large font-bold text-foreground mb-xs">作品展示</h2>
                <a 
                  href="/portfolio" 
                  className="ml-4 text-body text-text-secondary hover:text-foreground transition-colors duration-200 whitespace-nowrap flex-shrink-0 flex items-center gap-1"
                >
                  查看全部
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <p className="text-body-large text-text-secondary">
                从概念到实现，每个项目都体现了我对技术和设计的理解与追求
              </p>
            </div>
          </div>
        </div>
        <InfiniteScroller
          items={portfolioItems}
          rows={3}
          pauseOnHover={true}
        />
      </section>

      </div>
    </>
  );
}

