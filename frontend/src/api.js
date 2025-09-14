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
    const res = await axios.get(`${API_BASE}/api/notes`, { headers: authHeaders() })
    console.log(res)
    return res.data
}

export async function createNote(title, content) {
    const res = await axios.post(`${API_BASE}/api/notes`, { title, content }, { headers: authHeaders() })
    return res.data
}

export async function deleteNote(id) {
    const res = await axios.delete(`${API_BASE}/api/notes/${id}`, { headers: authHeaders() })
    console.log(res.data)
    return res.data
}

export async function upgradeTenant(slug) {
    const res = await axios.post(`${API_BASE}/api/tenants/${slug}/upgrade`, {}, { headers: authHeaders() })
    return res.data
}

export async function fetchNotes(slug) {
    const res = await fetch(`${API_URL}/${slug}/notes`);
    return res.json();
}

export async function addNote(slug, note) {
    const res = await fetch(`${API_URL}/${slug}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return res.json();
}


