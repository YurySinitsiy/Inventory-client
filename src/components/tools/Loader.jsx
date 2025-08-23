import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{
            position: 'absolute', top: '0', left: '0', zIndex: '9',
            width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <CircularProgress />
        </Box>
    );
}