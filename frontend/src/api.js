// src/api.js
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || ''

function getToken() {
    return localStorage.getItem('token')
}

function authHeaders() {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function login(email, password) {
    const res = await axios.post(`${API_BASE}/api/login`, { email, password })
    console.log(res)
    return res.data
}

export async function getNotes() {
    const res = await axios.get(`${API_BASE}/api/v1/notes`, { headers: authHeaders() })
    console.log(res)
    return res.data
}

export async function createNote(title, content) {
    const res = await axios.post(`${API_BASE}/api/v1/notes`, { title, content }, { headers: authHeaders() })
    return res.data
}

export async function deleteNote(id) {
    const res = await axios.delete(
        `${API_BASE}/api/v1/notes/${id}`,
        {
            headers: authHeaders()
        }
    );
    return res.data;
}


export async function updateNote(id, title, content) {
    const res = await fetch(`/api/v1/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw err;
    }

    return res.json();
}



