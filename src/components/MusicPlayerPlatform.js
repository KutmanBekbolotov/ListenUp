import React from 'react';
import './AppModule.css';
import Sidebar from './sidebar'; // Импортируем компонент Sidebar

const MusicPlayerPlatform = () => {
    return (
        <div className="homepage">
            <Sidebar /> {/* Добавляем Sidebar компонент здесь */}
            
            <header>
                <h2>Welcome to Listen Up music platform from <br></br> Bulgass Soft Works</h2>
            </header>

            <section className="content">
                <h2>Here you can listen and add any music you want</h2>
                <p>Explore genres, discover new artists, and find your favorite songs.</p>
            </section>

            <footer>
                <p>&copy; 2024 Listen Up. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default MusicPlayerPlatform;
