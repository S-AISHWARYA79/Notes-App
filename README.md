Notes App (React + TypeScript + Tailwind)

A lightweight notes application built with React, TypeScript, and TailwindCSS.
This app demonstrates hardcoded authentication, CRUD operations, and localStorage persistence without the need for a backend.

🚀 Features

User Authentication

Hardcoded credentials (username: test, password: 1234).

Session stored in localStorage to keep users logged in after page refresh.

Notes Management (CRUD)

Create: Add new notes with a title and body.

Read: View a list of all notes.

Update: Edit existing notes inline.

Delete: Remove notes permanently.

Local Persistence

Notes and login session are stored in localStorage.

Data survives page reloads, but clears if localStorage is manually reset.

UI/UX

Clean and responsive interface styled with TailwindCSS.

Simple navigation between login and notes dashboard.

🛠️ Tech Stack

React (frontend framework)

TypeScript (type safety)

TailwindCSS (styling)

LocalStorage API (data persistence)

📦 Installation & Setup

Clone the repository

git clone https://github.com/your-repo/notes-app.git
cd notes-app


Install dependencies

npm install


Run the development server

npm run dev


Open in browser:

http://localhost:5173

🔑 Login Credentials

Use the following credentials to access the app:

Username: test

Password: 1234

📖 Usage

Login with the hardcoded credentials.

Create Notes by entering a title and body.

View Notes in the dashboard.

Edit or Delete Notes using the provided buttons.

Notes are automatically stored in localStorage and will persist across sessions.

⚠️ Limitations

Authentication is mock-only (hardcoded).

Data is not synced across devices or browsers.

No backend integration (demo/local use only).

📌 Future Enhancements

Add support for multiple users.

Implement search and filtering for notes.

Option to categorize or tag notes.

Dark mode toggle.
