# PrepPilot Frontend

PrepPilot is a modern AI-powered interview preparation platform.  
This frontend provides the user-facing interface for authentication, account verification, dashboard access, and future AI-driven resume/interview workflows.

This project is part of the full-stack **PrepPilot** application built by **Anupam Choubey**.

---

## Overview

The frontend is built with **React + Vite** and follows a modular architecture so the codebase remains clean, scalable, and easy to understand.

The current frontend includes:

- Landing page
- Authentication pages
- Register with optional profile picture upload
- Login
- Email verification flow
- Forgot password flow
- Reset password flow
- Protected dashboard
- Current user session restore using backend cookies
- Logout
- Responsive SaaS-style UI
- Reusable layout and common components

The frontend connects to the existing Express/MongoDB backend API.

---

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Context API

---

## Project Structure

```txt
client/
├── public/
├── src/
│   ├── app/
│   │   └── router.jsx
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── config/
│   │   ├── api.js
│   │   └── env.js
│   │
│   ├── constants/
│   │   └── routes.js
│   │
│   ├── features/
│   │   └── auth/
│   │       ├── api/
│   │       ├── components/
│   │       ├── context/
│   │       ├── hooks/
│   │       └── pages/
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
└── vite.config.js