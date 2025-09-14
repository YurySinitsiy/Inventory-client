import { Box } from '@mui/material';
const RenderAppBox = ({ children }) => {
  return (
    <Box
      style={{
        width: '100vw',
        minHeight: '100vh',
      }}>
      {children}
    </Box>
  );
};

export default RenderAppBox;
