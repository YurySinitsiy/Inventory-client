// SnackbarAlert.jsx
import { Snackbar, Alert } from '@mui/material';

const SnackbarAlert = ({ snackbar, setSnackbar }) => {
    const handleClose = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                severity={snackbar.severity}
                onClose={handleClose}
                variant='filled'>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;
