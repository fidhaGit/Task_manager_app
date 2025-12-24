import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("auth/register/", form);
      navigate("/"); 
    } catch {
  setError("Registration failed. Email may already exist.");
}

    setLoading(false);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-sm" style={{ width: "420px" }}>
        <div className="card-body">

          <h3 className="text-center mb-2">Create Account</h3>
          <p className="text-center text-muted mb-4">
            Start managing your tasks
          </p>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <form onSubmit={submit}>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <button
              className="btn btn-primary w-100 mt-2"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/" className="text-primary fw-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
