import { Star, Tag, Trash, FileText, Plus } from "react-bootstrap-icons";

export default function Sidebar({ onNewNote }) {
  return (
    <aside className="bg-white border-end p-3" style={{ width: "240px" }}>
      <h4 className="fw-bold mb-4">QuickNotes</h4>
      <button
        className="btn btn-primary w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
        onClick={onNewNote}
      >
        <Plus /> New Note
      </button>
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <a href="#" className="nav-link text-dark d-flex align-items-center gap-2">
            <FileText /> All Notes
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-dark d-flex align-items-center gap-2">
            <Star /> Favorites
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-dark d-flex align-items-center gap-2">
            <Tag /> Tags
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-dark d-flex align-items-center gap-2">
            <Trash /> Trash
          </a>
        </li>
      </ul>
    </aside>
  );
}
