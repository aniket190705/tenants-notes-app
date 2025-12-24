📝 Notes Management App (JWT + RBAC)

A role-based Notes Management application built with Node.js, Express, MongoDB, and React.
The app demonstrates secure authentication, role-based access control, and CRUD APIs, with a simple frontend UI for interaction.

🚀 Features
🔐 Authentication

User registration & login

Password hashing with bcrypt

JWT-based authentication

Protected routes

🗂 Notes (CRUD)

Create notes (title & content)

View all notes

Update notes

Delete notes (Admin only)

🛡 Role-Based Access Control
Action	User	Admin
View notes	✅	✅
Create notes	✅	✅
Update notes	✅	✅
Delete notes	❌	✅

Role checks are enforced on the backend using JWT.

🖥 Frontend

Built with React

Login & logout

Protected dashboard

Create, edit, view notes

Displays API error/success messages

🧱 Tech Stack

Backend: Node.js, Express, MongoDB, JWT, bcrypt
Frontend: React, Axios, React Router

🔗 API Versioning

All APIs are versioned under:

/api/v1

📚 API Documentation
Authentication

Login

POST /api/v1/auth/login


Response

{
  "token": "jwt_token",
  "role": "user"
}

Notes (JWT Required)

Create Note

POST /api/v1/notes


Get Notes

GET /api/v1/notes


Update Note

PUT /api/v1/notes/:id


Delete Note (Admin only)

DELETE /api/v1/notes/:id

⚙️ Installation
Backend
git clone https://github.com/your-username/notes-app.git
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=mongodb://localhost:27017/notesdb
JWT_SECRET=your_secret_key


Run:

npm run dev

Frontend
cd frontend
npm install
npm start


Frontend: http://localhost:3000

Backend: http://localhost:5000

🔒 Security & Scalability

JWT-based auth

Backend-enforced role checks

Modular project structure

API versioning for future scalability

✅ Assignment Coverage

✔ Authentication & JWT
✔ Role-based access control
✔ CRUD APIs
✔ API versioning
✔ Frontend integration

👨‍💻 Author

Aniket Sharma