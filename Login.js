import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Login.css'; 
function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [usernameError, setUsernameError] = useState(''); // State to hold username error message

  const validateUsername = (username) => {
    // Check for no more than 10 characters
    if (username.length > 10) {
      setUsernameError('Username must not exceed 10 characters');
      return false;
    }

    // Check if the first character is uppercase
    if (username.length > 0 && !/^[A-Z]/.test(username)) {
      setUsernameError('Username must start with a capital letter');
      return false;
    }

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(username)) {
      setUsernameError('Username must not contain special characters');
      return false;
    }

    // If all checks pass
    setUsernameError(''); // Clear error message
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'username') {
      validateUsername(value); // Validate username on change
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate username before submitting
    if (!validateUsername(formData.username)) {
      return; // Prevent submission if username is invalid
    }

    // Basic validation for email and password
    if (!/^[a-z0-9._%+-]+@(gmail\.com|yahoo\.in)$/.test(formData.email)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
      return;
    }

    if (formData.password.length < 8) {
      Swal.fire('Error', 'Password must be at least 8 characters long', 'error');
      return;
    }

    // Display success alert
    Swal.fire({
      icon: 'success',
      title: 'Form Submitted Successfully',
      text: 'Your data has been stored in localStorage',
    });

    // Store data in localStorage
    localStorage.setItem('userData', JSON.stringify(formData));
  };

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {usernameError && <p className="error-message">{usernameError}</p>} {/* Display username error message */}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="login-btn" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
