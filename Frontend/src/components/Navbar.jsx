import { Search, PersonCircle } from "react-bootstrap-icons";

export default function Navbar({ handleLogout }) {
  const currUser = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-2 bg-white shadow-sm border-bottom">
      <div className="input-group" style={{ maxWidth: "400px", flex: 1, margin: "0 20px" }}>
        <span className="input-group-text bg-light border-0 rounded-start-pill">
          <Search />
        </span>
        <input
          type="text"
          className="form-control border-0 bg-light rounded-end-pill"
          placeholder="Search notes..."
        />
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center">
          <button className="btn btn-light rounded-circle shadow-sm">
            <PersonCircle size={28} />
          </button>
          {currUser && (
            <span className="ms-2 fw-semibold">{currUser.username}</span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-success px-3 rounded-pill shadow-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
