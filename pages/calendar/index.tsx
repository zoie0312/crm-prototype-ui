import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardHeader, 
  CardContent, 
  Button, 
  Grid, 
  Divider, 
  Checkbox, 
  IconButton, 
  Menu, 
  MenuItem, 
  Badge, 
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Chip,
  ChipProps
} from '@mui/material';
import { 
  Add as AddIcon, 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon, 
  Edit as EditIcon, 
  MoreVert as MoreVertIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as ClockIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import MainLayout from '@/components/layout/MainLayout';
import calendarData from '@/data/mock/calendar.json';
import { CalendarData, CalendarEvent, CalendarDay, Task, Meeting } from '@/types';

const CalendarPage = () => {
  const [data] = useState<CalendarData>(calendarData as unknown as CalendarData);
  const [viewMode, setViewMode] = useState('month');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [taskFilter, setTaskFilter] = useState('all');

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTaskFilterChange = (filter: string) => {
    setTaskFilter(filter);
  };

  const getTaskPriorityClass = (priority: string): ChipProps['color'] => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'primary';
    }
  };

  const getEventClass = (type: string) => {
    switch (type) {
      case 'meeting':
        return '#e8f4ff';
      case 'task':
        return '#e8f5e9';
      case 'deadline':
        return '#fff3e0';
      case 'reminder':
        return '#f3e5f5';
      default:
        return '#e8f4ff';
    }
  };

  const getEventTextColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return '#0056b3';
      case 'task':
        return '#28a745';
      case 'deadline':
        return '#f57c00';
      case 'reminder':
        return '#9c27b0';
      default:
        return '#0056b3';
    }
  };

  const renderCalendarDays = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
        {weekdays.map((day, index) => (
          <Box 
            key={index} 
            sx={{ 
              textAlign: 'center', 
              fontWeight: 500, 
              padding: 1, 
              bgcolor: '#f8f9fa' 
            }}
          >
            {day}
          </Box>
        ))}
        
        {data.calendarDays.map((day, index) => (
          <Box 
            key={index} 
            sx={{ 
              minHeight: 120, 
              border: '1px solid #e9ecef', 
              borderRadius: 1, 
              padding: 1, 
              bgcolor: day.isToday ? '#e8f4ff' : day.isOtherMonth ? '#f8f9fa' : 'white',
              borderColor: day.isToday ? '#b8daff' : '#e9ecef',
              color: day.isOtherMonth ? '#adb5bd' : 'inherit',
              position: 'relative'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500, 
                marginBottom: 0.5, 
                textAlign: 'right' 
              }}
            >
              {day.day}
            </Typography>
            
            {day.events.map((event) => (
              <Box 
                key={event.id} 
                sx={{ 
                  bgcolor: getEventClass(event.type), 
                  color: getEventTextColor(event.type), 
                  borderRadius: 0.5, 
                  padding: '3px 5px', 
                  marginBottom: 0.5, 
                  fontSize: '0.8rem', 
                  cursor: 'pointer', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis' 
                }}
              >
                {event.title}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  const renderTasks = () => {
    return data.tasks.map((task) => (
      <Box 
        key={task.id} 
        sx={{ 
          padding: '10px 15px', 
          borderBottom: '1px solid #e9ecef', 
          display: 'flex', 
          alignItems: 'center',
          opacity: task.completed ? 0.6 : 1
        }}
      >
        <Checkbox 
          checked={task.completed} 
          sx={{ marginRight: 1 }} 
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              marginBottom: 0.5, 
              fontWeight: 500,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#6c757d' : 'inherit'
            }}
          >
            {task.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, color: '#6c757d', fontSize: '0.8rem' }}>
            <Chip 
              label={`${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority`} 
              size="small" 
              color={getTaskPriorityClass(task.priority)}
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ClockIcon fontSize="small" />
              <Typography variant="caption">{task.dueDate}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    ));
  };

  const renderMeetings = () => {
    return data.upcomingMeetings.map((meeting) => (
      <ListItem key={meeting.id} sx={{ px: 3, py: 2, borderBottom: '1px solid #e9ecef' }}>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="subtitle1" component="span" sx={{ fontWeight: 500 }}>
                {meeting.title}
              </Typography>
              <Chip 
                label={meeting.date} 
                size="small" 
                color={meeting.date === 'Today' ? 'primary' : 'default'} 
                sx={{ borderRadius: 10 }}
              />
            </Box>
          }
          secondary={
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              <ClockIcon fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
              {meeting.time}
              <PersonIcon fontSize="inherit" sx={{ ml: 1, mr: 0.5, verticalAlign: 'text-bottom' }} />
              {meeting.attendee}
            </Typography>
          }
        />
      </ListItem>
    ));
  };

  return (
    <MainLayout title="Calendar & Tasks">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Calendar & Tasks</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<CalendarIcon />}
              onClick={handleMenuClick}
              sx={{ mr: 2 }}
            >
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { setViewMode('month'); handleMenuClose(); }}>Month View</MenuItem>
              <MenuItem onClick={() => { setViewMode('week'); handleMenuClose(); }}>Week View</MenuItem>
              <MenuItem onClick={() => { setViewMode('day'); handleMenuClose(); }}>Day View</MenuItem>
              <MenuItem onClick={() => { setViewMode('agenda'); handleMenuClose(); }}>Agenda View</MenuItem>
            </Menu>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Event
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Calendar Section */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant="h6">{data.currentMonth}</Typography>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                  <Button variant="outlined" size="small">Today</Button>
                </Box>
                <Box sx={{ height: 600, overflowY: 'auto' }}>
                  {renderCalendarDays()}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Tasks and Meetings Section */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardHeader 
                title="My Tasks" 
                action={
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<AddIcon />}
                  >
                    New Task
                  </Button>
                }
              />
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #e9ecef' }}>
                <ButtonGroup size="small">
                  <Button 
                    variant={taskFilter === 'all' ? 'contained' : 'outlined'} 
                    onClick={() => handleTaskFilterChange('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={taskFilter === 'today' ? 'contained' : 'outlined'} 
                    onClick={() => handleTaskFilterChange('today')}
                  >
                    Today
                  </Button>
                  <Button 
                    variant={taskFilter === 'upcoming' ? 'contained' : 'outlined'} 
                    onClick={() => handleTaskFilterChange('upcoming')}
                  >
                    Upcoming
                  </Button>
                </ButtonGroup>
                <Button 
                  variant="outlined" 
                  size="small" 
                  endIcon={<ChevronRightIcon />}
                >
                  Sort
                </Button>
              </Box>
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                {renderTasks()}
              </Box>
            </Card>

            <Card>
              <CardHeader title="Upcoming Meetings" />
              <List disablePadding>
                {renderMeetings()}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default CalendarPage; 