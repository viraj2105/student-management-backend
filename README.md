# Student Management Backend

A RESTful API built using **Node.js, Express.js, and MongoDB** to manage student records efficiently.

## Features

- Create new student records
- Retrieve all students
- Retrieve a student by ID
- Update student details
- Delete student records
- Search students by name or course
- Pagination support
- API key authentication
- Centralized error handling

## Tech Stack

- **Runtime:** Node.js
- **Backend:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** API Key

## Project Structure

```text
student-management-backend/
├── config/
│   └── db.js
├── controllers/
│   └── studentController.js
├── middleware/
│   ├── apiKey.js
│   └── errorHandler.js
├── models/
│   └── Student.js
├── routes/
│   └── studentRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation and Setup

**1. Clone the repository**

```bash
git clone https://github.com/viraj2105/student-management-backend.git
```

**2. Navigate to the project directory**

```bash
cd student-management-backend
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory using `.env.example` as a reference.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=*
API_KEY=your_secret_api_key
```

Replace the placeholder values with your actual configuration. Never upload your `.env` file to GitHub.

**5. Start the server**

```bash
npm start
```

For development:

```bash
npm run dev
```

The server runs locally at:

`http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/students?page=1&limit=10&search=&course=` | Get students with pagination and search |
| GET | `/api/students/:id` | Get a student by ID |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update student details |
| DELETE | `/api/students/:id` | Delete a student |

**Authentication:** Include the following header for protected operations:

```text
x-api-key: your_secret_api_key
```

## Sample Student Request

```json
{
  "name": "Asha Patil",
  "email": "asha@example.com",
  "rollNumber": "CS101",
  "course": "Computer Science",
  "year": 2,
  "phone": "9999999999"
}
```

## Deployment on Render

1. Create a MongoDB Atlas cluster and configure database access.
2. Push the project repository to GitHub.
3. Sign in to Render and create a new Web Service.
4. Connect your GitHub repository.
5. Configure the following commands:

   **Build Command:**
   ```bash
   npm install
   ```

   **Start Command:**
   ```bash
   npm start
   ```

6. Add the required environment variables in Render:
   - `MONGO_URI`
   - `API_KEY`
   - `CLIENT_URL`

   Do not manually set `PORT` on Render.

7. After deployment, check the health endpoint:

`https://your-app-name.onrender.com/health`

## Author

**Viraj Amol Deshmukh**

GitHub: https://github.com/viraj2105