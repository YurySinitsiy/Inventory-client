import { Snackbar as MuiSnackbar, Alert } from "@mui/material";

const Snackbar = ({ open, message, severity = "success", onClose, autoHideDuration = 3000 }) => {
    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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

export default Snackbar;

