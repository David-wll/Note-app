import React from 'react';
import Note from './Note';

const NotesList = ({ notes, handleDeleteNote, handleEditNote }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          tags={note.tags}
          priority={note.priority}
          color={note.color}
          pinned={note.pinned}
          archived={note.archived}
          reminder={note.reminder}
          category={note.category}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
