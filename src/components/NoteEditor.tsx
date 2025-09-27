import { useState, useEffect } from 'react';
import { Note } from '../types';
import { Save, FileText } from 'lucide-react';

interface NoteEditorProps {
  selectedNote: Note | null;
  onUpdateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'body'>>) => void;
}

export const NoteEditor = ({ selectedNote, onUpdateNote }: NoteEditorProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setBody(selectedNote.body);
      setLastSaved(selectedNote.updatedAt);
    } else {
      setTitle('');
      setBody('');
      setLastSaved(null);
    }
  }, [selectedNote]);

  const saveNote = async () => {
    if (!selectedNote) return;
    
    setIsSaving(true);
    
    // Simulate save delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    onUpdateNote(selectedNote.id, { title, body });
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  // Auto-save functionality
  useEffect(() => {
    if (!selectedNote) return;
    
    const timeoutId = setTimeout(() => {
      if (title !== selectedNote.title || body !== selectedNote.body) {
        saveNote();
      }
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [title, body, selectedNote]);

  if (!selectedNote) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-50 rounded-lg">
        <FileText className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">Select a note to edit</p>
        <p className="text-sm">Choose a note from the list or create a new one</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">Note Editor</span>
        </div>
        <div className="flex items-center space-x-4">
          {lastSaved && (
            <span className="text-xs text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={saveNote}
            disabled={isSaving}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Note title..."
          className="text-xl font-semibold text-gray-900 bg-transparent border-none outline-none placeholder-gray-400"
        />
        
        <textarea
          value={body}
          onChange={(e) => handleBodyChange(e.target.value)}
          placeholder="Start writing your note..."
          className="flex-1 resize-none bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 leading-relaxed"
        />
      </div>
    </div>
  );
};