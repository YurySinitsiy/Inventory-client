import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{
            width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background:
                "radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
        }}>
            <CircularProgress />
        </Box>
    );
}