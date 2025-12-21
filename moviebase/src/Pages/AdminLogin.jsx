import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/Styles/AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents page reload
    navigate('/adminhome');
  };

  return (
    <div className='login-page-container'>
      <div className='login-card'>
        <div className='login-header'>
          <h1>Admin Access</h1>
          <p>Please enter your credentials to manage MovieMinded</p>
        </div>
        
        <form className='login-form' onSubmit={handleLogin}>
          <div className='input-group'>
            <label>Username</label>
            <input type="text" placeholder="Enter username" required />
          </div>

          <div className='input-group'>
            <label>Password</label>
            <input type="password" placeholder="Enter password" required />
          </div>

          <button type="submit" className='login-btn'>
            Login to Dashboard
          </button>
        </form>
        
        <div className='login-footer'>
          <p>© 2025 MovieMinded Admin Portal</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;