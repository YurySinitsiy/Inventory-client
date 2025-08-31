import { Box, Container } from '@mui/material';
const RenderAppBox = ({ children }) => {
  return (
    <Box
      style={{
        width: '100vw',
        height: '100vh',
      }}>
      {children}
    </Box>
  );
};

export default RenderAppBox;
