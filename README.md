# Sargamela 2025 - Madrasa Arts Festival

A live scoreboard and results tracking system for Madrasa Arts Festival 2025.

🌐 **Live Site**: https://sargamela.elabins.com/

## Features

### 🖥️ Big Screen Display (`/live`)
- Full-screen slideshow presentation for venue displays
- Auto-rotating slides with intro, scoreboard, category breakdowns, and flash news
- Optimized for large screens and projectors
- Real-time data updates from Google Sheets

### 📱 Mobile Website (`/`)
- Mobile-first responsive design
- Complete scoreboard with live rankings
- Detailed category-wise results with horizontal scroll
- Flash news and updates section
- Tab-based navigation for easy browsing
- Perfect for social media sharing

## Routes

- `/` - Mobile-friendly home page (for phones/tablets)
- `/live` - Full-screen display mode (for venue projection)

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Access the app:
   - Mobile site: `http://localhost:5173/`
   - Big screen display: `http://localhost:5173/live`

## Technology Stack

- React 19 with TypeScript
- React Router for navigation
- Framer Motion for animations
- TanStack Query for data fetching
- Tailwind CSS for styling
- Google Sheets integration for real-time data

## Project Structure

```
/components
  /mobile          - Mobile-specific components
  - Layout.tsx     - Big screen layout with ticker
  - *Slide.tsx     - Big screen slide components

/pages
  - HomePage.tsx   - Mobile-friendly landing page
  - LivePage.tsx   - Big screen slideshow page

/hooks
  - useSheetData.ts - Google Sheets data fetching

/services
  - g-sheet        - Google Sheets API integration
```

## Features by Screen Type

### Big Screen (`/live`)
✅ Auto-rotating slides  
✅ News ticker at bottom  
✅ Category breakdown tables  
✅ Animated scoreboard  
✅ Flash news alerts  

### Mobile (`/`)
✅ Tab-based navigation  
✅ Swipeable category tables  
✅ Collapsible sections  
✅ Touch-friendly interface  
✅ Live score updates  
✅ News feed  

## Color Theme

- News Red: `#cc0000`
- News Dark: `#8b0000`
- News Gold: `#ffcc00`
- News Black: `#1a1a1a`
