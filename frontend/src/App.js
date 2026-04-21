import { useEffect, useState } from "react";
import axios from "axios";

// ✅ USE YOUR BACKEND URL HERE
const API = "https://notes-app-backend-kr0l.onrender.com/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(API);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Add Note
  const addNote = async () => {
    if (!title || !description) return;

    try {
      await axios.post(API, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchNotes();
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // ✅ Delete Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>📝 Notes App</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={addNote}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Note
      </button>

      <hr />

      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button
              onClick={() => deleteNote(note._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;