// src/UnauthenticatedStack.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

interface UnauthenticatedStackProps {
  setIsAuthenticated: (isAuth: boolean) => void;
}

const UnauthenticatedStack: React.FC<UnauthenticatedStackProps> = ({ setIsAuthenticated }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Routes>
      <Route path="/" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/sign-up" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  </div>
);

export default UnauthenticatedStack;