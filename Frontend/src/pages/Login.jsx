import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // install axios if not already

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, form, {
        withCredentials: true, 
      });

      if (res.data.success) {
  
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/signup">Sign up</Link>
          <br />
          Login As Admin <Link to="/adminlogin">Login</Link>
        </p>
      </div>
    </div>
  );
}
