import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="menu">
                <div className='name'>
                    <h3>Listen Up</h3>
                    <img src="./logo.png" alt="logo" />
                </div>
                <h5>Menu</h5>
                <ul>
                    <li>
                        <Link to="/" className="menu-link">
                            <i className='bx bxs-bolt-circle'></i> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/Login" className="menu-link">
                            <i className='bx bxs-log-in-circle'></i> Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/Signup" className="menu-link">
                            <i className='bx bxs-user-circle'></i> Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/UploadMusic" className="menu-link">
                            <i className='bx bxs-cloud-upload'></i> UploadMusic
                        </Link>
                    </li>
                    <li>
                        <Link to="/MusicPlayer" className="menu-link">
                            <i className='bx bxs-music'></i> MusicPlayer
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
