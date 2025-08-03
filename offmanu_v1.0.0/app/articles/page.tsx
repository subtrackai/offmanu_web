"use client";

import React, { useState, useMemo } from "react";
import PageLayout from "../../components/PageLayout";
import FilterControls from "../../components/FilterControls";
import ContentGrid from "../../components/ContentGrid";

// 文章数据
const articlesData = [
  {
    id: 1,
    title: "React 18 新特性深度解析",
    description: "深入探讨React 18中的并发特性、Suspense改进、以及新的Hooks API，通过实际案例展示如何在项目中应用这些新功能。",
    date: "2024-01-15",
    category: "React",
    link: "/articles/react-18-features",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "构建现代化设计系统的最佳实践",
    description: "从零开始构建可扩展的设计系统，包括颜色规范、字体层级、组件库设计，以及如何在团队中有效推广和维护。",
    date: "2024-01-10",
    category: "设计系统",
    link: "/articles/design-system-best-practices",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Next.js 性能优化完全指南",
    description: "全面的Next.js性能优化策略，涵盖图片优化、代码分割、缓存策略、服务端渲染优化等关键技术点。",
    date: "2024-01-05",
    category: "Next.js",
    link: "/articles/nextjs-performance-optimization",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "TypeScript 高级类型系统实战",
    description: "深入学习TypeScript的高级类型特性，包括条件类型、映射类型、模板字面量类型等，提升代码的类型安全性。",
    date: "2023-12-28",
    category: "TypeScript",
    link: "/articles/typescript-advanced-types",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "前端工程化实践指南",
    description: "现代前端工程化的完整解决方案，包括构建工具配置、代码规范、自动化测试、CI/CD流程等。",
    date: "2023-12-20",
    category: "工程化",
    link: "/articles/frontend-engineering",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "CSS-in-JS 最佳实践",
    description: "探索CSS-in-JS的各种解决方案，对比styled-components、emotion等库的优缺点，以及在大型项目中的应用。",
    date: "2023-12-15",
    category: "CSS",
    link: "/articles/css-in-js-best-practices",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
  }
];

// 分类选项
const categories = [
  { label: "全部分类", value: "all" },
  { label: "React", value: "React" },
  { label: "Next.js", value: "Next.js" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "设计系统", value: "设计系统" },
  { label: "工程化", value: "工程化" },
  { label: "CSS", value: "CSS" }
];

// 排序选项
const sortOptions = [
  { label: "最新发布", value: "date-desc" },
  { label: "最早发布", value: "date-asc" },
  { label: "标题 A-Z", value: "title-asc" },
  { label: "标题 Z-A", value: "title-desc" }
];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("date-desc");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 过滤和排序文章
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articlesData;

    // 分类过滤
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category === selectedCategory);
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
      title="技术文章"
      subtitle="分享前端开发的思考、学习和实践经验，探索技术的深度与广度"
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
          items={filteredAndSortedArticles}
          viewMode={viewMode}
          type="articles"
        />
      </div>
    </PageLayout>
  );
}