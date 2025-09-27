import { useState, useEffect } from 'react';
import { Note } from '../types';

const NOTES_KEY = 'notes_app_notes';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    // Load notes from localStorage on mount
    const savedNotes = localStorage.getItem(NOTES_KEY);
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        setNotes(parsedNotes);
      } catch (error) {
        console.error('Failed to parse saved notes:', error);
      }
    }
  }, []);

  const saveNotesToStorage = (notesToSave: Note[]) => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notesToSave));
  };

  const createNote = (title: string = 'Untitled', body: string = ''): Note => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    setSelectedNote(newNote);
    
    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Pick<Note, 'title' | 'body'>>): void => {
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    );
    
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote({ ...selectedNote, ...updates, updatedAt: new Date() });
    }
  };

  const deleteNote = (id: string): void => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(updatedNotes.length > 0 ? updatedNotes[0] : null);
    }
  };

  const selectNote = (note: Note): void => {
    setSelectedNote(note);
  };

  return {
    notes,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote
  };
};