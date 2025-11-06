import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AdminAppBar from './AdminAppBar';
import AdminDrawer from './AdminDrawer';

const drawerWidth = 240;
const collapsedDrawerWidth = 56;

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AdminAppBar
        drawerOpen={drawerOpen}
        onDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />

      {/* Drawer */}
      <AdminDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: {
            xs: 0,
            md: drawerOpen ? drawerWidth : collapsedDrawerWidth,
          },
        }}
      >
        {/* Toolbar spacer to account for fixed AppBar */}
        <Box sx={{ height: { xs: 56, sm: 64 } }} />

        {/* Page Content */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            maxWidth: '100%',
            minHeight: `calc(100vh - ${isMobile ? 56 : 64}px)`,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
