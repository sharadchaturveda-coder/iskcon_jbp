/**
 * @fileoverview BannerPopup component - Modal popup displaying the banner image on homepage load.
 * Features AVIF/WebP image fallback, smooth animations, and close functionality.
 */

import React from 'react';
import { X } from 'lucide-react';

/**
 * Props for the BannerPopup component.
 */
interface BannerPopupProps {
  /** Callback function to close the popup */
  onClose: () => void;
}

/**
 * BannerPopup component that displays a modal overlay with the banner image.
 * Shows on homepage load with smooth fade-in animation and provides multiple close options.
 *
 * Key Features:
 * - Full-screen modal overlay with backdrop blur
 * - AVIF primary image with WebP fallback for modern browser support
 * - Smooth fade-in animation on mount
 * - Close button (X) in top-right corner
 * - Click outside backdrop to close
 * - Responsive design with max-width constraints
 * - Spiritual theme colors (gold borders, maroon accents)
 *
 * @param props - Component props containing close callback
 * @returns Modal popup with banner image
 */
const BannerPopup: React.FC<BannerPopupProps> = ({ onClose }) => {
  /**
   * Handles backdrop click to close popup.
   * Only closes if the click target is the backdrop itself (not the image container).
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="relative max-w-4xl w-full mx-4 animate-in zoom-in-95 duration-300">
        {/* Close Button - Above image on mobile, inside on desktop */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:top-2 md:right-2 z-10 p-2 bg-gold-500 hover:bg-gold-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
          aria-label="Close banner popup"
        >
          <X size={24} />
        </button>

        {/* Image Container with Border */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-gold-400 max-w-3xl mx-auto">
          {/* Banner Image with Fallback */}
          <picture className="block w-full h-auto">
            <source srcSet="/bannernew.avif" type="image/avif" />
            <img
              src="/bannernew.webp"
              alt="ISKCON Jabalpur Banner"
              className="w-full h-auto object-contain"
              loading="eager"
            />
          </picture>

          {/* Decorative Border Glow */}
          <div className="absolute inset-0 rounded-lg border border-gold-300/50 pointer-events-none"></div>
        </div>

        {/* Optional: Subtitle or additional text */}
        <div className="text-center mt-4 text-gold-600 font-serif text-sm">
          Welcome to ISKCON Jabalpur
        </div>
      </div>
    </div>
  );
};

export default BannerPopup;
