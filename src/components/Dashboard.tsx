import { Plus, LogOut, User, Search } from 'lucide-react';
import { Note } from '../types';
import { NotesList } from './NotesList';
import { NoteEditor } from './NoteEditor';
import { useState } from 'react';

interface DashboardProps {
  user: { username: string };
  notes: Note[];
  selectedNote: Note | null;
  onCreateNote: () => void;
  onSelectNote: (note: Note) => void;
  onUpdateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'body'>>) => void;
  onDeleteNote: (id: string) => void;
  onLogout: () => void;
}

export const Dashboard = ({
  user,
  notes,
  selectedNote,
  onCreateNote,
  onSelectNote,
  onUpdateNote,
  onDeleteNote,
  onLogout
}: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => onCreateNote()}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Note</span>
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-4">
            <NotesList
              notes={filteredNotes}
              selectedNote={selectedNote}
              onSelectNote={onSelectNote}
              onDeleteNote={onDeleteNote}
            />
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-6">
          <NoteEditor
            selectedNote={selectedNote}
            onUpdateNote={onUpdateNote}
          />
        </div>
      </div>
    </div>
  );
};