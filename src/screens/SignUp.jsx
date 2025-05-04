import React, { useState } from 'react';
import axios from '../axiosConfig';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const SignUp = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sign_up', { 
        user: { 
          email, 
          password, 
          password_confirmation: passwordConfirmation 
        } 
      });
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([`An error occurred. Please try again. ${error.message}`]);
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
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <TextField
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="outlined-basic" label="Email" variant="outlined" required={true} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="outlined-basic" label="Password" variant="outlined" required={true} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="outlined-basic" label="Password" variant="outlined" required={true} type='password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
          <div className="flex items-center space-x-2">
            <Button
              type='submit'
              variant="contained"
              color="success"
              startIcon={<PersonAddIcon />}
              sx={{
                background: '#065f46',
                textTransform: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: '#064e3b'
                }
              }}
            >
              Sign Up
            </Button>
            <Button
              href='/'
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: 500,
                background: '#4b5563',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: '#111827'
                }
              }}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;