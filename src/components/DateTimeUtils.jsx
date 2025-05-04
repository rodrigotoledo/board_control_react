import React from 'react';
import { Chip, Button, Stack, Typography } from '@mui/material';
import { CheckCircle, Done } from '@mui/icons-material';
import { format } from 'date-fns';

export const DateTimeFormat = ({ datetime }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {datetime ? (
        <>
          <Chip
            label={format(new Date(datetime), 'PPpp')}
            color="success"
            variant="outlined"
            size="small"
          />
        </>
      ) : (
        <>---</>
      )}
    </Stack>
  );
};


export const CompletedAtStatus = ({ completed_at, onMarkCompleted }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {completed_at ? (
        <>
          <Chip
            icon={<CheckCircle fontSize="small" />}
            label={format(new Date(completed_at), 'PPpp')}
            color="success"
            variant="outlined"
            size="small"
          />
        </>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<Done />}
          onClick={onMarkCompleted}
        >
          Mark as Completed
        </Button>
      )}
    </Stack>
  );
};