import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UploadMusic from './components/Music/UploadMusic';
import Playlist from './components/Music/PlayList';
import MediaPlayer from './components/MediaPlayer';
import GlobalSearch from './components/Music/GlobalSearch';
import GenreSongs from './components/Music/GenreSongs';
import UpdateMetadata from './components/admin/UpdateMetadata'; 
import { AuthProvider, useAuth } from './context/AuthContext';
import { MediaPlayerProvider } from './context/MediaPlayerContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/global-search" />;
};

function App() {
  return (
    <AuthProvider>
      <MediaPlayerProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/uploadmusic" element={<PrivateRoute><UploadMusic /></PrivateRoute>} />
              <Route path="/playlist" element={<PrivateRoute><Playlist /></PrivateRoute>} />
              <Route path="/global-search" element={<GlobalSearch />} />
              <Route path="/genre/:genreName" element={<PrivateRoute><GenreSongs /></PrivateRoute>} />
              <Route path="/update-metadata" element={<PrivateRoute><UpdateMetadata /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/global-search" />} />
            </Routes>
            <MediaPlayer />
          </div>
        </Router>
      </MediaPlayerProvider>
    </AuthProvider>
  );
}

export default App;
