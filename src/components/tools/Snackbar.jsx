import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ snackbar, closeSnackbar }) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={closeSnackbar}  
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={snackbar.severity}
        onClose={closeSnackbar}  
        variant="filled"
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;

