import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UploadMusic from './components/Music/UploadMusic';
import Playlist from './components/Music/PlayList';
import MediaPlayer from './components/MediaPlayer';
import { AuthProvider } from './context/AuthContext';
import { MediaPlayerProvider } from './context/MediaPlayerContext';

function App() {
  return (
    <AuthProvider>
      <MediaPlayerProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/UploadMusic" element={<UploadMusic />} />
              <Route path="/PlayList" element={<Playlist />} />
            </Routes>
            <MediaPlayer />
          </div>
        </Router>
      </MediaPlayerProvider>
    </AuthProvider>
  );
}

export default App;
