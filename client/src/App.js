import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LandingPage/Login';
import Register from './components/RegisterPage/Register';
import AddNote from './components/AddNotePage/AddNote';
import UpdateNote from './components/UpdateNotePage/UpdateNote';
import Home from './components/HomePage/Home';
import { useState } from 'react';

function App() {
  const [noteId, setNoteId] = useState("");
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/update" element={<UpdateNote noteId={noteId} />} />
        <Route path="/home" element={<Home setNoteId={setNoteId} />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
