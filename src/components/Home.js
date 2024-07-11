import React from 'react';
import MusicPlayerPlatform from './MusicPlayerPlatform';
import MusicPlayer from './Music/MusicPlayerComponent';

const Home = () => {
    return (
        <div className="home">
            <MusicPlayerPlatform /> 
            <MusicPlayer/>
        </div>
    );
}

export default Home;
