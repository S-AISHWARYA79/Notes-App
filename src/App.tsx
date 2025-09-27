import { useAuth } from './hooks/useAuth';
import { useNotes } from './hooks/useNotes';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const {
    notes,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote
  } = useNotes();

  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <Dashboard
      user={user}
      notes={notes}
      selectedNote={selectedNote}
      onCreateNote={createNote}
      onSelectNote={selectNote}
      onUpdateNote={updateNote}
      onDeleteNote={deleteNote}
      onLogout={logout}
    />
  );
}

export default App;