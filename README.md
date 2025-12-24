# 📝 Notes Management App (JWT + RBAC)

A small **role-based Notes Management** application demonstrating secure backend APIs with **JWT authentication** and **role-based access control (RBAC)**, plus a minimal React frontend to exercise the APIs.

---

## 🔎 Quick summary

- **Backend:** Node.js + Express + MongoDB (Mongoose)  
- **Frontend:** React + Axios  
- **Auth:** bcrypt password hashing + JWT  
- **RBAC:** `user` and `admin` roles — **only admins can delete notes**  
- **API versioning:** all endpoints under `/api/v1`

---

## 🚀 Features

- Register & Login (JWT issued on login)  
- Create, Read, Update notes (title + content)  
- Delete notes — **admin only** (enforced on the backend)  
- Frontend dashboard to test protected routes and CRUD

---

## 📦 Tech stack

**Backend:** Node.js, Express, MongoDB, Mongoose, bcrypt, jsonwebtoken  
**Frontend:** React, Axios, React Router

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
cd notes-app/backend
npm install

# create .env with:
# PORT=5000
# MONGO_URI=<your_mongo_uri>
# JWT_SECRET=<your_jwt_secret>

# start (dev)
npm run dev
```

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