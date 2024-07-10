import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; 

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для отправки данных на сервер или другую обработку

        // Переход на другую страницу после успешной регистрации
        navigate('/'); // Например, после регистрации перейти на главную страницу
    };

    return (
        <div className="login-card-container">
            <div className="login-card">
                <div className="login-card-logo">
                    <img src="./logo.png" alt="logo" />
                </div>
                <div className="login-card-header">
                    <h1>Sign Up</h1>
                    <div>Please create an account</div>
                </div>
                <form className="login-card-form" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <span className="form-item-icon material-symbols-rounded">person</span>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            id="usernameForm"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-item">
                        <span className="form-item-icon material-symbols-rounded">lock</span>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            id="passwordForm"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-item-other">
                        <div className="checkbox">
                            <input type="checkbox" id="rememberMeCheckbox" defaultChecked />
                            <label htmlFor="rememberMeCheckbox">Remember me</label>
                        </div>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="login-card-footer">
                    Already have an account? <Link to="/login">Login here.</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
