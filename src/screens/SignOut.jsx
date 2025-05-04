import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  CircularProgress,
  Typography,
  useTheme
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const SignOut = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const signOut = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Delay para feedback visual
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      navigate('/');
    };
    signOut();
  }, [navigate, setIsAuthenticated]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        gap: 3,
        padding: 4,
      }}
    >
      <LogoutIcon 
        sx={{ 
          fontSize: 64, 
          color: theme.palette.primary.main,
          mb: 2,
        }} 
      />

      <Typography variant="h5" fontWeight="medium">
        Signing out...
      </Typography>

      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{ 
          color: theme.palette.primary.main,
          mt: 2,
        }} 
      />

      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        Redirecting to home page
      </Typography>
    </Box>
  );
};

export default SignOut;