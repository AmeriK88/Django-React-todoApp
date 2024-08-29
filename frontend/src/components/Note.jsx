import React, { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import '../styles/Home.css';

function Note({ note, onDelete }) {
    const [loading, setLoading] = useState(false);
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete(note.id); // Llamar a la función de eliminación
        } catch (error) {
            alert("Error deleting note");
        } finally {
            setLoading(false); // Ocultar el indicador de carga después de la eliminación
        }
    };

    return (
        <div className="note-container">
            {loading ? (
                <LoadingIndicator /> // Mostrar el indicador de carga si está eliminando
            ) : (
                <>
                    <p className="note-title">{note.title}</p>
                    <p className="note-content">{note.content}</p>
                    <p className="note-date">{formattedDate}</p>
                    <button className="delete-button" onClick={handleDelete}>
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}

export default Note;
