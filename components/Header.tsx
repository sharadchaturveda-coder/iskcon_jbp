/**
 * @fileoverview Header component with responsive navigation and dynamic styling.
 * Features a sophisticated navigation system with modal mobile menu, scroll-based effects,
 * and spiritual theming with animated elements.
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
  { label: 'Arambh Fest', page: 'arambh-fest' },
  { label: 'Gita Course', page: 'gita-course' },
  { label: 'Projects', page: 'projects' },
];

/**
 * Header component that provides navigation and branding for the entire website.
 * Implements responsive design with centered modal mobile hamburger menu, dynamic styling
 * based on scroll position and current page, and spiritual theming with animated logo.
 *
 * Key Features:
 * - Fixed positioning with scroll-based background changes
 * - Mobile hamburger menu with centered card-modal design and blurred backdrop
 * - Active page highlighting with animated underlines (desktop) and active states (mobile)
 * - Logo with spiritual symbolism (Sun icon representing divine light)
 * - Different styling on home page (transparent background) vs other pages
 * - Modal menu prevents body scrolling and features spiritual branding and quotes
 *
 * @param props Header component props
 * @returns JSX element for the header
 */
const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  // Track if user has scrolled to change header appearance
  const [isScrolled, setIsScrolled] = useState(false);

  // Control mobile menu modal visibility
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
   * Effect hook that prevents body scrolling when mobile menu is open.
   * Adds overflow-hidden to body when menu is active to create modal behavior.
   */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /**
   * Navigation handler that updates the current page and closes mobile menu.
   *
   * @param page The target page to navigate to
   */
  const handleNavigate = (page: Page) => {
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

  // Logo text color: dark on solid background, light on transparent background
  const logoTextClass = isScrolled || !isHomePage ? 'text-maroon-900' : 'text-white drop-shadow-md';

  // Navigation link colors: adapt to background for optimal contrast and hover effects
  const navTextClass = isScrolled || !isHomePage ? 'text-maroon-900 hover:text-gold-600' : 'text-stone-100 hover:text-gold-300 shadow-black drop-shadow-sm';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-double ${headerBgClass}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <button onClick={() => handleNavigate('home')} className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <img
                  src="/Iskcon.svg"
                  alt="ISKCON Jabalpur Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className={`flex flex-col text-left ${logoTextClass}`}>
                <span className="font-serif text-xl md:text-2xl font-bold leading-none tracking-wide">ISKCON</span>
                <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-gold-500">Jabalpur</span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gold-500 focus:outline-none p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} className="transition-transform duration-200" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => handleNavigate('home')}
                className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'home' ? 'text-gold-500' : '')}
              >
                Home
                <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
              </button>
              <button
                onClick={() => handleNavigate('about')}
                className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'about' ? 'text-gold-500' : '')}
              >
                About
                <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'about' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
              </button>
              <button
                onClick={() => handleNavigate('darshan')}
                className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'darshan' ? 'text-gold-500' : '')}
              >
                Darshan
                <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'darshan' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
              </button>
              <button
                onClick={() => handleNavigate('events')}
                className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'events' ? 'text-gold-500' : '')}
              >
                Events
                <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'events' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
              </button>
              <button
                onClick={() => handleNavigate('gita-course')}
                className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'gita-course' ? 'text-gold-500' : '')}
              >
                Gita Course
                <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'gita-course' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
              </button>
              <button
                onClick={() => handleNavigate('projects')}
                className={"text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group " + navTextClass + " " + (currentPage === 'projects' ? 'text-gold-500' : '')}
              >
                Projects
                <span className={"absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 " + (currentPage === 'projects' ? 'w-full' : 'w-0 group-hover:w-full')}></span>
              </button>
              <button
                onClick={() => handleNavigate('arambh-fest')}
                className="bg-gradient-to-r from-saffron-500 to-maroon-800 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform hover:scale-105 border-2 border-gold-300"
              >
                Book Tickets
              </button>
            </nav>


          </div>
        </div>


      </header>

      {/* Mobile Menu Modal (New Design) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-stone-50 w-full max-w-sm rounded-2xl shadow-2xl border-4 border-gold-500 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-maroon-900 to-saffron-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <img
                        src="/Iskcon.svg"
                        alt="ISKCON Jabalpur Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-bold tracking-wide">ISKCON</h2>
                      <p className="font-sans text-xs font-semibold tracking-widest uppercase text-gold-300">Jabalpur</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-gold-300 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-6 space-y-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNavigate(item.page)}
                    className={`w-full text-left py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                      currentPage === item.page
                        ? 'bg-gold-500 text-white border-gold-400 font-bold'
                        : 'bg-stone-100 border-stone-200 text-maroon-900 hover:bg-gold-100 hover:border-gold-300'
                    } font-serif text-lg`}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 border-t border-gold-200">
                  <button
                    onClick={() => handleNavigate('arambh-fest')}
                    className="w-full bg-gradient-to-r from-saffron-500 to-maroon-800 text-white py-4 px-6 rounded-lg font-bold shadow-lg transition-transform hover:scale-105"
                  >
                    Book Tickets
                  </button>
                </div>
              </nav>

              {/* Spiritual Quote */}
              <div className="bg-maroon-900 text-center text-stone-200 p-4 text-sm italic font-serif">
                "Chant and be happy"
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
