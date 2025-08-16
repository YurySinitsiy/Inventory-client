import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{
            position: 'absolute', top: '0', left: '0', zIndex: '9',
            width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background:
                "radial-gradient(circle,rgba(255, 255, 255, 0.7) 0%, rgba(148, 187, 233, 0.7) 100%)",
        }}>
            <CircularProgress />
        </Box>
    );
}