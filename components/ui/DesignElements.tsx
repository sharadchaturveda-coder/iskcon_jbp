/**
 * @fileoverview Shared UI components and design elements for the ISKCON website.
 * Provides reusable spiritual-themed components that maintain design consistency
 * across all sections of the application.
 */

import React from 'react';

/**
 * MandalaPattern component - Animated circular patterns representing spiritual harmony.
 * Creates floating mandala designs with continuous rotation animations.
 * Used as background decorations throughout the application.
 *
 * @param className - Additional CSS classes for positioning
 * @param opacity - Opacity value for the pattern (default: "0.05")
 * @returns Animated mandala pattern overlay
 */
export const MandalaPattern: React.FC<{ className?: string, opacity?: string }> = ({ className = "", opacity = "0.05" }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {/* Left upper mandala with clockwise rotation */}
    <svg className="absolute -left-20 -top-20 w-96 h-96 animate-[spin_60s_linear_infinite]" style={{ opacity }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.1,22.9,71.2,34.5C60.3,46.1,49.8,55.7,37.8,63.2C25.8,70.7,12.3,76.1,-0.6,77.1C-13.5,78.1,-26.4,74.7,-38.4,67.7C-50.4,60.7,-61.5,50.1,-69.8,37.8C-78.1,25.5,-83.6,11.5,-81.7,-1.8C-79.8,-15.1,-70.5,-27.7,-60.2,-37.9C-49.9,-48.1,-38.6,-55.9,-26.9,-64.5C-15.2,-73.1,-3.1,-82.5,10.6,-81.9C24.3,-81.3,30.5,-73.6,44.7,-76.4Z" transform="translate(100 100)" />
    </svg>
    {/* Right lower mandala with counter-clockwise rotation */}
    <svg className="absolute -right-20 -bottom-20 w-96 h-96 animate-[spin_80s_linear_infinite_reverse]" style={{ opacity }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
      <path fill="currentColor" d="M38.1,-63.9C48.8,-59.9,56.6,-49.4,63.3,-38.8C70,-28.2,75.6,-17.5,75.2,-6.9C74.8,3.7,68.4,14.2,61.8,24.4C55.2,34.6,48.4,44.5,39.4,52.4C30.4,60.3,19.2,66.2,7.4,68.8C-4.4,71.4,-16.8,70.7,-27.5,65.2C-38.2,59.7,-47.2,49.4,-55.3,38.6C-63.4,27.8,-70.6,16.5,-71.4,4.9C-72.2,-6.7,-66.6,-18.6,-58.5,-28.9C-50.4,-39.2,-39.8,-47.9,-28.6,-51.7C-17.4,-55.5,-5.6,-54.4,5.4,-63.7C16.4,-73,30.8,-92.6,38.1,-63.9Z" transform="translate(100 100)" />
    </svg>
  </div>
);

/**
 * OrnateDivider component - Elegant section divider with sacred geometry pattern.
 * Creates visual separation between content sections with a sacred symbol in the center.
 * Symbol inspired by traditional Hindu decorative elements.
 *
 * @param color - Text color class for the divider (default: "text-gold-500")
 * @returns Styled divider with sacred geometry
 */
export const OrnateDivider: React.FC<{ color?: string }> = ({ color = "text-gold-500" }) => (
  <div className={`flex items-center justify-center w-full py-8 opacity-80 ${color}`}>
    <div className="h-[1px] w-1/4 bg-current"></div>
    <div className="mx-4 text-2xl">
      <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor">
        <path d="M20 0C10 0 5 10 0 10C5 10 10 20 20 20C30 20 35 10 40 10C35 10 30 0 20 0Z" />
      </svg>
    </div>
    <div className="h-[1px] w-1/4 bg-current"></div>
  </div>
);

/**
 * TempleArch component - Decorative arch SVG overlay representing temple architecture.
 * Creates curved arch silhouette commonly seen in Hindu temple design.
 * Used as footer decoration or section separation elements.
 *
 * @param className - Additional CSS classes for styling and positioning
 * @returns Temple arch SVG overlay
 */
export const TempleArch: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute top-0 left-0 w-full h-12 bg-transparent pointer-events-none ${className}`}>
    {/* SVG arch path that scales responsively */}
    <svg className="w-full h-full text-stone-100" viewBox="0 0 1440 48" preserveAspectRatio="none">
      <path d="M0,0 C240,40 480,40 720,20 C960,40 1200,40 1440,0 L1440,48 L0,48 Z" fill="currentColor" />
    </svg>
  </div>
);

/**
 * GoldBorder component - Decorative golden border wrapper with gradient background.
 * Creates an elegant frame around content with golden gradient effect.
 * Commonly used for highlighting important content like founder images.
 *
 * @param children - Content to be wrapped with the golden border
 * @param className - Additional CSS classes for customization
 * @returns Wrapped content with golden border effect
 */
export const GoldBorder: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`relative p-[2px] bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 rounded-lg shadow-lg ${className}`}>
    <div className="bg-white rounded-md w-full overflow-hidden h-full">
      {children}
    </div>
  </div>
);

/**
 * SectionHeading component - Consistent heading style for all major sections.
 * Provides standardized typography and decorative underline for section titles.
 * Supports optional subtitles and different text alignments.
 *
 * @param title - Main heading text
 * @param subtitle - Optional subtitle displayed above main title
 * @param align - Text alignment ("center" or "left", default: "center")
 * @returns Formatted section heading with decorative underline
 */
export const SectionHeading: React.FC<{ title: string, subtitle?: string, align?: 'center' | 'left' }> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <span className="block text-gold-600 font-serif tracking-widest uppercase text-sm mb-2 font-bold">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl font-serif text-maroon-900 font-bold relative inline-block pb-4">
      {title}
      {/* Decorative golden underline */}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></span>
    </h2>
  </div>
);
