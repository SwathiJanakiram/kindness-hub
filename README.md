# 🌸 Kindness Hub

> An anonymous community platform to spread compliments and get advice — no accounts, no tracking, just kindness.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-6366f1?style=flat-square&logo=render)](https://kindness-hub-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-SwathiJanakiram-181717?style=flat-square&logo=github)](https://github.com/SwathiJanakiram)
[![Made with MERN](https://img.shields.io/badge/Stack-MERN-4DB33D?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

---

## ✨ Features

- 💌 **Compliment Board** — Post anonymous kind notes to the world. Anyone can heart them.
- 💡 **Advice Board** — Share a problem anonymously. The community suggests solutions.
- 🤖 **AI-Powered First Advice** — Every problem gets an instant AI-generated response via Google Gemini.
- 🔐 **Secret Code System** — No login required. Get a unique code (`KH-XXXXX`) when you post. Use it anytime to find your post and see reactions.
- 📊 **Live Analytics** — Track total visits, unique sessions, compliments posted, advice given, and daily trends.
- 🛡️ **Zero Personal Data** — No names, no emails, no IPs stored. Ever.

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS v4, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| AI | Google Gemini API (`gemini-2.0-flash-lite`) |
| Notifications | React Hot Toast |
| Deployment | Render (both frontend + backend) |

---

## 📁 Project Structure

```
kindness-hub/
├── backend/
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── gemini.js           # Gemini AI helper
│   ├── controllers/
│   │   ├── complimentCtrl.js
│   │   ├── problemCtrl.js
│   │   └── statsCtrl.js
│   ├── models/
│   │   ├── Compliment.js
│   │   ├── Problem.js
│   │   └── Stats.js
│   ├── routes/
│   │   ├── compliments.js
│   │   ├── problems.js
│   │   └── stats.js
│   ├── .env                    # (not committed)
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── compliments.js
    │   │   ├── problems.js
    │   │   └── stats.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Loader.jsx
    │   │   ├── SecretCodeModal.jsx
    │   │   ├── ComplimentCard.jsx
    │   │   ├── ComplimentForm.jsx
    │   │   ├── ProblemCard.jsx
    │   │   ├── ProblemForm.jsx
    │   │   ├── CategoryFilter.jsx
    │   │   └── AdviceItem.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Compliments.jsx
    │   │   ├── Problems.jsx
    │   │   ├── ProblemDetail.jsx
    │   │   └── NotFound.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── .env                    # (not committed)
```

---

## 🗄️ Data Models

### Compliment
```js
{
  message:    String,   // max 280 chars
  secretCode: String,   // e.g. "KH-X7R2P", unique, indexed
  hearts:     Number,   // default 0
  createdAt:  Date
}
```

### Problem
```js
{
  title:       String,   // max 100 chars
  description: String,   // max 500 chars
  category:    String,   // career | relationships | mental health | academics | finance | other
  secretCode:  String,   // e.g. "KH-A3T8Q", unique, indexed
  advice: [{
    suggestion: String,  // max 400 chars
    helpful:    Number,  // default 0
    isAI:       Boolean, // true for Gemini-generated advice
    createdAt:  Date
  }],
  createdAt:   Date
}
```

### Stats (singleton)
```js
{
  totalVisits:       Number,
  uniqueSessions:    Number,
  complimentsPosted: Number,
  problemsPosted:    Number,
  adviceGiven:       Number,
  heartsGiven:       Number,
  codesSearched:     Number
}
```

---

## 🔌 API Reference

### Compliments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/compliments` | Get all compliments |
| POST | `/api/compliments` | Create compliment → returns `secretCode` |
| GET | `/api/compliments/code/:code` | Find compliment by secret code |
| PATCH | `/api/compliments/:id/heart` | Heart a compliment |
| DELETE | `/api/compliments/:id` | Delete a compliment |

### Problems
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/problems` | Get all problems (no advice array) |
| GET | `/api/problems?category=career` | Filter by category |
| GET | `/api/problems/:id` | Get problem + all advice |
| GET | `/api/problems/code/:code` | Find problem by secret code |
| POST | `/api/problems` | Create problem → returns `secretCode` + triggers AI advice |
| POST | `/api/problems/:id/advice` | Add advice to a problem |
| PATCH | `/api/problems/:id/advice/:adviceId/helpful` | Mark advice helpful |
| DELETE | `/api/problems/:id` | Delete a problem |
| DELETE | `/api/problems/:id/advice/:adviceId` | Delete a piece of advice |

### Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get all-time totals |
| GET | `/api/stats/daily` | Get last 30 days of daily data |
| POST | `/api/stats/visit` | Track a page visit |
| POST | `/api/stats/session` | Track a unique session |

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### 1. Clone the repo
```bash
git clone https://github.com/SwathiJanakiram/kindness-hub.git
cd kindness-hub
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm run dev
```

Backend runs at `http://localhost:5000`

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🌍 Deployment (Render)

Both frontend and backend are deployed on [Render](https://render.com) free tier.

### Backend (Web Service)
| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Env Variables | `MONGO_URI`, `PORT`, `GEMINI_API_KEY` |

### Frontend (Static Site)
| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| Env Variables | `VITE_API_URL` = backend Render URL + `/api` |

---

## 🔐 Privacy Design

| What | How |
|---|---|
| No user accounts | Anonymous posting only |
| No IP storage | Not logged or stored anywhere |
| No cookies | Session tracked via `sessionStorage` only (clears on tab close) |
| Secret codes | Generated with `nanoid`, shown once — we don't store who owns them |
| Data deletion | Posts can be deleted via their MongoDB `_id` |

---

## 🤖 AI Advice Flow

1. User posts a problem
2. Backend responds immediately with `secretCode` (user doesn't wait)
3. In the background, Gemini API generates empathetic, actionable advice
4. Advice is pushed as the **first item** in the problem's advice array with `isAI: true`
5. Frontend refetches after 5 seconds to display the ✨ AI Generated badge
6. If Gemini quota is exceeded → fails silently, problem still works normally

---

## 📸 Screenshots

> Add screenshots here after deployment!
> - Home page
![Home](/images/Home.png)
> - Compliment board
![Compliment](/images/Complimnet.png)
> - Secret code modal
![Secrect Code ](/images/Secret_code.png)

---

## 🛠️ Future Improvements

- [ ] Dark / light theme toggle
- [ ] Report / flag inappropriate posts
- [ ] Share a post via link
- [ ] Compliment categories (friendship, motivation, work etc.)
- [ ] Email the secret code to yourself (optional, anonymous)
- [ ] Admin dashboard for moderation

