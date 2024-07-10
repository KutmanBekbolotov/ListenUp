import React from 'react';
import './UploadMusic.css';
import Sidebar from '../sidebar'; // Импортируем компонент Sidebar

const UploadMusic = () => {
    return (
        <div className="upload-container">
            <Sidebar /> 
            <div className="upload-header">
                <h2>Upload Your Music</h2>
            </div>
            <div className="upload-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="songTitle">Song Title:</label>
                        <input type="text" id="songTitle" name="songTitle" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="artist">Artist:</label>
                        <input type="text" id="artist" name="artist" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="album">Album:</label>
                        <input type="text" id="album" name="album" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre:</label>
                        <select id="genre" name="genre">
                            <option value="pop">Pop</option>
                            <option value="rock">Rock</option>
                            <option value="hiphop">Hip Hop</option>
                            <option value="electronic">Electronic</option>
                            <option value="jazz">Jazz</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Choose File:</label>
                        <input type="file" id="file" name="file" accept=".mp3, .mp4, .wav, .aac, .ogg, .flac" required />
                    </div>
                    <div className="form-group">
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadMusic;
