import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-sm" style={{ width: "420px" }}>
        <div className="card-body">

          <h3 className="text-center mb-2">Welcome Back </h3>
          <p className="text-center text-muted mb-4">
            Login to manage your tasks
          </p>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100 mt-2">
              Login
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
