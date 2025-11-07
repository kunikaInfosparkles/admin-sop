import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

export default function AuthCard({ children, ...other }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 475,
        width: '100%',
        margin: '0 auto',
        borderRadius: 2,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[200],
        overflow: 'visible'
      }}
      {...other}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 }, position: 'relative' }}>
        {children}
      </CardContent>
    </Card>
  );
}

AuthCard.propTypes = { children: PropTypes.any, other: PropTypes.any };