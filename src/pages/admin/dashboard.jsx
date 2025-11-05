import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome to your admin panel
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value="1,234"
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Tasks"
            value="567"
            icon={<AssignmentIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Growth"
            value="+24%"
            icon={<TrendingUpIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Notifications"
            value="12"
            icon={<NotificationsIcon />}
            color="#d32f2f"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Activity feed will appear here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
