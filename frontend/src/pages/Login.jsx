import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [email, setEmail] = useState("admin@acme.test");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("tenantSlug", data.user.tenantSlug);
      localStorage.setItem("role", data.user.role);
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="container p-6">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Email</label>
              <input
                className="mt-1 block w-full rounded border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Sign in
            </button>
          </form>
          <div className="text-sm text-gray-600 mt-3">
            Pre-seeded accounts:
            <br />
            admin@acme.test / password (Admin, Acme)
            <br />
            user@acme.test / password (Member, Acme)
            <br />
            admin@globex.test / password (Admin, Globex)
            <br />
            user@globex.test / password (Member, Globex)
          </div>
        </div>
      </div>
    </div>
  );
}
