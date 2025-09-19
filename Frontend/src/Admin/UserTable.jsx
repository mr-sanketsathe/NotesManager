export default function UserTable({ users }) {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Manage Users</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registration Date</th>
                <th>Last Login</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.registered}</td>
                  <td>{u.lastLogin}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.status === "Active"
                          ? "bg-success"
                          : u.status === "Deleted"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
