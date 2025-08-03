import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Text colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        
        // Interactive colors
        "link-blue": "var(--link-blue)",
        "link-blue-hover": "var(--link-blue-hover)",
        
        // Background variations
        "section-bg": "var(--section-bg)",
        "section-bg-darker": "var(--section-bg-darker)",
        
        // Border colors
        "border-light": "var(--border-light)",
        "border-dark": "var(--border-dark)",
        "border-subtle": "var(--border-subtle)",
        
        // Button colors
        "button-primary": "var(--button-primary)",
        "button-primary-hover": "var(--button-primary-hover)",
        "button-secondary": "var(--button-secondary)",
        "button-secondary-hover": "var(--button-secondary-hover)",
      },
      fontSize: {
        // Apple-style responsive typography scale
        "display-large": [
          "clamp(40px, 8vw, 56px)", 
          { lineHeight: "1.07", letterSpacing: "-0.005em" }
        ],
        "display": [
          "clamp(32px, 6vw, 48px)", 
          { lineHeight: "1.08", letterSpacing: "-0.003em" }
        ],
        "title-large": [
          "clamp(28px, 5vw, 40px)", 
          { lineHeight: "1.1", letterSpacing: "0em" }
        ],
        "title": [
          "clamp(24px, 4vw, 32px)", 
          { lineHeight: "1.125", letterSpacing: "0.004em" }
        ],
        "headline": [
          "clamp(20px, 3vw, 24px)", 
          { lineHeight: "1.167", letterSpacing: "0.009em" }
        ],
        "body-large": [
          "clamp(17px, 2.5vw, 21px)", 
          { lineHeight: "1.381", letterSpacing: "0.011em" }
        ],
        "body": [
          "clamp(15px, 2vw, 17px)", 
          { lineHeight: "1.47059", letterSpacing: "-0.022em" }
        ],
        "caption": [
          "clamp(12px, 1.5vw, 14px)", 
          { lineHeight: "1.28577", letterSpacing: "-0.016em" }
        ],
      },
      spacing: {
        // Apple标准8pt网格系统 - 黄金比例递增
        "micro": "clamp(4px, 0.5vw, 8px)",      // 4-8px: 微间距
        "xs": "clamp(8px, 1vw, 12px)",          // 8-12px: 极小间距  
        "sm": "clamp(12px, 1.5vw, 16px)",       // 12-16px: 小间距
        "base": "clamp(16px, 2vw, 24px)",       // 16-24px: 基础间距
        "md": "clamp(24px, 3vw, 32px)",         // 24-32px: 中等间距
        "lg": "clamp(32px, 4vw, 48px)",         // 32-48px: 大间距
        "xl": "clamp(48px, 6vw, 64px)",         // 48-64px: 超大间距
        "2xl": "clamp(64px, 8vw, 96px)",        // 64-96px: 章节间距
        "3xl": "clamp(96px, 12vw, 128px)",      // 96-128px: 页面间距
      },
      borderRadius: {
        // Apple-style border radius
        "apple-sm": "4px",
        "apple": "8px",
        "apple-lg": "12px",
        "apple-xl": "14px",
      },
      transitionTimingFunction: {
        // Apple-style easing
        "apple": "cubic-bezier(0.28, 0.16, 0.22, 1.00)",
      },
      animation: {
        // Apple-style animations
        "fade-in": "fade-in 0.6s cubic-bezier(0.28, 0.16, 0.22, 1.00)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.28, 0.16, 0.22, 1.00)",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.28, 0.16, 0.22, 1.00)",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.28, 0.16, 0.22, 1.00)",
        "scale-in": "scale-in 0.5s cubic-bezier(0.28, 0.16, 0.22, 1.00)",
        "bounce-gentle": "bounce-gentle 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
