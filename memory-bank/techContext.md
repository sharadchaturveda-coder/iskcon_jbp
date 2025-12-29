# Technical Context

## Core Technology Stack

### Frontend Framework
- **Framework**: React 18+
  - **Version**: 18.x
  - **Rationale**: Modern component-based architecture, excellent ecosystem, TypeScript support, spiritual app requirements

### Build Tools
- **Build System**: Vite
  - **Version**: Latest stable
  - **Rationale**: Fast development server, optimized production builds, native ES modules support
- **Package Manager**: npm
  - **Version**: 8.x+
- **Development Server**: Vite dev server with HMR

### Styling
- **CSS Framework**: Tailwind CSS
  - **Version**: 3.x
  - **Configuration**: Custom spiritual color palette (maroon, gold, saffron)
- **Design System**: Custom spiritual design system
  - **Components**: GoldBorder, MandalaPattern, SectionHeading, OrnateDivider
  - **Icons**: Lucide React icon library

### State Management
- **Global State**: React Context API + useState
- **Local State**: React hooks (useState, useEffect, useCallback)
- **Data Fetching**: Custom hooks (useEvents, useGallery, usePosts, useCategories)

### API Integration
- **CMS**: Sanity.io headless CMS
  - **Client**: @sanity/client, @sanity/image-url
  - **Studio**: sanity/desk-tool with custom configuration
- **HTTP Client**: Fetch API (built-in)
- **API Design**: Sanity GROQ queries for content fetching
- **Authentication**: Sanity authentication for studio access

## Development Environment

### IDE/Editor
- **Primary Tool**: Visual Studio Code
  - **Version**: Latest stable
  - **Configuration**: Cline workspace settings
- **Extensions**: TypeScript, React, Tailwind CSS, Git integration
- **Configuration**: Prettier formatting, ESLint integration

### Code Quality
- **Type Checking**: TypeScript 5.x with strict mode
- **Formatting**: Prettier with custom spiritual app rules
- **Linting**: ESLint with React and TypeScript rules
- **Testing**: Manual testing with browser dev tools

### Environment Setup
- **Node.js Version**: 18.x+ (LTS)
- **OS Support**: Windows 10+, macOS, Linux
- **Dependencies**: Git, Node.js, npm

## Key Libraries & Dependencies

### Production Dependencies
- **@sanity/client**: ^6.x - Sanity CMS client for content fetching
- **@sanity/image-url**: ^1.x - Image URL generation for Sanity assets
- **react**: ^18.x - UI framework
- **react-dom**: ^18.x - React DOM rendering
- **lucide-react**: ^0.x - Icon library for spiritual design
- **tailwindcss**: ^3.x - Utility-first CSS framework

### Development Dependencies
- **@types/react**: TypeScript definitions for React
- **@types/react-dom**: TypeScript definitions for React DOM
- **@vitejs/plugin-react**: Vite plugin for React
- **vite**: Build tool and dev server
- **typescript**: TypeScript compiler
- **autoprefixer**: CSS vendor prefixing
- **postcss**: CSS processing

## Technical Constraints

### Performance Targets
- **Load Time**: [Target page load times]
- **Bundle Size**: [Maximum bundle size limits]
- **Core Web Vitals**: [Lighthouse scores, FID, CLS, LCP targets]

### Browser Support
- **Target Browsers**: [Chrome, Firefox, Safari, Edge versions]
- **Mobile Support**: [iOS, Android version support]
- **Progressive Enhancement**: [Fallback strategies]

### Security Requirements
- **Data Protection**: [PII handling, encryption requirements]
- **Authentication**: [Security standards and protocols]
- **Compliance**: [GDPR, HIPAA, SOC2, etc. requirements]

### Scalability Considerations
- **User Load**: [Expected concurrent users]
- **Data Volume**: [Expected data storage and processing needs]
- **Growth Projections**: [Scalability requirements]

## Deployment & Hosting

### Hosting Platform
- **Provider**: [Vercel, Netlify, AWS, etc.]
- **Region**: [Geographic deployment regions]
- **CDN**: [Content delivery network setup]

### CI/CD Pipeline
- **Platform**: [GitHub Actions, GitLab CI, etc.]
- **Triggers**: [When deployments are triggered]
- **Environments**: [Development, staging, production setups]

### Monitoring & Analytics
- **Error Tracking**: [Sentry, Rollbar, etc.]
- **Performance Monitoring**: [Application performance monitoring]
- **Analytics**: [User analytics and tracking]

## Development Workflow

### Version Control
- **System**: [Git, with branching strategy]
- **Commit Convention**: [Conventional commits, semantic versioning]
- **Code Review**: [Pull request process]

### Project Management
- **Issue Tracking**: [GitHub Issues, Jira, etc.]
- **Documentation**: [Wiki, README, API docs]
- **Communication**: [Slack, Discord, email]

### Quality Assurance
- **Testing Strategy**: [Unit, integration, e2e testing approaches]
- **Accessibility**: [WCAG compliance level]
- **Cross-browser Testing**: [Testing methodologies]