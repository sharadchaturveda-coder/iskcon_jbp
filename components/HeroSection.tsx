/**
 * @fileoverview HeroSection component - The main landing area of the ISKCON website.
 * Features rotating Bhagavad Gita quotes, animated background elements, spiritual symbolism,
 * and call-to-action buttons for temple darshan and events.
 */

import React, { useState, useEffect } from 'react';
import { ArrowDown, Flower } from 'lucide-react';
import { Page } from '../types';

/**
 * Props for the HeroSection component.
 */
interface HeroSectionProps {
  /** Navigation callback to change pages within the app */
  onNavigate: (page: Page) => void;
}

/**
 * Array of inspirational quotes from spiritual scriptures.
 * These quotes rotate every 4 seconds in the hero section to inspire visitors.
 * Sources include Bhagavad Gita verses and teachings from spiritual masters.
 */
const SPIRITUAL_QUOTES = [
  {
    quote: "Always think of Me, become My devotee, worship Me and offer your homage unto Me.",
    source: "— Bhagavad Gita 18.65"
  },
  {
    quote: "Perform your duty, for action is better than inaction.",
    source: "— Bhagavad Gita 3.8"
  },
  {
    quote: "The soul is neither born nor does it die; it is eternal.",
    source: "— Bhagavad Gita 2.20"
  },
  {
    quote: "You have the right to perform your prescribed duty, but you are not entitled to the fruits of your actions.",
    source: "— Bhagavad Gita 2.47"
  },
  {
    quote: "To those who worship Me with unwavering devotion, I personally carry their spiritual burden.",
    source: "— Bhagavad Gita 18.66"
  },
  {
    quote: "Chanting the names of Krishna destroys all sinful reactions.",
    source: "— Sri Chaitanya Mahaprabhu"
  }
];

/**
 * HeroSection component that serves as the main landing area of the website.
 * Features a stunning full-screen hero with rotating spiritual quotes, animated background,
 * sacred symbols, and prominent call-to-action buttons.
 *
 * Key Features:
 * - Full-screen height hero section with background image
 * - Rotating Bhagavad Gita quotes every 4 seconds
 * - Animated floating particles and sacred symbols (Om, Lotus, Beads, Aum)
 * - Dual call-to-action buttons for temple darshan and events
 * - Progress indicators for quote navigation
 * - Subtle animations and spiritual color scheme
 * - Scroll indicator at bottom
 *
 * @param props - Component props containing navigation callback
 * @returns JSX element for the hero section
 */
const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  // State to track which quote is currently displayed (rotates every 4 seconds)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  /**
   * Effect hook that creates an automatic quote rotation timer.
   * Changes to the next quote every 4 seconds, cycling through all available quotes.
   * Cleans up the interval on component unmount to prevent memory leaks.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        (prevIndex + 1) % SPIRITUAL_QUOTES.length
      );
    }, 4000); // Change quote every 4 seconds for more dynamic experience

    return () => clearInterval(interval);
  }, []);

  // Get the currently active quote object
  const currentQuote = SPIRITUAL_QUOTES[currentQuoteIndex];

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1561577553-614e593452bd?q=80&w=2000&auto=format&fit=crop"
          alt="Temple Deity"
          className="w-full h-full object-cover object-top animate-[scale_40s_linear_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/70 via-purple-900/40 via-maroon-900/50 to-saffron-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold-400 rounded-full animate-pulse opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div className="animate-[fadeInDown_1s_ease-out]">
          <div className="flex justify-center mb-4 text-gold-400 opacity-90">
             <Flower size={40} className="animate-spin-slow animate-pulse" />
             <div className="absolute w-16 h-16 border border-gold-400/30 rounded-full animate-ping"></div>
          </div>

          {/* Floating Sacred Symbols */}
          <div className="absolute top-20 left-10 animate-float-1 opacity-20 text-gold-400">
            <div className="text-4xl drop-shadow-lg filter">ॐ</div>
          </div>
          <div className="absolute top-32 right-16 animate-float-2 opacity-15 text-saffron-400">
            <div className="text-3xl drop-shadow-lg filter">🪷</div>
          </div>
          <div className="absolute bottom-32 left-20 animate-float-3 opacity-10 text-gold-300">
            <div className="text-2xl drop-shadow-lg filter">📿</div>
          </div>
          <div className="absolute top-1/3 right-8 animate-float-2 opacity-25 text-maroon-300">
            <div className="text-2xl">🕉️</div>
          </div>


          <h2 className="text-gold-300 font-sans tracking-[0.3em] text-sm md:text-lg uppercase font-bold mb-4 drop-shadow-md">
            Welcome to the spiritual heart of the city
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-50 font-bold mb-6 drop-shadow-xl leading-tight">
            ISKCON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
              Jabalpur
            </span>
          </h1>
          <div className="text-stone-100 text-lg md:text-2xl font-serif italic max-w-2xl mx-auto mb-8 text-shadow transition-all duration-700 transform hover:scale-105">
            "{currentQuote.quote}"
            <br />
            <span className="text-sm text-gold-300 not-italic mt-2 block font-sans font-medium">{currentQuote.source}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto mb-6 bg-stone-400/30 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-400 to-saffron-400 rounded-full animate-progress-bar"></div>
          </div>

          {/* Quote Progress Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {SPIRITUAL_QUOTES.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentQuoteIndex
                    ? 'bg-gold-400 scale-125 shadow-lg'
                    : 'bg-stone-400/60 hover:bg-stone-400/80'
                }`}
              />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('darshan')}
              className="bg-gradient-to-r from-gold-500 to-gold-700 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 border border-gold-300 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Daily Darshan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-saffron-500 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-full border border-gold-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="bg-transparent border-2 border-stone-100 text-stone-100 font-bold py-4 px-8 rounded-full hover:bg-stone-100 hover:text-maroon-900 hover:border-gold-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 backdrop-blur-sm cursor-pointer transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Upcoming Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-gold-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Arch */}
      <div className="absolute bottom-0 left-0 w-full">
         <svg className="w-full h-16 md:h-24 text-stone-50 fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
             <path d="M0,100 L0,40 C200,80 400,90 720,50 C1040,10 1240,20 1440,40 L1440,100 Z" />
         </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-maroon-900 z-20">
        <ArrowDown size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
