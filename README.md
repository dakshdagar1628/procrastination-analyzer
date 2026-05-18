<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:4a0e8f,100:e94560&height=200&section=header&text=Procrastination+Analyzer&fontSize=42&fontColor=ffffff&fontAlignY=38&desc=Track%20•%20Classify%20•%20Conquer%20Your%20Time&descAlignY=58&descColor=c9b8ff&animation=fadeIn" width="100%"/>

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

> **Stop guessing where your time goes. Start knowing.**
> Log your daily website usage, classify activities as productive or wasteful, and get beautiful analytics charts to understand your real patterns.

</div>

---

## ? Features

| Feature | Description |
|---|---|
| ? **Manual Activity Logging** | Log websites and activities with time spent |
| ?️ **Smart Classification** | Tag activities as Productive / Neutral / Procrastination |
| ? **Analytics Dashboard** | Visual charts powered by Chart.js |
| ? **Docker Ready** | One-command setup with Docker Compose |
| ? **REST API** | Clean Express.js API for all operations |

---

## ?️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Tailwind CSS + Chart.js |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| DevOps | Docker + Docker Compose |

---

## ? Quick Start

### With Docker (Recommended)
```bash
git clone https://github.com/dakshdagar1628/procrastination-analyzer.git
cd procrastination-analyzer
docker-compose up --build
```
App runs at **http://localhost:5173** · API at **http://localhost:3000**

### Manual Setup

**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## ? API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/activities` | Log a new activity |
| `GET` | `/api/activities` | Fetch all logged activities |
| `GET` | `/api/analytics` | Get aggregated analytics data |

---

## ? Project Structure

```
procrastination-analyzer/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Route handlers
│   ├── models/         # PostgreSQL models
│   └── routes/         # API routes
├── frontend/
│   └── src/
│       ├── components/ # React components
│       ├── pages/      # Page views
│       └── services/   # API calls
└── docker-compose.yml
```

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:e94560,50:4a0e8f,100:1a1a2e&height=100&section=footer" width="100%"/>
</div>