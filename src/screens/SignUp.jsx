import React, { useState } from 'react';
import axios from '../axiosConfig';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sign_up', { user: {email, password, password_confirmation: passwordConfirmation} });
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['An error occurred. Please try again.'+error.message]);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 w-full">
      <Header />
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Sign Up</h2>
        {errors.length > 0 && (
          <ul className="mb-4">
            {errors.map((error, index) => (
              <li key={index} className="text-white bg-red-400 p-2 rounded-md">{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
              Password Confirmation
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <Link to="/" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
