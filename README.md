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
- In-memory user and session storage
- Optional email service can be added later for verification and contact forms

### Database
- No database is used
- All users and sessions are stored in memory on the backend
- Data resets when the server restarts

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

- The backend is intentionally database-free.
- If you want persistence later, the next step would be to add MongoDB or PostgreSQL.
