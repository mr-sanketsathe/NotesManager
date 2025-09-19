import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function NewNoteModal({ show, onClose, onSave, initialData }) {
  const [form, setForm] = useState({ title: "", content: "", tags: "" });

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        content: initialData.content || "",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
      });
    } else {
      setForm({ title: "", content: "", tags: "" });
    }
  }, [initialData]);

  // Reset form when modal closes
  useEffect(() => {
    if (!show) setForm({ title: "", content: "", tags: "" });
  }, [show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and content are required");
      return;
    }

    const newNote = {
      title: form.title,
      content: form.content,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
    };
    onSave(newNote);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit Note" : "New Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter note title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Enter note content"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="e.g. work, urgent"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {initialData ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
