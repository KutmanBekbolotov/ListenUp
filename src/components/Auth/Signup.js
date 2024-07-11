import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Signup.css';

const Signup = ({ firebaseApp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const auth = firebaseApp.auth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user.uid);
      navigate('/'); // Redirect to homepage after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-card-container">
      <div className="signup-card">
        <div className="signup-card-logo">
          <img className='logoSignup' src="bulgass.png" alt="logo" />
        </div>
        <div className="signup-card-header">
          <h1>Create Account</h1>
          <div>Please create an account to use the platform</div>
        </div>
        <form className="signup-card-form" onSubmit={handleSignup}>
          <div className="form-item">
            <span className="form-item-icon material-symbols-rounded"></span>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="form-item">
            <span className="form-item-icon material-symbols-rounded"></span>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Create Account</button>
        </form>
        <div className="signup-card-footer">
          Already have an account? <a href="/login">Sign In.</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

