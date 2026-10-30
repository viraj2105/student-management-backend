# Student Management Backend (Node + Express + MongoDB)

## Run locally
1. Install Node 18+ and MongoDB (or use a free MongoDB Atlas cluster)
2. `npm install`
3. `cp .env.example .env` and edit values
4. `npm start`  → http://localhost:5000

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /api/students?page=1&limit=10&search=&course= | List (paginated, searchable) |
| GET | /api/students/:id | One student |
| POST | /api/students | Create (needs x-api-key if API_KEY set) |
| PUT | /api/students/:id | Update (needs x-api-key) |
| DELETE | /api/students/:id | Delete (needs x-api-key) |

Sample body:
```json
{ "name": "Asha Patil", "email": "asha@example.com", "rollNumber": "CS101", "course": "Computer Science", "year": 2, "phone": "9999999999" }
```

## Deploy on Render (free)
1. Create a free cluster on MongoDB Atlas → Database Access: create user → Network Access: allow `0.0.0.0/0` → copy connection string
2. Push this folder to GitHub (`.env` must NOT be pushed)
3. Render → New → Web Service → connect repo
   - Build command: `npm install`
   - Start command: `npm start`
4. Environment variables: `MONGO_URI`, `API_KEY`, `CLIENT_URL` (do not set PORT)
5. Open `https://<your-app>.onrender.com/health`
