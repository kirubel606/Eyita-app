import React, { useState } from 'react';
import { useAuth } from '../context/Authcontext'; // Adjust the import as necessary
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../context/axiosInstance';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState(''); // Change username to email for clarity
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on new submit

    if (username && password) {
      try {
        const response = await api.post('/users/login', { username, password });
        // Assuming the response contains user data
        if (response.data.token) {
        // Handle successful login
        localStorage.setItem('token', response.data.token); // Save token in localStorage
        login(); // Call your login context method
        navigate('/admin'); // Redirect to the admin page after login
        setMessage('Login successful');
        }
        
      } catch (err) {
        // Handle errors (e.g., invalid credentials)
        if (err.response && err.response.status === 400) {
          setError('Invalid credentials.'); // Set error message for invalid credentials
        } else {
          setError('An error occurred. Please try again.'); // General error message
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-[10%]">
        <h1 className='text-5xl text-center mb-7'>እይታ</h1>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
          <input 
            type="text" 
            id="username" // Added id for accessibility
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Username" // Changed to Email for clarity
            required 
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Display error message */}
        <button type="submit" className="text-white bg-[#FDA758] hover:bg-[#8f5d2f] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
