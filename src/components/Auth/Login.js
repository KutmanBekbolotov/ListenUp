import React from 'react';
import './Login.css';  

const Login = () => {
  return (
    <div className="login-card-container">
      <div className="login-card">
        <div className="login-card-logo">
          <img src="./logo.png" alt="logo" />
        </div>
        <div className="login-card-header">
          <h1>Sign In</h1>
          <div>Please login to use the platform</div>
        </div>
        <form className="login-card-form">
          <div className="form-item">
            <span className="form-item-icon material-symbols-rounded">mail</span>
            <input type="text" placeholder="Enter Email" id="emailForm" autoFocus required />
          </div>
          <div className="form-item">
            <span className="form-item-icon material-symbols-rounded">lock</span>
            <input type="password" placeholder="Enter Password" id="passwordForm" required />
          </div>
          <div className="form-item-other">
            <div className="checkbox">
              <input type="checkbox" id="rememberMeCheckbox" defaultChecked />
              <label htmlFor="rememberMeCheckbox">Remember me</label>
            </div>
            <a href="#">I forgot my password!</a>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="login-card-footer">
          Don't have an account? <a href="#">Create a free account.</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
