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

---

## 🔐 Important: Role enforcement

> Role is determined from the **decoded JWT** on the server.  
> Do **not** rely on client-sent role values — the backend enforces admin-only delete by checking the role inside the JWT.

Example (backend pseudo):
```js
const user = getUserFromReq(req); // from JWT
if (user.role !== 'admin') return res.status(403).json({ error: 'Only admins can delete notes' });

🔗 API (versioned under /api/v1)

All protected endpoints require the header:

Authorization: Bearer <JWT_TOKEN>

Auth
POST /api/v1/auth/register

Body

{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"   // "admin" or "user"
}

POST /api/v1/auth/login

Body

{
  "email": "user@example.com",
  "password": "password123"
}


Success response

{
  "token": "<JWT_TOKEN>",
  "role": "user"
}

Notes (JWT required)
POST /api/v1/notes

Create a note.
Body

{ "title": "My note", "content": "Some content" }

GET /api/v1/notes

Get all notes.

PUT /api/v1/notes/:id

Update a note.
Body (any or both fields)

{ "title": "New title", "content": "New content" }

DELETE /api/v1/notes/:id

Delete a note — Admin only.
Non-admins receive 403 Forbidden.

🔧 Installation & run
Prerequisites

Node.js (v16+ recommended)

MongoDB (local or Atlas)

npm or yarn

Backend
# clone and install
git clone https://github.com/your-username/notes-app.git
cd notes-app/backend
npm install

# create .env with:
# PORT=5000
# MONGO_URI=<your_mongo_uri>
# JWT_SECRET=<your_jwt_secret>

# start (dev)
npm run dev

Frontend
cd ../frontend
npm install
npm start


Frontend default: http://localhost:3000

Backend default: http://localhost:5000

Ensure frontend api base points to /api/v1 (e.g. http://localhost:5000/api/v1).

🧪 Example curl (create note)
curl -X POST http://localhost:5000/api/v1/notes \
 -H "Authorization: Bearer <JWT_TOKEN>" \
 -H "Content-Type: application/json" \
 -d '{"title":"Test","content":"Hello"}'

Example curl (delete note as admin)
curl -X DELETE http://localhost:5000/api/v1/notes/<NOTE_ID> \
 -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"

✅ Assignment coverage checklist

✅ JWT authentication & password hashing

✅ Role-based access control (server-side enforcement)

✅ CRUD APIs for notes

✅ API versioning (/api/v1)

✅ Frontend integration for testing APIs

✅ Modular project structure (routes, middleware, models)

📈 Scalability / next steps (short note)

Add user ownership (attach userId to notes and return only owner’s notes)

Add validation (Joi/Zod) and centralized error handler

Add caching (Redis), containerize with Docker, and add logging/monitoring for production

👤 Author

Aniket Sharma