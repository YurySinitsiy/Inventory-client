import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const BlockLoader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '9',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper
      }}>
      <CircularProgress />
    </Box>
  );
};

export default BlockLoader;
