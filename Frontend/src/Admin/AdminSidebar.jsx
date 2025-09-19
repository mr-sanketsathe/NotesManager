import { People, BarChart, Gear, House } from "react-bootstrap-icons";

export default function AdminSidebar({ active, setActive }) {
  return (
    <aside className="bg-white border-end p-3" style={{ width: "240px" }}>
      <h4 className="fw-bold mb-4">Admin Panel</h4>
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${active === "dashboard" ? "active fw-bold" : ""}`}
            onClick={() => setActive("dashboard")}
          >
            <House /> Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${active === "users" ? "active fw-bold" : ""}`}
            onClick={() => setActive("users")}
          >
            <People /> Manage Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${active === "activity" ? "active fw-bold" : ""}`}
            onClick={() => setActive("activity")}
          >
            <BarChart /> User Activity
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${active === "settings" ? "active fw-bold" : ""}`}
            onClick={() => setActive("settings")}
          >
            <Gear /> Settings
          </button>
        </li>
      </ul>
    </aside>
  );
}
