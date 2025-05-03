import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme, color }) => ({
  minWidth: "4rem",
  minHeight: "4rem",
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color,
  color: theme.palette.common.white,
  position: 'relative',
  fontWeight: 'bold'
}));

const PercentageBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: "-0.8rem",  // Ajuste para posicionamento
  right: "-0.2rem",   // Ajuste para posicionamento
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  borderRadius: '50%',  // Use '50%' para garantir um círculo perfeito
  padding: theme.spacing(0.5),
  fontSize: '0.75rem',
  border: `1px solid ${theme.palette.grey[600]}`,
  width: 34,   // Largura fixa
  height: 34,  // Altura igual à largura
  display: 'flex',
  alignItems: 'center',  // Centraliza verticalmente
  justifyContent: 'center',
  boxSizing: 'border-box' // Garante que a borda não altere as dimensões
}));

const ProgressBadge = ({ total, completed }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const getColor = () => {
    if (percentage < 30) return '#dc2626'; // red-600
    if (percentage < 70) return '#ca8a04'; // yellow-600
    return '#16a34a'; // green-600
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <StyledPaper 
        elevation={3} 
        color={getColor()}
      >
        <Typography variant="subtitle2">
          {completed}/{total}
        </Typography>
        <PercentageBadge>
          {percentage}%
        </PercentageBadge>
      </StyledPaper>
    </Box>
  );
};

export default ProgressBadge;