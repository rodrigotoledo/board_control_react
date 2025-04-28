import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SignOut from '../screens/SignOut';
import Tasks from '../screens/Tasks';
import Projects from '../screens/Projects';

const AuthenticatedStack = ({ setIsAuthenticated }) => (
  <>
    <Navbar />
    <div className="w-full mt-28">
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-out" element={<SignOut setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </div>
  </>
);

export default AuthenticatedStack;
