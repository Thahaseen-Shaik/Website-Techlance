# Techlance Solutions Website

Official website for Techlance Solutions, built with a modern React and Vite frontend.

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Framer Motion
- Lucide React
- Plain CSS with component-level inline styling
- Browser `localStorage` for session and theme persistence

### Backend
- Node.js
- Native `http` server
- REST API for authentication and session handling
- Password hashing with `crypto`
- SQLite-backed user and session storage
- Optional email service can be added later for verification and contact forms

### Database
- SQLite database stored at `server/data/techlance.sqlite`
- Users and sessions persist across server restarts

### Current Status
- A lightweight backend is implemented in this repository
- Authentication is handled through the backend API
- Session and theme data are still persisted in the browser for convenience

## Production Build

```bash
npm install
npm run build
```

## Development

```bash
npm install
npm run dev
```

## Backend

```bash
npm run server
```

## Notes

- The SQLite database is isolated to the backend and does not change the frontend app.
- If you want to add more persisted features later, we can extend the same database instead of touching the UI.
