import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function NoteCard({ note, deleteCard, editCard }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">{note.title}</h5>
          <div className="d-flex gap-2 text-muted">
            <PencilSquare
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => editCard(note)}
            />
            <Trash
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => deleteCard(note._id)}
            />
          </div>
        </div>
        <p className="card-text text-muted flex-grow-1">{note.content}</p>
        {note.tags && note.tags.length > 0 && (
          <div className="mb-2">
            {note.tags.map((tag, i) => (
              <span key={i} className="badge bg-light text-dark me-2">
                {tag}
              </span>
            ))}
          </div>
        )}
        <small className="text-muted">
          Last edited {new Date(note.updatedAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
}
