// src/screens/SignOut.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remover o token de autenticação do localStorage
    localStorage.removeItem('authToken');

    // Atualizar o estado de autenticação
    setIsAuthenticated(false);

    // Redirecionar para a página de login
    navigate('/');
  }, [navigate, setIsAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 w-full">
      <p>Signing out...</p>
    </div>
  );
};

export default SignOut;
