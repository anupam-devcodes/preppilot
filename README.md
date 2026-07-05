<div align="center">

# 🚀 PrepPilot

### AI-Powered Interview Preparation Platform

Analyze resumes, compare them with job descriptions, generate personalized interview questions, identify skill gaps, and build ATS-optimized resumes using Generative AI.

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)
![License](https://img.shields.io/badge/Status-Under%20Development-blue)

</div>

---

# 📖 Overview

Preparing for technical interviews often requires multiple tools for resume analysis, interview preparation, ATS optimization, and skill assessment.

PrepPilot combines all these capabilities into a single intelligent platform powered by Google Gemini.

The platform analyzes resumes against job descriptions, identifies missing skills, generates personalized interview questions, provides interview reports, and creates ATS-friendly resumes.

---

# ✨ Features

## Resume Analysis

- Upload Resume (PDF)
- Extract Resume Content
- Parse Candidate Skills
- Experience Analysis
- Education Extraction

---

## Job Description Matching

- Upload Job Description
- Compare Resume with JD
- Identify Missing Skills
- Skill Gap Report
- Match Percentage

---

## AI Interview Preparation

- Personalized Technical Questions
- Behavioral Questions
- Company-Oriented Questions
- Difficulty-wise Questions
- AI Generated Interview Report

---

## ATS Resume Generator

- ATS-Friendly Resume
- AI Content Optimization
- Resume Improvement Suggestions
- Professional PDF Export

---

## Authentication

- JWT Authentication
- Protected Routes
- Secure Login
- Secure Registration
- Token Blacklisting
- User Profile Management

---

# 🏗 Architecture

```
                React + Vite

                       │

               Context API

                       │

                Axios Services

                       │

               Express Backend

                       │

      JWT Authentication Middleware

                       │

     Google Gemini AI Integration

                       │

                 MongoDB Atlas
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- SCSS
- Axios
- React Router
- Context API

## Backend

- Node.js
- Express.js
- JWT
- Multer
- Zod
- Puppeteer

## Database

- MongoDB Atlas

## AI

- Google Gemini API

---

# 📂 Project Structure

```
client/
server/

controllers/
routes/
middleware/
models/
services/
hooks/
context/
utils/
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/preppilot.git
```

---

## Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

---

## Environment Variables

Backend

```env
PORT=

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=
```

---

## Start Backend

```bash
npm run dev
```

---

## Start Frontend

```bash
npm run dev
```

---

# 📸 Screenshots

Coming Soon...

---

# 🗺 Roadmap

- Resume Parsing
- JD Matching
- AI Interview Generation
- ATS Resume Generator
- Authentication
- Dashboard
- Analytics
- Docker Support
- Redis Caching
- Swagger API Documentation
- Email Verification
- Interview History
- Role Based Access Control

---

# 📈 Future Enhancements

- Voice Mock Interviews
- AI Interview Scoring
- Company-wise Interview Preparation
- Real-time Feedback
- Resume Version History
- Interview Calendar
- Export Reports
- Admin Dashboard

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository and submit a pull request.

---

<div align="center">

Made with ❤️ using React, Node.js, Express, MongoDB and Google Gemini

</div>
