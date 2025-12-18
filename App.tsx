/**
 * @fileoverview Main application component for ISKCON Jabalpur website.
 * Handles page routing, navigation state, and renders the complete application layout.
 * Acts as the central controller for the single-page application architecture.
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DarshanTimings from './components/DarshanTimings';
import GitaCourse from './components/GitaCourse';
import ProjectVideoSection from './components/ProjectVideoSection';
import HomeEventsSection from './components/HomeEventsSection';
import HomeCommunitySection from './components/HomeCommunitySection';
import Footer from './components/Footer';
import AboutPage from './components/pages/AboutPage';
import DarshanPage from './components/pages/DarshanPage';
import EventsPage from './components/pages/EventsPage';
import GitaCoursePage from './components/pages/GitaCoursePage';
import ProjectsPage from './components/pages/ProjectsPage';
import ArambhFestPage from './components/pages/ArambhFestPage';
import BannerPopup from './components/BannerPopup';
import { Page } from './types';

/**
 * Main application component that manages navigation state and renders the entire website.
 * Implements a single-page application pattern with conditional rendering based on current page.
 *
 * Key Features:
 * - Central state management for page navigation
 * - Automatic scroll restoration on page changes
 * - Conditional rendering of home page sections vs dedicated pages
 * - Responsive layout with consistent header/footer
 *
 * @component
 */
function App() {
  // Current active page state - defaults to home page
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Banner popup visibility state
  const [showBannerPopup, setShowBannerPopup] = useState(false);

  /**
   * Effect hook that scrolls to top whenever page changes.
   * Ensures smooth navigation experience by resetting scroll position
   * when users navigate between different sections/pages.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  /**
   * Effect hook that shows banner popup when visiting home page.
   * Automatically displays the banner popup for first-time visitors or page reloads.
   */
  useEffect(() => {
    if (currentPage === 'home') {
      // Show popup after a brief delay for better UX
      const timer = setTimeout(() => {
        setShowBannerPopup(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  /**
   * Renders the appropriate page content based on current page state.
   * Implements conditional rendering pattern for SPA navigation.
   *
   * Home page renders multiple sections in sequence:
   * 1. HeroSection - Rotating quotes and CTAs
   * 2. DarshanTimings - Temple schedule
   * 3. HomeEventsSection - Event previews
   * 4. GitaCourse - Educational section
   * 5. ProjectVideoSection - Project features
   * 6. HomeCommunitySection - Community links
   *
   * @returns {React.ReactNode} The page component to render
   */
  const renderPage = (): React.ReactNode => {
    switch (currentPage) {
      case 'home':
        // Home page: multi-section layout with navigation between sections
        return (
          <>
            <HeroSection onNavigate={setCurrentPage} />
            <DarshanTimings />
            <HomeEventsSection onNavigate={setCurrentPage} />
            <GitaCourse onNavigate={setCurrentPage} />
            <ProjectVideoSection onNavigate={setCurrentPage} />
            <HomeCommunitySection onNavigate={setCurrentPage} />
          </>
        );
      case 'about':
        return <AboutPage />;
      case 'darshan':
        return <DarshanPage />;
      case 'events':
        return <EventsPage />;
      case 'gita-course':
        return <GitaCoursePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'arambh-fest':
        return <ArambhFestPage />;
      default:
        // Fallback for invalid/undefined pages
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-maroon-900 font-sans">
      {/* Fixed header - stays at top during scrolling */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Banner Popup - shows on homepage load */}
      {showBannerPopup && (
        <BannerPopup onClose={() => setShowBannerPopup(false)} />
      )}

      {/* Main content area - takes up remaining vertical space */}
      <main className="flex-grow pt-0 w-full overflow-hidden">
        {renderPage()}
      </main>

      {/* Fixed footer - stays at bottom */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
