import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Forms', icon: <AssignmentIcon />, path: '/admin/forms' },
  { text: 'Uploads', icon: <CloudUploadIcon />, path: '/admin/uploads' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

const AdminDrawer = ({
  open,
  onClose,
  onNavigate,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleItemClick = (path) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
    if (onNavigate) {
      onNavigate();
    }
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo/Header Section */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.25rem',
          }}
        >
          B
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}
          >
            Birdie
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.7rem',
            }}
          >
            Admin Suite
          </Typography>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List
        sx={{
          flex: 1,
          px: 1,
          py: 2,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.action.disabled,
            borderRadius: '3px',
            '&:hover': {
              background: theme.palette.action.hover,
            },
          },
        }}
      >
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 0.25,
                  color: active ? 'primary.main' : 'text.primary',
                  backgroundColor: active ? 'primary.lighter' : 'transparent',
                  transition: theme.transitions.create(
                    ['background-color', 'color'],
                    {
                      duration: theme.transitions.duration.shorter,
                    }
                  ),
                  '&:hover': {
                    backgroundColor: active
                      ? 'primary.lighter'
                      : 'action.hover',
                    color: active ? 'primary.main' : 'text.primary',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: active ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Section */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            lineHeight: 1.6,
          }}
        >
          v1.0.0
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            fontSize: '0.65rem',
          }}
        >
          © 2024 Birdie
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(open && {
              width: drawerWidth,
            }),
            ...(!open && {
              width: theme.spacing(7),
              overflowX: 'hidden',
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AdminDrawer;
