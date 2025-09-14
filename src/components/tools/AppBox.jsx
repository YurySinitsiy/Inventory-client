import { Box } from '@mui/material';
const AppBox = ({ children }) => {
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

export default AppBox;
