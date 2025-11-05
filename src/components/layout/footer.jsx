import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{xs: 12,sm:6,md:3}}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2">
              Your company description goes here. Brief and engaging content about your business.
            </Typography>
          </Grid>
          
          <Grid size={{xs: 12,sm:6,md:3}}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About
              </Link>
              <Link href="/products" color="inherit" underline="hover">
                Products
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid size={{xs: 12,sm:6,md:3}}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" gutterBottom>
              123 Business Street
            </Typography>
            <Typography variant="body2" gutterBottom>
              City, State 12345
            </Typography>
            <Typography variant="body2" gutterBottom>
              Phone: (555) 123-4567
            </Typography>
            <Typography variant="body2">
              Email: info@company.com
            </Typography>
          </Grid>
          
          <Grid size={{xs: 12,sm:6,md:3}}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.1)', mt: 4, pt: 2 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;