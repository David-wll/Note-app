import React, { useState } from 'react';
import { Card, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';

const Note = ({
  id,
  text,
  date,
  tags,
  priority,
  color,
  pinned,
  archived,
  reminder,
  category,
  handleDeleteNote,
  handleEditNote,
}) => {
  const [newText, setNewText] = useState(text);
  const [newTags, setNewTags] = useState(tags.join(', '));
  const [newPriority, setNewPriority] = useState(priority);
  const [newColor, setNewColor] = useState(color);
  const [newPinned, setNewPinned] = useState(pinned);
  const [newArchived, setNewArchived] = useState(archived);
  const [newReminder, setNewReminder] = useState(reminder);
  const [newCategory, setNewCategory] = useState(category);

  const handleSaveClick = () => {
    const tagsArray = newTags.split(',').map((tag) => tag.trim());
    handleEditNote(
      id,
      newText,
      tagsArray,
      newPriority,
      newColor,
      newPinned,
      newArchived,
      newReminder,
      newCategory
    );
  };

  return (
    <div className="note" style={{ backgroundColor: color }}>
      <textarea
        rows="8"
        cols="10"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder='Add Tag....'
        value={newTags}
        onChange={(e) => setNewTags(e.target.value)}
      />
      <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="color"
        value={newColor}
        onChange={(e) => setNewColor(e.target.value)}
      />
      <input
        type="datetime-local"
        value={newReminder}
        onChange={(e) => setNewReminder(e.target.value)}
      />
      <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
      </select>
      <div className="note-footer">
        <small>{date}</small>
        <CardActions>
          <div className='save'>
          <IconButton color="primary" onClick={handleSaveClick}>
            <SaveIcon />
          </IconButton>
          </div>
         <div className='delete'>
         <IconButton color="secondary" onClick={() => handleDeleteNote(id)}>
            <DeleteForeverIcon />
          </IconButton>
         </div>
        </CardActions>
      </div>
    </div>
  );
};

export default Note;
