import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      handleAddNote(noteText);
      setNoteText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <TextField
        label="New Note"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Note
      </Button>
    </form>
  );
};

export default AddNote;
