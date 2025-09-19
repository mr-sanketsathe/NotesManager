import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import AdminSignup from "./Admin/AdminSignup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/adminsignup" element={<AdminSignup />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
