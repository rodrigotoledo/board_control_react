import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignOutProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const SignOut: React.FC<SignOutProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  }, [navigate, setIsAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 w-full">
      <p>Signing out...</p>
    </div>
  );
};

export default SignOut;
