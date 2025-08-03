"use client";

import React, { useState, useMemo } from "react";
import PageLayout from "../../components/PageLayout";
import FilterControls from "../../components/FilterControls";
import ContentGrid from "../../components/ContentGrid";

// 项目数据
const projectsData = [
  {
    id: 1,
    title: "现代化电商平台",
    description: "基于Next.js构建的全栈电商解决方案，包含用户管理、商品展示、购物车、支付集成等完整功能。采用现代化的设计语言和流畅的用户体验。",
    category: "Web应用",
    date: "2024-01-01",
    link: "/projects/ecommerce-platform",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "智能数据分析平台",
    description: "企业级数据可视化和分析平台，支持多种数据源接入，提供实时图表、报告生成、智能预测等功能。帮助企业做出数据驱动的决策。",
    category: "数据分析",
    date: "2023-12-01",
    link: "/projects/data-platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "移动端设计系统",
    description: "为移动应用构建的完整设计系统，包含组件库、设计规范、交互指南等。提升开发效率，保证设计一致性。",
    category: "设计系统",
    date: "2023-11-01",
    link: "/projects/mobile-design-system",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "AI聊天机器人",
    description: "基于最新AI技术的智能对话系统，支持多轮对话、上下文理解、个性化回复等功能。可广泛应用于客服、教育等场景。",
    category: "人工智能",
    date: "2023-10-01",
    link: "/projects/ai-chatbot",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "企业级CRM系统",
    description: "功能完整的客户关系管理系统，包含客户管理、销售跟进、数据分析等模块。帮助企业提升销售效率和客户满意度。",
    category: "企业应用",
    date: "2023-09-01",
    link: "/projects/crm-system",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "在线教育平台",
    description: "现代化的在线学习平台，支持视频课程、实时互动、作业提交、进度跟踪等功能。为教育机构提供完整的数字化解决方案。",
    category: "教育科技",
    date: "2023-08-01",
    link: "/projects/education-platform",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
  },
  {
    id: 7,
    title: "IoT设备管理平台",
    description: "物联网设备的统一管理平台，支持设备监控、数据采集、远程控制、告警管理等功能。适用于智能家居、工业物联网等场景。",
    category: "物联网",
    date: "2023-07-01",
    link: "/projects/iot-platform",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop"
  },
  {
    id: 8,
    title: "区块链钱包应用",
    description: "安全可靠的数字货币钱包，支持多种加密货币、交易记录、资产管理等功能。采用最新的安全技术保护用户资产。",
    category: "区块链",
    date: "2023-06-01",
    link: "/projects/blockchain-wallet",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop"
  }
];

// 分类选项
const categories = [
  { label: "全部分类", value: "all" },
  { label: "Web应用", value: "Web应用" },
  { label: "数据分析", value: "数据分析" },
  { label: "设计系统", value: "设计系统" },
  { label: "人工智能", value: "人工智能" },
  { label: "企业应用", value: "企业应用" },
  { label: "教育科技", value: "教育科技" },
  { label: "物联网", value: "物联网" },
  { label: "区块链", value: "区块链" }
];

// 排序选项
const sortOptions = [
  { label: "最新项目", value: "date-desc" },
  { label: "最早项目", value: "date-asc" },
  { label: "标题 A-Z", value: "title-asc" },
  { label: "标题 Z-A", value: "title-desc" }
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("date-desc");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 过滤和排序项目
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projectsData;

    // 分类过滤
    if (selectedCategory !== "all") {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // 排序
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, selectedSort]);

  return (
    <PageLayout
      title="精选项目"
      subtitle="这些项目展示了我在不同技术栈和业务领域的探索与实践"
    >
      <div className="max-w-[1400px] mx-auto">
        <FilterControls
          categories={categories}
          sortOptions={sortOptions}
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
          viewMode={viewMode}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSelectedSort}
          onViewModeChange={setViewMode}
        />

        <ContentGrid
          items={filteredAndSortedProjects}
          viewMode={viewMode}
          type="projects"
        />
      </div>
    </PageLayout>
  );
}