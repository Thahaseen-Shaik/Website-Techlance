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
- Browser `localStorage` for session, account, and theme persistence

### Backend
- Node.js
- Native `http` server
- Optional REST API for authentication and session handling
- Password hashing with `crypto`
- SQLite-backed user and session storage
- Optional email service can be added later for verification and contact forms

### Database
- SQLite database stored at `server/data/techlance.sqlite`
- Users and sessions persist across server restarts when the backend is running

### Current Status
- A lightweight backend is implemented in this repository
- Authentication is browser-based, so register/login keep working after static deployment
- Session and theme data are persisted in the browser for convenience

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

- The frontend no longer depends on the backend for login or registration.
- The backend is still available if you want to extend the app with shared server-side data later.
