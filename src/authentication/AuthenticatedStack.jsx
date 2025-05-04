import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SignOut from '../screens/SignOut';
import Tasks from '../screens/Tasks';
import Projects from '../screens/Projects';

const AuthenticatedStack = ({ setIsAuthenticated }) => (
  <div className="flex flex-col min-h-screen">
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>
    <div className="w-full mt-20">
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-out" element={<SignOut setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </div>
  </div>
);

export default AuthenticatedStack;
