import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with backend API call
    console.log("Admin registered:", form);

    alert("Admin registered successfully!");
    navigate("/admin/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Admin Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/admin/login">Login</a>
        </p>
      </div>
    </div>
  );
}
