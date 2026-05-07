# Techlance Solutions Website

Official website for **Techlance Solutions**, built using a modern React + Vite frontend with an optional lightweight Node.js backend. The project is designed for fast performance, clean UI/UX, simple authentication flow, and easy deployment.

---

# 🚀 Overview

Techlance Solutions Website is a modern business/startup website that includes:

- User Registration & Login
- Persistent Authentication
- Theme Persistence (Dark/Light Mode)
- Responsive Modern UI
- Smooth Animations
- Optional Backend Support
- SQLite Database Integration
- Session Management
- Scalable Project Structure

The application is primarily frontend-driven and works even after static deployment because authentication and session persistence are handled in the browser using `localStorage`.

The backend is optional and can later be extended for:
- Shared server-side data
- Email verification
- Contact forms
- Admin dashboards
- Analytics
- Real database-driven authentication

---

# 🛠 Tech Stack

## Frontend

The frontend is built with modern React tooling for high performance and maintainability.

### Technologies Used

- **React 19**
- **Vite**
- **React Router DOM**
- **Framer Motion**
- **Lucide React Icons**
- **Plain CSS**
- **Browser localStorage**

### Frontend Features

- Responsive Design
- Smooth Page Transitions
- Modern Startup UI
- Persistent Login Sessions
- Theme Persistence
- Component-Based Architecture
- Fast Hot Reloading with Vite
- Client-Side Routing
- Lightweight Authentication System

---

## Backend

The backend is intentionally lightweight and extensible.

### Technologies Used

- **Node.js**
- Native `http` Server
- REST API Architecture
- `crypto` for Password Hashing
- SQLite Database

### Backend Features

- User Authentication APIs
- Password Hashing
- Session Handling
- Persistent Storage
- SQLite Integration
- Extendable API Structure

---

## Database

### SQLite Database

Database File Location:

```bash
server/data/techlance.sqlite
```

### Database Stores

- Registered Users
- Session Information
- Authentication Data

The database persists even after server restarts.

---

# 📂 Project Structure

```bash
techlance-solutions/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── routes/
│   ├── styles/
│   └── main.jsx
│
├── server/
│   ├── data/
│   │   └── techlance.sqlite
│   │
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ✨ Features

## 🔐 Authentication System

The project includes a browser-based authentication system.

### Authentication Features

- User Registration
- User Login
- Session Persistence
- Logout Functionality
- Password Storage
- Optional Backend Authentication

### Important Note

Even after static deployment:

✅ Login works  
✅ Registration works  
✅ Session persists  

Because authentication data is stored in browser `localStorage`.

---

## 🎨 Theme Persistence

The application supports theme persistence using browser storage.

### Supported Features

- Dark Mode
- Light Mode
- Persistent Theme Selection
- Instant Theme Switching

---

## 📱 Responsive Design

The website is fully responsive across devices.

### Supported Devices

- Mobile Phones
- Tablets
- Laptops
- Desktop Screens

---

## ⚡ Animations

Smooth animations are implemented using **Framer Motion**.

### Animation Features

- Page Transitions
- Hover Effects
- Scroll Animations
- Interactive UI Motion

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/techlance-solutions.git
```

---

## Navigate into the Project

```bash
cd techlance-solutions
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🚀 Run Frontend Development Server

```bash
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

---

# 🖥 Run Backend Server

```bash
npm run server
```

Backend server example:

```bash
http://localhost:5000
```
# 🏗 Production Build

Generate optimized production files:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

# 🌐 Deployment

The frontend can be deployed easily on:

- Vercel
- Netlify
- Render
- GitHub Pages

### Recommended Platform

✅ Vercel

---

# 📌 Deployment Notes

## Frontend Deployment

Since authentication is browser-based:

- No backend is required for login/register
- Static deployment works perfectly
- Sessions persist using `localStorage`

---

## Backend Deployment

Backend deployment is optional.

You may deploy the backend separately later for:

- Shared user accounts
- Real database authentication
- Contact forms
- Email verification
- Admin panel
- Analytics

---

# 🔒 Security

### Password Handling

Passwords are hashed using Node.js `crypto` before storage.

### Session Persistence

Sessions are stored locally in the browser for convenience.

---

# 📚 Available Scripts

## Start Frontend

```bash
npm run dev
```

---

## Start Backend

```bash
npm run server
```

---

## Build Project

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---
# ⭐ Support

If you like this project:

- Star the repository
- Fork the project
- Share with others

---

# 📬 Contact

For business inquiries or collaborations:

- Email Support :- thahaseengulamshaik@gmail.com
- LinkedIn :- https://www.linkedin.com/in/thahaseen-gulam-b8858a347
- GitHub :- https://github.com/Thahaseen-Shaik



---

# 🧠 Key Highlights

✅ Modern React Architecture  
✅ Vite Fast Build System  
✅ Responsive UI  
✅ Browser-Based Authentication  
✅ Persistent Sessions  
✅ SQLite Database  
✅ Optional Backend Support  
✅ Easy Deployment  
✅ Scalable Structure  
✅ Startup-Ready Website  

---
