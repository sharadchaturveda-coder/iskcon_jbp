/**
 * @fileoverview Header component with responsive navigation and dynamic styling.
 * Features a sophisticated navigation system with mobile menu, scroll-based effects,
 * and spiritual theming with animated elements.
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun } from 'lucide-react';
import { NavItem, Page } from '../types';

/**
 * Props for the Header component.
 * Defines the navigation interface and current page state.
 */
interface HeaderProps {
  /** Current active page for styling and navigation logic */
  currentPage: Page;
  /** Callback function to change page/navigation state */
  onNavigate: (page: Page) => void;
}

/**
 * Navigation items array defining the main menu structure.
 * Excludes 'donate' page as it has special styling as a call-to-action button.
 */
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Darshan', page: 'darshan' },
  { label: 'Events', page: 'events' },
  { label: 'Gita Course', page: 'gita-course' },
  { label: 'Projects', page: 'projects' },
];

/**
 * Header component that provides navigation and branding for the entire website.
 * Implements responsive design with mobile menu, dynamic styling based on scroll
 * position and current page, and spiritual theming with animated logo.
 *
 * Key Features:
 * - Fixed positioning with scroll-based background changes
 * - Responsive mobile menu with slide-in animation
 * - Active page highlighting with animated underlines
 * - Logo with spiritual symbolism (Sun icon representing divine light)
 * - Different styling on home page (transparent background) vs other pages
 *
 * @param props Header component props
 * @returns JSX element for the header
 */
const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  // Track if user has scrolled to change header appearance
  const [isScrolled, setIsScrolled] = useState(false);

  // Control mobile menu drawer visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Effect hook that monitors scroll position to trigger header style changes.
   * When user scrolls beyond 20px, header switches from transparent to solid background.
   * Only cleanup on component unmount to avoid unnecessary re-attachments.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Navigation handler that updates the current page and closes mobile menu.
   * Ensures mobile menu always closes when navigation occurs.
   *
   * @param page The target page to navigate to
   */
  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  /**
   * Dynamic styling logic based on current page and scroll position.
   * Header adapts its appearance to provide optimal UX across different contexts.
   */

  // Check if we're on the home page to determine transparency behavior
  const isHomePage = currentPage === 'home';

  // Header background: transparent on clean home page, solid when scrolled or on other pages
  const headerBgClass = isScrolled || !isHomePage
    ? 'bg-stone-50/95 backdrop-blur-md py-2 shadow-xl border-gold-500 text-maroon-900'
    : 'bg-transparent py-6 border-transparent text-white';

  // Mobile menu backdrop (always consistent)
  const mobileMenuBgClass = 'bg-stone-50/95 backdrop-blur-md';

  // Logo text color: dark on solid background, light on transparent background
  const logoTextClass = isScrolled || !isHomePage ? 'text-maroon-900' : 'text-white drop-shadow-md';

  // Navigation link colors: adapt to background for optimal contrast and hover effects
  const navTextClass = isScrolled || !isHomePage ? 'text-maroon-900 hover:text-gold-600' : 'text-stone-100 hover:text-gold-300 shadow-black drop-shadow-sm';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-double ${headerBgClass}`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-saffron-100 border-2 border-gold-500 flex items-center justify-center shadow-lg overflow-hidden">
               <Sun className="text-gold-600 w-8 h-8 group-hover:animate-spin-slow duration-1000" />
            </div>
            <div className={`flex flex-col text-left ${logoTextClass}`}>
              <span className="font-serif text-xl md:text-2xl font-bold leading-none tracking-wide">ISKCON</span>
              <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-gold-500">Jabalpur</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'home' ? 'text-gold-500' : '')}
            >
              Home
              <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'about' ? 'text-gold-500' : '')}
            >
              About
              <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'about' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
            </button>
            <button
              onClick={() => handleNavClick('darshan')}
              className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'darshan' ? 'text-gold-500' : '')}
            >
              Darshan
              <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'darshan' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
            </button>
            <button
              onClick={() => handleNavClick('events')}
              className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'events' ? 'text-gold-500' : '')}
            >
              Events
              <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'events' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
            </button>
            <button
              onClick={() => handleNavClick('gita-course')}
              className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'gita-course' ? 'text-gold-500' : '')}
            >
              Gita Course
              <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'gita-course' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'projects' ? 'text-gold-500' : '')}
            >
              Projects
              <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'projects' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
            </button>
            <button
              onClick={() => handleNavClick('donate')}
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform hover:scale-105 border-2 border-gold-300"
            >
              Donate Now
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gold-500 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} className={isScrolled || !isHomePage ? "" : "drop-shadow-md"} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={"fixed inset-y-0 right-0 w-64 " + mobileMenuBgClass + " shadow-2xl transform transition-transform duration-300 ease-in-out z-50 border-l-4 border-gold-500 " + (mobileMenuOpen ? 'translate-x-0' : 'translate-x-full')}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end mb-8">
            <button onClick={() => setMobileMenuOpen(false)} className="text-maroon-900">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item) => {
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className={"text-left font-serif text-lg font-bold border-b border-gold-200 pb-2 transition-colors " + (currentPage === item.page ? 'text-gold-600' : 'text-maroon-900 hover:text-gold-600')}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('donate')}
              className="mt-4 bg-gradient-to-r from-saffron-500 to-maroon-800 text-white px-6 py-3 rounded-md font-bold shadow-lg"
            >
              Donate Now
            </button>
          </nav>

          <div className="mt-auto text-center text-maroon-900/60 text-sm italic font-serif">
            Hare Krishna Hare Krishna<br/>Krishna Krishna Hare Hare
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
