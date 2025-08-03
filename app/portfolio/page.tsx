"use client";

import React from "react";
import PageLayout from "../../components/PageLayout";
import PortfolioGrid from "../../components/PortfolioGrid";
import PortfolioStats from "../../components/PortfolioStats";

// 作者信息数据
const portfolioInfo = {
  author: {
    name: "张设计师",
    title: "UI/UX 设计师 & 前端开发者",
    location: "北京，中国",
    experience: "5年+"
  },
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center"
};

// 作品集数据 - 增强版
const portfolioItems = [
  {
    id: 1,
    title: "移动端音乐应用",
    description: "简洁现代的音乐播放器界面设计，支持多种音频格式和智能推荐。采用Material Design 3设计语言，提供沉浸式的音乐体验。",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-orange-500/90 to-red-500/80",
    category: "移动应用",
    tags: ["React Native", "UI/UX", "音乐"]
  },
  {
    id: 2,
    title: "任务管理系统",
    description: "团队协作的项目管理工具，提升工作效率和团队沟通。支持甘特图、看板视图、时间跟踪等功能。",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-indigo-500/90 to-purple-500/80",
    category: "Web应用",
    tags: ["React", "Node.js", "协作"]
  },
  {
    id: 3,
    title: "微服务架构",
    description: "高性能的后端服务解决方案，支持高并发和弹性扩展。采用Docker容器化部署，支持自动扩缩容。",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-teal-500/90 to-green-500/80",
    category: "后端架构",
    tags: ["Docker", "K8s", "微服务"]
  },
  {
    id: 4,
    title: "品牌视觉系统",
    description: "完整的企业品牌识别设计，包含Logo、配色和应用规范。建立统一的视觉语言，提升品牌认知度。",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-pink-500/90 to-rose-500/80",
    category: "品牌设计",
    tags: ["Branding", "Logo", "VI设计"]
  },
  {
    id: 5,
    title: "企业官网重构",
    description: "现代化的企业展示网站，响应式设计和SEO优化。采用Jamstack架构，实现极致的加载速度。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-amber-500/90 to-orange-500/80",
    category: "企业网站",
    tags: ["Next.js", "SEO", "响应式"]
  },
  {
    id: 6,
    title: "组件库开发",
    description: "可复用的React组件库，提供统一的设计语言和开发规范。支持主题定制、无障碍访问等特性。",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-violet-500/90 to-purple-500/80",
    category: "组件库",
    tags: ["React", "TypeScript", "Storybook"]
  },
  {
    id: 7,
    title: "数据可视化平台",
    description: "企业级数据分析和展示系统，支持多维度数据挖掘。提供丰富的图表类型和交互式仪表板。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-blue-500/90 to-cyan-500/80",
    category: "数据分析",
    tags: ["D3.js", "Charts", "BI"]
  },
  {
    id: 8,
    title: "移动端购物应用",
    description: "流畅的电商购物体验设计，支付安全和用户体验并重。集成多种支付方式，支持优惠券和积分系统。",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-emerald-500/90 to-teal-500/80",
    category: "电商应用",
    tags: ["Flutter", "支付", "电商"]
  },
  {
    id: 9,
    title: "智能聊天机器人",
    description: "基于AI的客服解决方案，自然语言处理和智能回复。支持多轮对话、情感分析和知识库管理。",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-purple-500/90 to-indigo-500/80",
    category: "人工智能",
    tags: ["AI", "NLP", "ChatBot"]
  },
  {
    id: 10,
    title: "金融数据分析",
    description: "专业的金融数据处理和分析工具，支持实时监控和预测。提供风险评估、投资组合分析等功能。",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-green-500/90 to-emerald-500/80",
    category: "金融科技",
    tags: ["FinTech", "大数据", "量化"]
  },
  {
    id: 11,
    title: "社交媒体平台",
    description: "现代化的社交网络应用，支持多媒体内容分享和实时互动。采用WebRTC技术实现视频通话功能。",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-rose-500/90 to-pink-500/80",
    category: "社交平台",
    tags: ["Social", "WebRTC", "实时通信"]
  },
  {
    id: 12,
    title: "云存储服务",
    description: "安全可靠的云端存储解决方案，支持文件同步和协作。提供版本控制、权限管理等企业级功能。",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center",
    gradient: "bg-gradient-to-br from-sky-500/90 to-blue-500/80",
    category: "云服务",
    tags: ["Cloud", "存储", "协作"]
  }
];

export default function PortfolioPage() {
  return (
    <PageLayout
      title="作品集"
      subtitle="从概念到实现，每个项目都体现了我对技术和设计的理解与追求"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Portfolio Info */}
        <PortfolioStats portfolioInfo={portfolioInfo} />

        {/* Portfolio Grid */}
        <PortfolioGrid items={portfolioItems} />
      </div>
      

    </PageLayout>
  );
}