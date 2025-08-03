"use client";

import { ThemeSwitch } from "./theme-switch";
import { FiGithub, FiMail } from "react-icons/fi";
import { SiX, SiLinkedin } from "react-icons/si";

export function Footer() {
  return (
    <footer className="py-8 border-t border-border-subtle bg-background">
      <div className="max-w-[1400px] mx-auto px-base">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left section - Title and Description */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-headline mb-2">OFCHEN</h3>
            <p className="text-text-secondary text-body leading-relaxed max-w-md">
              专注于创造优雅的数字体验，用技术和设计解决实际问题。
            </p>
          </div>

          {/* Right section - Social Links and Theme Switch */}
          <div className="flex items-center gap-4">
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                title="GitHub"
              >
                <FiGithub className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                title="X (Twitter)"
              >
                <SiX className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                title="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="w-10 h-10 bg-section-bg border border-border-light rounded-apple flex items-center justify-center hover:bg-section-bg-darker hover:border-link-blue transition-apple group"
                title="Email"
              >
                <FiMail className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
              </a>
            </div>

            {/* Theme Switch */}
            <div className="ml-2 border-l border-border-light pl-4">
              <ThemeSwitch />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border-subtle text-center">
          <p className="text-text-secondary text-caption">
            © 2024 OFCHEN. 保留所有权利
          </p>
        </div>
      </div>
    </footer>
  );
}