import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import Logo from 'components/logo';
import AuthCard from './AuthCard';
// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box>
        <Box sx={{ px: 3, mt: 3 }} size={12}>
         Logo
        </Box>
      <Stack>
        <Box size={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 132px)' } }}
          >
            <Grid>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
