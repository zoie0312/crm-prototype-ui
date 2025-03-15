import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Divider,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  People,
  BusinessCenter,
  CalendarToday,
  MoreVert,
  AttachMoney
} from '@mui/icons-material';

// Import types
import { 
  RecentCustomer, 
  UpcomingTask, 
  OpportunitySummary, 
  SummaryMetrics,
  DashboardData
} from '@/types';

// Import mock data
import dashboardData from '@/data/mock/dashboard.json';

export default function Dashboard() {
  // Use the imported mock data with proper typing
  const [recentCustomers, setRecentCustomers] = useState<RecentCustomer[]>(dashboardData.recentCustomers);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>(dashboardData.upcomingTasks);
  const [opportunities, setOpportunities] = useState<OpportunitySummary[]>(dashboardData.opportunities);
  const [summaryMetrics, setSummaryMetrics] = useState<SummaryMetrics>(dashboardData.summaryMetrics);

  return (
    <MainLayout title="Dashboard">
      <Box sx={{ flexGrow: 1 }}>
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Customers
                  </Typography>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                    <People />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2, mb: 1 }}>
                  {summaryMetrics.totalCustomers}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                    +{summaryMetrics.customerGrowth}% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active Opportunities
                  </Typography>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                    <BusinessCenter />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2, mb: 1 }}>
                  {summaryMetrics.activeOpportunities}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                    +{summaryMetrics.opportunityGrowth}% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Pipeline Value
                  </Typography>
                  <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                    <AttachMoney />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2, mb: 1 }}>
                  ${summaryMetrics.pipelineValue}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {summaryMetrics.pipelineValueChange < 0 ? (
                    <>
                      <TrendingDown color="error" fontSize="small" />
                      <Typography variant="body2" color="error.main" sx={{ ml: 0.5 }}>
                        {summaryMetrics.pipelineValueChange}% from last month
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TrendingUp color="success" fontSize="small" />
                      <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                        +{summaryMetrics.pipelineValueChange}% from last month
                      </Typography>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Upcoming Tasks
                  </Typography>
                  <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
                    <CalendarToday />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2, mb: 1 }}>
                  {summaryMetrics.upcomingTasksCount}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                    +{summaryMetrics.taskGrowth}% from last week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Recent Customers */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Customers</Typography>
                <Button size="small" color="primary">View All</Button>
              </Box>
              <List>
                {recentCustomers.map((customer, index) => (
                  <Box key={customer.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="more">
                          <MoreVert />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>{customer.name.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={customer.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {customer.company}
                            </Typography>
                            {` — Added on ${customer.date}`}
                          </>
                        }
                      />
                      <Chip 
                        label={customer.status} 
                        size="small" 
                        color={customer.status === 'Active' ? 'success' : 'default'} 
                        variant="outlined" 
                      />
                    </ListItem>
                    {index < recentCustomers.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Upcoming Tasks */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Upcoming Tasks</Typography>
                <Button size="small" color="primary">View All</Button>
              </Box>
              <List>
                {upcomingTasks.map((task, index) => (
                  <Box key={task.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="more">
                          <MoreVert />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: task.type === 'Call' ? 'info.main' : task.type === 'Meeting' ? 'warning.main' : 'success.main' }}>
                          <CalendarToday />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={task.title}
                        secondary={`Scheduled for ${task.date}`}
                      />
                      <Chip 
                        label={task.type} 
                        size="small" 
                        color={task.type === 'Call' ? 'info' : task.type === 'Meeting' ? 'warning' : 'success'} 
                        variant="outlined" 
                      />
                    </ListItem>
                    {index < upcomingTasks.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Opportunities */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Active Opportunities</Typography>
                <Button size="small" color="primary">View All</Button>
              </Box>
              <Grid container spacing={2}>
                {opportunities.map((opportunity) => (
                  <Grid item xs={12} md={4} key={opportunity.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h6" component="div">
                            {opportunity.name}
                          </Typography>
                          <Chip 
                            label={`${opportunity.probability}%`} 
                            size="small" 
                            color={
                              opportunity.probability >= 70 ? 'success' : 
                              opportunity.probability >= 40 ? 'warning' : 'error'
                            } 
                          />
                        </Box>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Stage: {opportunity.stage}
                        </Typography>
                        <Typography variant="body2">
                          Value: ${opportunity.value.toLocaleString()}
                        </Typography>
                        <Button size="small" sx={{ mt: 2 }}>View Details</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
