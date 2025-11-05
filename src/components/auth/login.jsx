import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { loginService } from "../../services/authServices";
import { useSnackbar } from "../../context/toasterContext";

const Login = () => {
  const { login } = useAuth();
  const { showMessage } = useSnackbar();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
    defaultValues: { email: "",   password: "", },
  });

  const onSubmit = async (data) => {
    const res = await loginService(data, navigate);
    if (res?.success) {
      
      login(res?.employeeLogin?.token);
      showMessage(res?.message, 'success')
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
