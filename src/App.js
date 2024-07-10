import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UploadMusic from './components/Music/UploadMusic';
import MusicPlayer from './components/Music/MusicPlayer';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/UploadMusic" element={<UploadMusic />} />
          <Route path="/MusicPlayer" element={<MusicPlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
