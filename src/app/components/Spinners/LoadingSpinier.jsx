import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function LoadingSpinier({ className }) {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress className={className} />
        </Box>
    );
}

export default LoadingSpinier;
