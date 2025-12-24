import React, { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "../api";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const role = localStorage.getItem("role");

  function startEdit(note) {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  }

  async function handleUpdate(id) {
    try {
      await updateNote(id, editTitle, editContent);
      cancelEdit();
      await loadNotes();
    } catch (err) {
      setError(err.error || "Failed to update note");
    }
  }

  async function loadNotes() {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.log(err);
        setError(err.response?.data?.error || "Failed to load notes");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError(null);
    try {
      await createNote(title, content);
      setTitle("");
      setContent("");
      await loadNotes();
    } catch (err) {
      if (err.response?.data?.error === "Free plan limit reached") {
        setError("Free plan limit reached. Upgrade to Pro to add more notes.");
      } else {
        setError(err.response?.data?.error || "Failed to create");
      }
    }
  }

  async function handleDelete(id) {
    if (role !== "admin") {
      window.alert("Only Admins can delete notes.");
      return;
    }
    if (!window.confirm("Delete note?")) return;

    try {
      await deleteNote(id, role);
      await loadNotes();
    } catch (err) {
      setError("Failed to delete");
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Notes</h1>
          <div>
            <span className="mr-4 text-sm text-gray-600">Role: {role}</span>
            <button onClick={handleLogout} className="px-3 py-1 border rounded">
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-medium mb-2">Your notes</h2>
              {loading ? <div>Loading...</div> : null}
              {error && <div className="text-red-600 mb-2">{error}</div>}
              <div className="space-y-3">
                {notes.length === 0 && (
                  <div className="text-gray-500">No notes yet.</div>
                )}
                {notes.map((n) => (
                  <div
                    key={n._id}
                    className="p-3 border rounded flex justify-between items-start"
                  >
                    <div className="flex-1">
                      {editingId === n._id ? (
                        <>
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="block w-full mb-2 border rounded p-1"
                          />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="block w-full border rounded p-1"
                          />
                        </>
                      ) : (
                        <>
                          <div className="font-semibold">{n.title}</div>
                          <div className="text-sm text-gray-700">
                            {n.content}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Created: {new Date(n.createdAt).toLocaleString()}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="ml-3 space-y-1">
                      {editingId === n._id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(n._id)}
                            className="block text-sm text-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="block text-sm text-gray-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(n)}
                            className="block text-sm text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(n._id)}
                            className="block text-sm text-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-medium mb-2">Create note</h3>
              <form onSubmit={handleCreate} className="space-y-2">
                <input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded border p-2"
                />
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full rounded border p-2"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
