# Admin Panel Project

This is a MERN stack admin panel project with backend (Node.js, Express, Sequelize, Swagger) and frontend (React, Vite).

## Features
- JWT authentication
- SmartCard management
- API documentation with Swagger
- Modular code structure

## Getting Started

### Backend
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
4. Swagger docs:
   - Visit `http://localhost:5000/api-docs`

### Frontend
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start frontend:
   ```bash
   npm run dev
   ```

## Folder Structure
- `backend/` - Node.js API
- `frontend/` - React app

## API Documentation
- All endpoints are documented using Swagger (`/api-docs`)

## License
MIT
