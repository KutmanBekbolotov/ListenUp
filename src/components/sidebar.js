import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './sidebar.css';

const Sidebar = () => {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            // Дополнительные действия после выхода из аккаунта, например, перенаправление на страницу входа
        } catch (error) {
            console.error('Ошибка при выходе из аккаунта:', error);
            // Дополнительная обработка ошибки
        }
    };

    return (
        <aside className="sidebar">
            <div className="menu">
                <div className='name'>
                    <h3>Listen Up</h3>
                    <img className='logo' src="logo.gif" alt="logo" />
                </div>
                <h5>Menu</h5>
                <ul>
                    <li>
                        <Link to="/" className="menu-link">
                            <i><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm-1 16v-5H7l6-7v5h4l-6 7z" fill="currentColor"/>
                            </svg></i> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/Login" className="menu-link">
                            <i className='bx bxs-log-in-circle'><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 3c-4.625 0-8.442 3.507-8.941 8.001H10v-3l5 4l-5 4v-3H3.06C3.56 17.494 7.376 21 12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9"/>
                            </svg></i> Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/Signup" className="menu-link">
                            <i className='bx bxs-user-circle'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            	<path fill="currentColor" d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10s10-4.579 10-10S17.421 2 12 2m0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3m-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228" />
                            </svg></i> Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/UploadMusic" className="menu-link">
                            <i className='bx bxs-cloud-upload'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            	<path fill="currentColor" d="M18.944 11.112C18.507 7.67 15.56 5 12 5C9.244 5 6.85 6.611 5.757 9.15C3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888M13 14v3h-2v-3H8l4-5l4 5z" />
                            </svg></i> UploadMusic
                        </Link>
                    </li>
                    <li>
                        <Link to="/PlayList" className="menu-link">
                            <i className='bx bxs-music-playlist'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5 5h14v2H5V5zm0 6h14v2H5v-2zm0 6h14v2H5v-2zm6-9.5h5v1h-5v-1zm0 3h5v1h-5v-1zm0 3h5v1h-5v-1zm0 3h5v1h-5v-1z" />
                                </svg>
                            </i> 
                            PlayList
                        </Link>
                    </li>
                </ul>

                {currentUser ? (
                    <div className='container-user'>
                        <div className='user'>
                            <div className='user-name'>{currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : ''}</div>
                        </div>
                        <div className='log-out' onClick={handleLogout}>Log</div>
                    </div>
                ) : null}
                
            </div>
        </aside>
    );
}

export default Sidebar;
