import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextInput,
  NumberInput,
  SelectInput,
  CheckboxInput,
  SwitchInput,
  AutocompleteInput,
} from "../../components/formFields";
import { Button, Grid, Typography, Paper, Box } from "@mui/material";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be a whole number")
    .min(18, "Must be at least 18 years old")
    .max(120, "Invalid age"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  country: yup.string().required("Country is required"),
  department: yup
    .object()
    .required("Department is required")
    .nullable(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  newsletter: yup.boolean(),
});

const ExampleFormWithValidation = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      phoneNumber: "",
      country: "",
      department: null,
      password: "",
      confirmPassword: "",
      terms: false,
      newsletter: false,
    },
  });

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
    { label: "Australia", value: "au" },
    { label: "India", value: "in" },
  ];

  const departmentOptions = [
    { label: "Engineering", value: "engineering" },
    { label: "Marketing", value: "marketing" },
    { label: "Sales", value: "sales" },
    { label: "Human Resources", value: "hr" },
    { label: "Finance", value: "finance" },
  ];

  const onSubmit = (data) => {
    console.log("Form Submitted Successfully:", data);
    alert("Form submitted! Check console for details.");
    reset();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 900, margin: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        User Registration Form
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This form demonstrates Yup validation with React Hook Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              register={register}
              errors={errors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <NumberInput
              label="Age"
              name="age"
              register={register}
              errors={errors}
              validation={false}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              label="Phone Number"
              name="phoneNumber"
              register={register}
              errors={errors}
              placeholder="10 digits"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SelectInput
              label="Country"
              name="country"
              register={register}
              errors={errors}
              options={countryOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AutocompleteInput
              label="Department"
              name="department"
              control={control}
              options={departmentOptions}
              errors={errors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              errors={errors}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <CheckboxInput
                label="I agree to the terms and conditions"
                name="terms"
                register={register}
              />
              {errors.terms && (
                <Typography variant="caption" color="error" sx={{ ml: 4 }}>
                  {errors.terms.message}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <SwitchInput
              label="Subscribe to newsletter"
              name="newsletter"
              register={register}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" type="submit" size="large">
                Submit Form
              </Button>
              <Button
                variant="outlined"
                type="button"
                size="large"
                onClick={() => reset()}
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ExampleFormWithValidation;
