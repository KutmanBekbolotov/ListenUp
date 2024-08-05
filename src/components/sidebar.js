import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './sidebar.css';

const Sidebar = () => {
    const { currentUser, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Ошибка при выходе из аккаунта:', error);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? '<' : '>'}
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="menu">
                    <div className='name'>
                        <h3>Listen Up</h3>
                        <img className='logo' src="logo.gif" alt="logo" />
                    </div>
                    <h4>Menu</h4>
                    <ul>
                        <li>
                            <Link to="/search" className="menu-link">
                                <i className='bx bxs-search'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0
0 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 1 1 4-4a4 4 0 0 1-4 4z"/>
                                    </svg>
                                </i> 
                                Global search
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="menu-link">
                                <i><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm-1 16v-5H7l6-7v5h4l-6 7z" fill="currentColor"/>
                                </svg></i> Home
                            </Link>
                        </li>
                        <li>                        <Link to="/playlist" className="menu-link">
                                <i className='bx bxs-music-playlist'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M5 5h14v2H5V5zm0 6h14v2H5v-2zm0 6h14v2H5v-2zm6-9.5h5v1h-5v-1zm0 3h5v1h-5v-1zm0 3h5v1h-5v-1zm0 3h5v1h-5v-1z" />
                                    </svg>
                                </i> 
                                PlayList
                            </Link>
                        </li>
                        <li>                        <Link to="/uploadmusic" className="menu-link">
                                <i className='bx bxs-cloud-upload'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M18.944 11.112C18.507 7.67 15.56 5 12 5C9.244 5 6.85 6.611 5.757 9.15C3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888M13 14v3h-2v-3H8l4-5l4 5z" />                            
                                    </svg></i> Upload music
                            </Link>                    
                        </li>
                        {currentUser ? null : (
                            <li>
                                <Link to="/signup" className="menu-link">
                                    <i className='bx bxs-user-circle'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10s10-4.579 10-10S17.421 2 12 2m0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3m-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228" />
                                        </svg></i> Signup
                                </Link>
                            </li>
                        )}
                        {currentUser ? null : (
                            <li>
                                <Link to="/login" className="menu-link">
                                    <i className='bx bxs-log-in-circle'><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12 3c-4.625 0-8.442 3.507-8.941 8.001H10v-3l5 4l-5 4v-3H3.06C3.56 17.494 7.376 21 12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9"/>
                                    </svg></i> Login
                                </Link>
                            </li>
                        )}
                    </ul>
                    {currentUser ? (
                        <div className='container-user'>
                            <div className='user'>
                                <div className='user-name'>{currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : ''}</div>
                            </div>
                            <div className='log-out' onClick={handleLogout}>Log out</div>
                        </div>
                    ) : null}
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
