import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NewNoteModal from "../components/NewNoteModal";
import { getNotes, createNote, deleteNote, updateNote } from "../api";
import axios from "axios";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null); 
  const navigate = useNavigate(); // ✅ for redirect

  // Load notes from backend
  useEffect(() => {
    async function fetchNotes() {
      try {
        const { data } = await getNotes();
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err.message);
      }
    }
    fetchNotes();
  }, []);

  // Add new note
  const handleAddNote = async (newNote) => {
    try {
      const { data } = await createNote(newNote);
      setNotes([data, ...notes]);
      setShowModal(false);
    } catch (err) {
      console.error("Error adding note:", err.message);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err.message);
    }
  };

  // Edit note
  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  // Save edited note
  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const { data } = await updateNote(id, updatedNote);
      setNotes(notes.map((note) => (note._id === id ? data : note)));
      setEditingNote(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error updating note:", err.message);
    }
  };

  const handleLogout = async () => {
    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("logout success");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar onNewNote={() => setShowModal(true)}  />
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar handleLogout={handleLogout}/>
        <main className="container py-4">
          <div className="row g-3">
            {notes.map((note) => (
              <div className="col-md-6 col-lg-4" key={note._id}>
                <NoteCard
                  note={note}
                  deleteCard={handleDeleteNote}
                  editCard={handleEditNote}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
      <NewNoteModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingNote(null);
        }}
        onSave={
          editingNote
            ? (data) => handleUpdateNote(editingNote._id, data)
            : handleAddNote
        }
        initialData={editingNote}
      />
    </div>
  );
}
