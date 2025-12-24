// src/App.js
import React, { useState, useEffect } from "react";
import { fetchNotes, addNote, upgradeTenant } from "./api";

function App() {
  const slug = "my-tenant"; // Normally this comes from login/session
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const data = await fetchNotes(slug);
    setNotes(data);
  }

  async function handleAddNote() {
    const newNote = { title: "New Note", content: "Hello!" };
    const res = await addNote(slug, newNote);
    if (res.error) {
      setError(res.error);
    } else {
      setError("");
      loadNotes();
    }
  }

  return (
    <div className="App">
      <h1>Notes App ({slug})</h1>

      <button onClick={handleAddNote}>Add Note</button>

      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            <b>{n.title}</b>: {n.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
