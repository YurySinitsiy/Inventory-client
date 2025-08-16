import { Snackbar as MuiSnackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ open, message, severity = "success", onClose, autoHideDuration = 3000 }) => {
    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
            >
                {message}
            </Alert>
        </MuiSnackbar>
    );
};

export default CustomSnackbar;

