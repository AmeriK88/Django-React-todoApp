import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css';

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        setLoading(true); 
        try {
            const response = await api.get("/api/notes/");
            setNotes(response.data);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false); 
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await api.delete(`/api/notes/delete/${id}/`);
            if (response.status === 204) {
                alert("Note deleted!");
                getNotes();
            } else {
                alert("Failed to delete note.");
            }
        } catch (error) {
            alert(error);
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/notes/", { content, title });
            if (response.status === 201) {
                alert("Note created!");
                getNotes(); 
            } else {
                alert("Failed to create note.");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <h2>Notes</h2>
            <div className="notes-section">
                {loading ? (
                    <LoadingIndicator /> 
                ) : (
                    notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))
                )}
            </div>

            <h2>Create Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content</label>
                <textarea
                    name="content"
                    id="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;
