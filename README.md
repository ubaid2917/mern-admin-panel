# Hospital Management System

This is a comprehensive MERN stack Hospital Management project with backend (Node.js, Express, Sequelize, Swagger) and frontend (React, Vite).

## Features

### Core Modules
- **Patient Panel** - Patient registration, appointment booking, medical history tracking
- **Doctor Panel** - Patient management, prescription writing, appointment scheduling
- **Admin Panel** - Complete system management, user control, analytics dashboard

### Key Functionalities
- **Live Consultation** - Real-time video consultations through Google Meet integration
- **OPD Management**
  - OPD In - Patient check-in and registration
  - OPD Out - Discharge processing and billing
- **JWT Authentication** - Secure login system for all user roles
- **SmartCard Management** - Digital patient ID cards
- **API Documentation** - Interactive Swagger documentation

## Getting Started

### Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
3. Start server:
   ```bash
   npm start
   ```
4. Swagger documentation available at:
   - `http://localhost:5000/api-docs`

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure
```
├── backend/          # Node.js API server
│   ├── controllers/  # Business logic
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── middleware/   # Authentication & validation
│
└── frontend/         # React application
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   └── services/    # API services
    └── public/
```

## API Documentation
All endpoints are fully documented using Swagger. Access the interactive API documentation at `/api-docs` after starting the backend server.

## Technologies Used

### Backend
- Node.js & Express
- Sequelize ORM
- JWT Authentication
- Swagger (API Documentation)
- Google Meet API

### Frontend
- React 18
- Vite
- React Router
- Axios

## License
MIT

## Author
[ubaid2917](https://github.com/2917)