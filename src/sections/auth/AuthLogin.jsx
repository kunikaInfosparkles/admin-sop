import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { CheckboxInput, PasswordInput, TextInput } from '../../components/formFields';
import { Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { errorMsg, successMsg } from '../../utils/customeFn';
import { setToken } from '../../utils/tokenUtils';
import useAuthService from '../../services/ApisCall/authServices';
import { useAuth } from '../../context/authContext';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const navigate = useNavigate()
  const { loginAPi } = useAuthService()
  const { login } = useAuth();


  const onSubmit = async (data) => {
    if (data.email === 'kunika@gmail.com' && data.password === '123456') {
      login('dummy access')
      navigate("/admin");
      successMsg('Login successfully');
      reset();
    } else {
      errorMsg('Invalid Credentials')
    }
    // const res = await loginAPi(data);

    // if (res?.data?.success) {
    //   login(res?.data?.data?.accessToken)
    //   navigate("/admin");
    //   successMsg(res?.data?.message || 'Login successfully');
    //   reset();
    // }

  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters")
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              register={register}
              errors={errors}
              staticLabel={true}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <PasswordInput
              label="Password"
              name="password"
              register={register}
              errors={errors}
              staticLabel={true}
            />
            <Grid size={12}>
              <Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
                {/* <CheckboxInput label='Keep me sign in' name='keep' register={register} /> */}
                <Link variant="h6" to="#" color="text.primary">
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button fullWidth size="large" variant="contained" color="primary" type='submit'>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
