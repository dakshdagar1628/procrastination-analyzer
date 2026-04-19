# Procrastination Analyzer

A full-stack web app to manually log website usage, classify activities, and review analytics with charts.

## Tech Stack

- Frontend: React + Tailwind CSS + Chart.js
- Backend: Node.js + Express.js
- Database: PostgreSQL

## Project Structure

```text
backend/
  config/
  controllers/
  models/
  routes/
frontend/
  src/
    components/
    pages/
    services/
```

## Backend Setup

1. Copy `backend/.env.example` to `backend/.env`.
2. Update `DATABASE_URL` with your PostgreSQL credentials.
3. Install dependencies and start the server.

```bash
cd backend
npm install
npm run dev
```

## Frontend Setup

1. Copy `frontend/.env.example` to `frontend/.env` if you want to change the API URL.
2. Install dependencies and start the frontend.

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /api/activities`
- `GET /api/activities`
- `GET /api/analytics`
