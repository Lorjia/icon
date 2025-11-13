# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite web application that provides an iTunes App Store icon search and download service. The app allows users to search for apps from different regions (CN, US, JP, KR) and download their icons in various formats.

## Core Technologies

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + PostCSS
- **State Management**: Zustand stores
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Build Tool**: Vite with TypeScript path mapping (@/* aliases)

## Development Commands

```bash
# Start development server with HMR
pnpm dev

# Type checking without emitting files
pnpm check

# Build for production (includes TypeScript compilation)
pnpm build

# Preview production build locally
pnpm preview

# Run ESLint
pnpm lint
```

## Architecture Overview

### Application Structure
- Single-page application with React Router
- Main route `/` renders the Home page
- Path aliases configured: `@/*` maps to `./src/*`

### State Management Architecture
The app uses Zustand for client-side state management with three main stores:

1. **Search Store** (`src/stores/search.ts`): Manages search query, country/region selection, software entity type, and results
2. **Favorites Store** (`src/stores/favorites.ts`): Handles user's favorite app icons
3. **Download Store** (`src/stores/download.ts`): Manages download progress and state

### Core Services
- **iTunes API Service** (`src/services/itunes.ts`): Handles searching Apple's iTunes Search API with support for different countries and software entities (iOS, iPadOS, macOS apps)

### Key Components Layout
- **Navigation**: Top navigation bar
- **Hero**: Search interface with region selector
- **ResultsGrid**: Displays search results in a grid layout
- **Footer**: Bottom page footer
- **Toast**: Global notification system

### Utility Libraries
- **Download utilities** (`src/lib/download.ts`): Progress-aware fetch with blob saving capabilities
- **Image utilities** (`src/lib/image.ts`): Image processing and format conversion
- **Theme hook** (`src/hooks/useTheme.ts`): Theme management
- **Utils** (`src/lib/utils.ts`): General utility functions including clsx + tailwind-merge integration

## Development Workflow

### TypeScript Configuration
- Configured with ES2020 target and ESNext modules
- Path mapping enabled for `@/*` imports
- Strict mode disabled for easier development
- Uses Vite's bundler module resolution

### Build Configuration
- Vite with React plugin and TypeScript path resolution
- Hidden sourcemaps for production builds
- Babel plugin for React dev locator (development debugging)
- Trae badge plugin for production builds

### Code Quality
- ESLint configured with React hooks and React refresh plugins
- TypeScript compiler used for type checking (`pnpm check`)
- PostCSS + TailwindCSS for styling

## iTunes API Integration

The app integrates with Apple's iTunes Search API to search for apps across different regions:
- Supports CN, US, JP, KR regions with locale-specific language settings
- Handles software, iPadSoftware, and macSoftware entities
- Provides pagination and error handling
- Returns structured app data including artwork URLs, descriptions, and metadata

## Deployment

- Configured for Vercel deployment (vercel.json present)
- Production builds include hidden sourcemaps
- Static asset optimization through Vite