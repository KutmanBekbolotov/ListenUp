import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UploadMusic from './components/Music/UploadMusic';
import Playlist from './components/Music/PlayList';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/UploadMusic" element={<UploadMusic />} />
            <Route path="/PlayList" element={<Playlist />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
