import React, { useState } from 'react';
import axios from '../axiosConfig';
import Header from '../components/Header';
import { Button, TextField } from '@mui/material';

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sign_in', { email, password });
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 w-full">
      <Header />
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <TextField
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="outlined-basic" label="Email" variant="outlined" required={true} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="outlined-basic" label="Password" variant="outlined" required={true} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center space-x-2">
            <Button variant="contained" type='submit' className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign In</Button>
            <Button href='/sign-up' variant="contained" type='submit' className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;