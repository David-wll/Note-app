import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';
import AddNote from './components/AddNote';
import useLocalStorage from './useLocalStorage';
import './app.css'

const App = () => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTag, setSearchTag] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOption, setSortOption] = useState('date');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const addNote = (text, tags = [], priority = 'Medium', color = '#fff', pinned = false, archived = false, reminder = null, category = 'General') => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString(),
      tags,
      priority,
      color,
      pinned,
      archived,
      reminder,
      category,
    };
    setNotes([...notes, newNote]);
  };

  const editNote = (id, newText, newTags = [], newPriority = 'Medium', newColor = '#fff', newPinned = false, newArchived = false, newReminder = null, newCategory = 'General') => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            text: newText,
            tags: newTags,
            priority: newPriority,
            color: newColor,
            pinned: newPinned,
            archived: newArchived,
            reminder: newReminder,
            category: newCategory,
          }
        : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      notes.forEach((note) => {
        if (note.reminder && new Date(note.reminder) <= now) {
          alert(`Reminder for note: "${note.text}"`);
          editNote(note.id, note.text, note.tags, note.priority, note.color, note.pinned, note.archived, null, note.category);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);

    return () => clearInterval(interval);
  }, [notes]);

  const filteredNotes = searchTag
    ? notes.filter((note) =>
        note.tags.some((tag) => tag.toLowerCase().includes(searchTag.toLowerCase()))
      )
    : notes.filter((note) =>
        note.text.toLowerCase().includes(searchText.toLowerCase())
      );

  const filteredByCategory = filterCategory === 'All' ? filteredNotes : filteredNotes.filter((note) => note.category === filterCategory);

  const sortedNotes = [...filteredByCategory].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'priority') {
      const priorities = { Low: 1, Medium: 2, High: 3 };
      return priorities[b.priority] - priorities[a.priority];
    }
    return 0;
  });

  return (
    <div className={`${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} handleSearchTag={setSearchTag} />
        <AddNote handleAddNote={addNote} />
        <div className="filters">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </select>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
        <NotesList
          notes={sortedNotes}
          handleDeleteNote={deleteNote}
          handleEditNote={editNote}
        />
      </div>
    </div>
  );
};

export default App;
