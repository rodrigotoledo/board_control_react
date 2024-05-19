// src/components/Header.jsx
import React from 'react';

const Header = () => {
  const APPLICATION_NAME = process.env.REACT_APP_APPLICATION_NAME || "Board Control";

  return (
    <header className="bg-gray-800 text-white p-4 m-4 rounded-md">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center">{APPLICATION_NAME}</h1>
      </div>
    </header>
  );
};

export default Header;
