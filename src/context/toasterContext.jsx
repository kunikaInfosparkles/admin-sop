// src/components/SnackbarProvider.jsx
import React, { createContext, useState, useCallback, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info", // "success", "error", "warning", "info"
    });

    const showMessage = useCallback((message, severity = "info") => {
        setSnackbar({ open: true, message, severity });
    }, []);

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={closeSnackbar} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
