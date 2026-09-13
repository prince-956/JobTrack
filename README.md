# JobTrack

JobTrack is a full-stack job application tracking platform that helps users manage their job applications in one place.

Users can securely create an account, log in, add job applications, update application details, change application status, and track application statistics through a React dashboard.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Create job applications
- View personal job applications
- Edit application details
- Delete applications
- Update application status
- Application statistics
- Save job posting URLs
- View saved job postings
- User-specific application data
- RESTful API architecture
- Responsive React frontend

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Frontend

- React
- Vite
- Axios
- React Router

### Tools

- Git
- GitHub
- Postman
- MongoDB Compass
- VS Code

## Project Structure

```text
JobTrack/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── applicationController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Application.js
│
├── routes/
│   ├── authRoutes.js
│   └── applicationRoutes.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ApplicationCard.jsx
│   │   │   ├── ApplicationForm.jsx
│   │   │   └── StatsCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .env
├── .gitignore
├── package.json
└── server.js