import { Box } from '@mui/material';

function BodyWrapper({ children, cardclass }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'secondary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export default BodyWrapper;