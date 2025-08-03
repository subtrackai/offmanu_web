"use client";

import { FiGithub, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";
import { SiX, SiLinkedin } from "react-icons/si";
import { FaCode, FaGamepad, FaPalette, FaCalendarAlt, FaBroadcastTower, FaHeart } from "react-icons/fa";
import AboutCarousel from "../../components/AboutCarousel";

export default function AboutPage() {
  const experiences = [
    {
      id: 1,
      title: "高级全栈开发工程师",
      company: "OiDesign Studio",
      period: "2023 - 至今",
      description: "负责产品设计系统构建、前端架构设计、以及团队技术决策。带领团队完成多个大型项目的开发和交付。",
      skills: ["React", "Next.js", "TypeScript", "Node.js"]
    },
    {
      id: 2,
      title: "前端开发工程师",
      company: "Tech Innovation Lab",
      period: "2022 - 2023",
      description: "专注于用户界面开发和用户体验优化，参与多个创新项目的前端架构设计和实现。",
      skills: ["Vue.js", "React", "JavaScript", "CSS3"]
    },
    {
      id: 3,
      title: "UI/UX设计师",
      company: "Creative Digital Agency",
      period: "2021 - 2022",
      description: "负责品牌视觉设计、用户界面设计和用户体验研究，为客户提供完整的数字化解决方案。",
      skills: ["Figma", "Sketch", "Adobe CC", "Prototyping"]
    }
  ];

  const achievements = [
    { number: "50+", label: "完成项目" },
    { number: "3年+", label: "工作经验" },
    { number: "100%", label: "客户满意度" },
    { number: "15+", label: "技术栈" }
  ];

  const skillCategories = [
    {
      id: 1,
      title: "技术",
      description: "掌握现代Web开发技术栈，专注于用户体验和性能优化",
      icon: <FaCode className="w-8 h-8 text-blue-500" />
    },
    {
      id: 2,
      title: "游戏创意",
      description: "热爱游戏设计和创意开发，探索交互体验的无限可能",
      icon: <FaGamepad className="w-8 h-8 text-green-500" />
    },
    {
      id: 3,
      title: "设计",
      description: "专注于视觉设计和品牌创意，追求美学与功能的完美平衡",
      icon: <FaPalette className="w-8 h-8 text-purple-500" />
    },
    {
      id: 4,
      title: "活动",
      description: "擅长活动策划和项目管理，创造有影响力的体验活动",
      icon: <FaCalendarAlt className="w-8 h-8 text-orange-500" />
    },
    {
      id: 5,
      title: "传媒",
      description: "具备内容创作和媒体运营经验，善于讲述品牌故事",
      icon: <FaBroadcastTower className="w-8 h-8 text-red-500" />
    },
    {
      id: 6,
      title: "兴趣爱好",
      description: "广泛的兴趣爱好让我保持创造力和对生活的热情",
      icon: <FaHeart className="w-8 h-8 text-pink-500" />
    }
  ];

  // 技能详细信息数据
  const skillDetails = {
    1: { // 技术
      overview: "作为一名全栈开发者，我专注于现代Web技术栈的深度应用。从前端的用户界面设计到后端的系统架构，我致力于创造高性能、可维护的数字产品。",
      keyPoints: [
        "熟练掌握React、Next.js等现代前端框架，具备组件化开发思维",
        "精通TypeScript，能够构建类型安全的大型应用",
        "具备Node.js后端开发经验，能够设计RESTful API和GraphQL接口",
        "熟悉云服务部署，包括Vercel、AWS等平台的应用部署"
      ],
      achievements: [
        "独立开发了多个企业级Web应用，用户量超过10万+",
        "构建了可复用的组件库，提升团队开发效率30%",
        "优化网站性能，页面加载速度提升50%"
      ],
      tools: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Git", "Docker", "AWS"]
    },
    2: { // 游戏创意
      overview: "游戏设计是我的热情所在。我相信好的游戏不仅仅是娱乐，更是艺术与技术的完美结合。从概念设计到原型制作，我享受创造沉浸式体验的每一个环节。",
      keyPoints: [
        "具备完整的游戏设计思维，从玩法机制到用户体验的全方位考虑",
        "熟悉Unity引擎，能够快速制作游戏原型",
        "理解游戏心理学，能设计吸引人的游戏循环",
        "具备跨平台游戏开发经验，包括移动端和Web端"
      ],
      achievements: [
        "设计并开发了3款独立游戏，累计下载量超过5万次",
        "参与了多个商业游戏项目的策划和开发工作",
        "在游戏开发比赛中获得创新奖"
      ],
      tools: ["Unity", "C#", "Blender", "Photoshop", "GameAnalytics", "Steam", "App Store"]
    },
    3: { // 设计
      overview: "设计是解决问题的艺术。我专注于用户中心的设计方法，通过深入理解用户需求，创造既美观又实用的设计解决方案。",
      keyPoints: [
        "精通UI/UX设计原则，能够设计直观易用的用户界面",
        "具备品牌设计能力，从logo到完整视觉识别系统",
        "熟练使用现代设计工具，包括Figma、Adobe Creative Suite",
        "理解设计系统概念，能够构建可扩展的设计规范"
      ],
      achievements: [
        "为20+客户提供了品牌设计服务，提升品牌认知度",
        "设计的移动应用界面获得了用户好评率95%+",
        "建立了完整的设计系统，被多个团队采用"
      ],
      tools: ["Figma", "Sketch", "Adobe CC", "Principle", "InVision", "Zeplin", "Framer"]
    },
    4: { // 活动
      overview: "活动策划需要细致的计划和创新的思维。我擅长将创意想法转化为具体的执行方案，创造难忘的体验活动。",
      keyPoints: [
        "具备完整的活动策划流程管理能力",
        "善于整合资源，协调多方合作",
        "具备危机处理能力，能应对突发情况",
        "注重数据分析，持续优化活动效果"
      ],
      achievements: [
        "成功策划了50+场企业活动，参与人数累计超过10万",
        "策划的年会活动获得了95%以上的满意度",
        "建立了完善的活动管理体系，提升执行效率"
      ],
      tools: ["Project Management", "Excel", "PowerPoint", "Canva", "Eventbrite", "Social Media"]
    },
    5: { // 传媒
      overview: "在数字化时代，内容创作和媒体运营是连接品牌与用户的重要桥梁。我专注于创造有价值的内容，讲述引人入胜的品牌故事。",
      keyPoints: [
        "具备多媒体内容创作能力，包括文字、图片、视频",
        "熟悉社交媒体运营策略和粉丝社群管理",
        "理解品牌传播规律，能制定有效的传播策略",
        "具备数据分析能力，能够优化内容表现"
      ],
      achievements: [
        "管理的社媒账号粉丝增长率达到200%+",
        "创作的内容累计获得了100万+的阅读量",
        "为多个品牌制定了成功的数字营销策略"
      ],
      tools: ["Adobe Premiere", "Final Cut Pro", "Photoshop", "Canva", "Analytics", "Social Platforms"]
    },
    6: { // 兴趣爱好
      overview: "广泛的兴趣爱好是我创造力的源泉。从摄影到音乐，从旅行到阅读，每一个爱好都在丰富着我的视野，为工作带来新的灵感。",
      keyPoints: [
        "摄影让我学会了观察细节和捕捉美好瞬间",
        "音乐培养了我的审美能力和节奏感",
        "旅行开阔了我的视野，增加了文化理解",
        "阅读让我保持学习习惯，持续更新知识体系"
      ],
      achievements: [
        "摄影作品在社交媒体获得了数万点赞",
        "参与了多场音乐活动的组织和表演",
        "足迹遍布20+个城市，体验了不同的文化"
      ],
      tools: ["Camera", "Lightroom", "Music Apps", "Travel Apps", "Reading Apps", "Fitness Apps"]
    }
  };

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-geist-sans)]">
      {/* Page Header - Like homepage banner */}
      <section className="py-xl bg-background">
        <div className="max-w-[1400px] mx-auto px-base mb-md">
          {/* Back Button */}
          <div className="mb-base">
            <a 
              href="/" 
              className="inline-flex items-center gap-sm text-body text-text-secondary"
            >
              <div className="w-10 h-10 bg-section-bg dark:bg-gray-800 border border-border-light dark:border-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="font-medium">返回首页</span>
            </a>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-title-large font-bold text-foreground mb-xs">关于我</h1>
              <p className="text-body-large text-text-secondary">
                一个充满激情的创造者，专注于创造优雅而实用的数字体验
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-[1400px] mx-auto px-base">
          <div className="grid lg:grid-cols-2 gap-xl items-center">
            {/* Left: Text Content */}
            <div className="space-y-base">
              <p className="text-body-large text-text-secondary leading-relaxed">
                我是 PENGYIN CHEN，一名全栈开发者和 UI/UX 设计师。我热衷于创造优雅而实用的数字体验，
                将创新的想法转化为高质量的产品。在过去的几年里，我专注于现代 Web 技术和用户体验设计，
                帮助企业和个人实现他们的数字化愿景。
              </p>

              <div className="flex flex-wrap gap-sm">
                <div className="flex items-center gap-xs text-text-secondary">
                  <FiMapPin className="w-4 h-4" />
                  <span className="text-body">中国·上海</span>
                </div>
                <div className="flex items-center gap-xs text-text-secondary">
                  <FiCalendar className="w-4 h-4" />
                  <span className="text-body">3年+ 工作经验</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-sm">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-foreground transition-all duration-200 group"
                  title="GitHub"
                >
                  <FiGithub className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-foreground transition-all duration-200 group"
                  title="X (Twitter)"
                >
                  <SiX className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-foreground transition-all duration-200 group"
                  title="LinkedIn"
                >
                  <SiLinkedin className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="w-12 h-12 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-foreground transition-all duration-200 group"
                  title="Email"
                >
                  <FiMail className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                </a>
              </div>
            </div>

            {/* Right: Profile Card */}
            <div className="lg:justify-self-end">
              <div className="bg-section-bg rounded-apple-xl p-lg border border-border-light max-w-md">
                <div className="text-center space-y-base">
                  <div className="w-32 h-32 bg-background rounded-apple-xl flex items-center justify-center mx-auto">
                    <div className="text-4xl font-bold text-link-blue">张</div>
                  </div>
                  
                  <div>
                    <h3 className="text-title font-bold text-foreground mb-xs">PENGYIN CHEN</h3>
                    <p className="text-body text-text-secondary">全栈开发者 & UI/UX设计师</p>
                  </div>

                  <div className="grid grid-cols-2 gap-sm">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="text-center p-sm bg-background rounded-apple border border-border-light">
                        <div className="text-headline font-bold text-foreground">{achievement.number}</div>
                        <div className="text-caption text-text-secondary">{achievement.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <AboutCarousel
        title="技能专长"
        subtitle="多元化的技能组合，涵盖技术开发、创意设计、活动策划等多个领域"
        items={skillCategories}
        className="bg-background"
        skillDetails={skillDetails}
      />

      {/* Experience Section */}
      <section className="py-xl bg-background">
        <div className="max-w-[1400px] mx-auto px-base">
          <div className="mb-xl">
            <h2 className="text-title-large font-bold text-foreground mb-xs">工作经验</h2>
            <p className="text-body-large text-text-secondary">
              我的职业发展历程和主要工作经历
            </p>
          </div>

          <div className="space-y-base">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-section-bg rounded-apple-xl p-md border border-border-light transition-all duration-500 card-hover">
                <div className="grid md:grid-cols-4 gap-base">
                  <div className="md:col-span-1">
                    <div className="text-body font-semibold text-text-secondary">{exp.period}</div>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-headline font-bold text-foreground mb-xs">{exp.title}</h3>
                    <p className="text-body font-medium text-foreground mb-sm">{exp.company}</p>
                    <p className="text-body text-text-secondary leading-relaxed mb-sm">{exp.description}</p>
                    <div className="flex flex-wrap gap-xs">
                      {exp.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-sm py-micro bg-background text-caption rounded-full border border-border-light">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-apple-xl border border-border-light text-center p-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-title-large font-bold text-foreground mb-xs">让我们一起创造</h2>
              <p className="text-body-large text-text-secondary mb-base">
                如果你有有趣的项目想法，或者想要讨论技术和设计，欢迎随时联系我
              </p>
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-xs px-lg py-sm bg-foreground text-background rounded-apple hover:bg-text-secondary transition-all duration-200"
              >
                <FiMail className="w-4 h-4" />
                联系我
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}