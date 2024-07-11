import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './UploadMusic.css';
import Sidebar from '../sidebar';

const UploadMusic = ({ firebaseApp, currentUser }) => {
    const navigate = useNavigate();
    const [songTitle, setSongTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file.');
            return;
        }

        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, 'music/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload progress: ' + progress + '%');
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Error uploading file:', error);
                alert('Error uploading file:', error.message);
            },
            () => {
                // Upload completed successfully, now get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('File available at', url);
                    alert('File uploaded successfully!');
                    navigate('/musicplayer'); // Navigate to music player page after successful upload
                });
            }
        );
    };

    return (
        <div className="upload-container">
            <Sidebar />
            <div className="upload-header">
                <h2>Upload Your Music</h2>
            </div>
            <div className="upload-form">
                <form onSubmit={handleUpload}>
                    <div className="form-group">
                        <label htmlFor="username">Your Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="songTitle">Song Title:</label>
                        <input
                            type="text"
                            id="songTitle"
                            name="songTitle"
                            value={songTitle}
                            onChange={(e) => setSongTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="artist">Artist:</label>
                        <input
                            type="text"
                            id="artist"
                            name="artist"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Choose File:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".mp3, .mp4, .wav, .aac, .ogg, .flac"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Upload</button>
                    </div>
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
                </form>
            </div>
        </div>
    );
};

export default UploadMusic;
