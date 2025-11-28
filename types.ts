/**
 * @fileoverview Core type definitions for the ISKCON Jabalpur website application.
 * These types provide type safety and documentation for the entire application structure.
 */

import React from 'react';

/**
 * Represents the different pages/routes available in the application.
 * Used for navigation state management and routing logic.
 */
export type Page = 'home' | 'about' | 'darshan' | 'events' | 'gita-course' | 'projects' | 'donate';

/**
 * Represents a navigation menu item with a display label and corresponding page.
 * Used in Header component for navigation rendering and state management.
 */
export interface NavItem {
  /** The human-readable label displayed in the navigation menu */
  label: string;
  /** The target page/route to navigate to when clicked */
  page: Page;
}

/**
 * Represents a scheduled event in the temple darshan timetable.
 * Contains timing information and optional descriptive content.
 */
export interface TimingEvent {
  /** The scheduled time for the event (e.g., "04:30 AM") */
  time: string;
  /** The name/title of the event (e.g., "Mangala Aarti", "Bhagavatam Class") */
  event: string;
  /** Optional description providing context or additional details about the event */
  description?: string;
}

/**
 * Represents a feature/benefit of the Bhagavad Gita course.
 * Used to display course highlights with icons and descriptions.
 */
export interface CourseFeature {
  /** React component representing the feature's icon (from Lucide React) */
  icon: React.ElementType;
  /** The title/heading of the feature */
  title: string;
  /** Detailed description of what the feature offers */
  description: string;
}

/**
 * Represents a social media link for community engagement.
 * Used for displaying and linking to ISKCON social media platforms.
 */
export interface SocialLink {
  /** The name of the social media platform (e.g., "Facebook", "Instagram") */
  platform: string;
  /** The full URL to the social media profile/page */
  url: string;
  /** React component for the platform's icon */
  icon: React.ElementType;
}

/**
 * Represents a single question in a course quiz.
 * Contains the question text, multiple choice options, and the correct answer index.
 */
export interface QuizQuestion {
  /** The question text to be displayed to the user */
  question: string;
  /** Array of possible answer choices (4 options typically) */
  options: string[];
  /** The index of the correct answer in the options array (0-based) */
  correctAnswer: number;
}

/**
 * Represents a complete quiz/module in the Gita course.
 * Contains metadata and the collection of questions for that quiz.
 */
export interface Quiz {
  /** Unique identifier for the quiz module */
  id: number;
  /** Title/name of the quiz module */
  title: string;
  /** Brief description of what the quiz covers */
  description: string;
  /** Array of questions that comprise this quiz */
  questions: QuizQuestion[];
}
