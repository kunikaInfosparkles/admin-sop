import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './header';
import Footer from './footer';


const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;



