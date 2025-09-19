import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UserTable from "./UserTable";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  // Fake data (later connect to backend)
  const stats = {
    totalUsers: 150,
    newUsers: 5,
    activeUsers: 120,
    deletedUsers: 10,
  };

  const users = [
    {
      name: "John Doe",
      email: "john@email.com",
      role: "User",
      registered: "15 Sep 2025",
      lastLogin: "17 Sep 2025",
      status: "Active",
    },
    {
      name: "Admin User",
      email: "admin@email.com",
      role: "Admin",
      registered: "10 Sep 2025",
      lastLogin: "17 Sep 2025",
      status: "Manage",
    },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      <AdminSidebar active={active} setActive={setActive} />
      <div className="flex-grow-1 p-4">
        <h3 className="mb-4">{active === "dashboard" ? "Dashboard" : active}</h3>

        {active === "dashboard" && (
          <>
            <div className="row g-3">
              <div className="col-md-3">
                <div className="card shadow-sm text-center">
                  <div className="card-body">
                    <h4>{stats.totalUsers}</h4>
                    <p className="text-muted">Total Registered Users</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm text-center">
                  <div className="card-body">
                    <h4>{stats.newUsers}</h4>
                    <p className="text-muted">New Registrations Today</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm text-center">
                  <div className="card-body">
                    <h4>{stats.activeUsers}</h4>
                    <p className="text-muted">Active Users</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm text-center">
                  <div className="card-body">
                    <h4>{stats.deletedUsers}</h4>
                    <p className="text-muted">Deleted Accounts</p>
                  </div>
                </div>
              </div>
            </div>

            <UserTable users={users} />
          </>
        )}

        {active === "users" && <UserTable users={users} />}
        {active === "activity" && <p>User activity logs will appear here.</p>}
        {active === "settings" && <p>Admin settings page.</p>}
      </div>
    </div>
  );
}
