import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  IconButton,
  FormGroup,
  Checkbox,
  Paper,
  SelectChangeEvent
} from '@mui/material';
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Extension as ExtensionIcon,
  PhotoCamera as PhotoCameraIcon,
  Microsoft as MicrosoftIcon,
  Google as GoogleIcon,
  CreditCard as CreditCardIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import MainLayout from '@/components/layout/MainLayout';
import settingsData from '@/data/mock/settings.json';
import { 
  SettingsData, 
  UserProfile, 
  SecuritySettings, 
  NotificationSettings, 
  AppearanceSettings, 
  Integration,
  EmailNotifications,
  InAppNotifications
} from '@/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const SettingsPage = () => {
  const [data, setData] = useState<SettingsData>(settingsData as unknown as SettingsData);
  const [tabValue, setTabValue] = useState(0);
  const [profileForm, setProfileForm] = useState<UserProfile>(data.profile);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  const handleDepartmentChange = (e: SelectChangeEvent) => {
    setProfileForm({
      ...profileForm,
      department: e.target.value
    });
  };

  const handleTwoFactorToggle = () => {
    setData({
      ...data,
      security: {
        ...data.security,
        twoFactorEnabled: !data.security.twoFactorEnabled
      }
    });
  };

  const handleEmailNotificationChange = (setting: keyof EmailNotifications) => {
    setData({
      ...data,
      notifications: {
        ...data.notifications,
        email: {
          ...data.notifications.email,
          [setting]: !data.notifications.email[setting]
        }
      }
    });
  };

  const handleInAppNotificationChange = (setting: keyof InAppNotifications) => {
    setData({
      ...data,
      notifications: {
        ...data.notifications,
        inApp: {
          ...data.notifications.inApp,
          [setting]: !data.notifications.inApp[setting]
        }
      }
    });
  };

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      appearance: {
        ...data.appearance,
        theme: e.target.value as 'light' | 'dark' | 'system'
      }
    });
  };

  const handleAccentColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      appearance: {
        ...data.appearance,
        accentColor: e.target.value as 'blue' | 'green' | 'purple' | 'red'
      }
    });
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      appearance: {
        ...data.appearance,
        fontSize: e.target.value as 'small' | 'medium' | 'large'
      }
    });
  };

  const handleIntegrationToggle = (id: number) => {
    setData({
      ...data,
      integrations: data.integrations.map(integration => 
        integration.id === id 
          ? { ...integration, connected: !integration.connected } 
          : integration
      )
    });
  };

  const getIntegrationIcon = (iconName: string) => {
    switch (iconName) {
      case 'microsoft':
        return <MicrosoftIcon />;
      case 'google':
        return <GoogleIcon />;
      case 'slack':
        return <PersonIcon />; // Using PersonIcon as a placeholder for Slack
      case 'credit_card':
        return <CreditCardIcon />;
      case 'phone':
        return <PhoneIcon />;
      default:
        return <ExtensionIcon />;
    }
  };

  const getAccentColorStyle = (color: string) => {
    switch (color) {
      case 'blue':
        return { backgroundColor: '#0056b3', borderColor: '#0056b3' };
      case 'green':
        return { backgroundColor: '#28a745', borderColor: '#28a745' };
      case 'purple':
        return { backgroundColor: '#6f42c1', borderColor: '#6f42c1' };
      case 'red':
        return { backgroundColor: '#dc3545', borderColor: '#dc3545' };
      default:
        return { backgroundColor: '#0056b3', borderColor: '#0056b3' };
    }
  };

  return (
    <MainLayout title="Settings">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Settings</Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar 
                  src={profileForm.avatar} 
                  alt={`${profileForm.firstName} ${profileForm.lastName}`}
                  sx={{ width: 100, height: 100, mb: 2 }}
                >
                  {profileForm.firstName.charAt(0)}{profileForm.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  {profileForm.firstName} {profileForm.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {profileForm.jobTitle}
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<PhotoCameraIcon />}
                  size="small"
                >
                  Change Photo
                </Button>

                <Box sx={{ width: '100%', mt: 3 }}>
                  <Tabs
                    orientation="vertical"
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="settings tabs"
                    sx={{ 
                      borderRight: 1, 
                      borderColor: 'divider',
                      '& .MuiTab-root': {
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        pl: 0
                      }
                    }}
                  >
                    <Tab 
                      icon={<PersonIcon />} 
                      iconPosition="start" 
                      label="Profile Settings" 
                      {...a11yProps(0)} 
                    />
                    <Tab 
                      icon={<SecurityIcon />} 
                      iconPosition="start" 
                      label="Security" 
                      {...a11yProps(1)} 
                    />
                    <Tab 
                      icon={<NotificationsIcon />} 
                      iconPosition="start" 
                      label="Notifications" 
                      {...a11yProps(2)} 
                    />
                    <Tab 
                      icon={<PaletteIcon />} 
                      iconPosition="start" 
                      label="Appearance" 
                      {...a11yProps(3)} 
                    />
                    <Tab 
                      icon={<ExtensionIcon />} 
                      iconPosition="start" 
                      label="Integrations" 
                      {...a11yProps(4)} 
                    />
                  </Tabs>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            {/* Profile Settings Tab */}
            <TabPanel value={tabValue} index={0}>
              <Card>
                <CardHeader title="Profile Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={profileForm.firstName}
                        onChange={handleProfileChange}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={profileForm.lastName}
                        onChange={handleProfileChange}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        name="jobTitle"
                        value={profileForm.jobTitle}
                        onChange={handleProfileChange}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                          labelId="department-label"
                          id="department"
                          value={profileForm.department}
                          label="Department"
                          onChange={handleDepartmentChange}
                        >
                          <MenuItem value="Retail Banking">Retail Banking</MenuItem>
                          <MenuItem value="Wealth Management">Wealth Management</MenuItem>
                          <MenuItem value="Commercial Banking">Commercial Banking</MenuItem>
                          <MenuItem value="Mortgage Services">Mortgage Services</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        margin="normal"
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="contained" color="primary">
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel value={tabValue} index={1}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Change Password" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="contained" color="primary">
                        Update Password
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardHeader title="Two-Factor Authentication" />
                <Divider />
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.security.twoFactorEnabled}
                          onChange={handleTwoFactorToggle}
                          color="primary"
                        />
                      }
                      label="Enable Two-Factor Authentication"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                  </Typography>
                  <Button variant="outlined">
                    Reconfigure Two-Factor
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title="Login Sessions" />
                <Divider />
                <CardContent>
                  <List>
                    {data.security.sessions.map((session) => (
                      <ListItem key={session.id} divider>
                        <ListItemText
                          primary={session.device}
                          secondary={`${session.location} • ${session.lastActive}`}
                        />
                        <ListItemSecondaryAction>
                          <Button 
                            variant="outlined" 
                            color={session.status === "Current Session" ? "secondary" : "error"}
                            size="small"
                          >
                            {session.status === "Current Session" ? "Active" : "Revoke"}
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={2}>
              <Card>
                <CardHeader title="Notification Preferences" />
                <Divider />
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Email Notifications</Typography>
                  <FormGroup sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.email.newCustomerAssignments}
                          onChange={() => handleEmailNotificationChange('newCustomerAssignments')}
                        />
                      }
                      label="New customer assignments"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.email.taskReminders}
                          onChange={() => handleEmailNotificationChange('taskReminders')}
                        />
                      }
                      label="Task reminders"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.email.meetingReminders}
                          onChange={() => handleEmailNotificationChange('meetingReminders')}
                        />
                      }
                      label="Meeting reminders"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.email.dealStatusUpdates}
                          onChange={() => handleEmailNotificationChange('dealStatusUpdates')}
                        />
                      }
                      label="Deal status updates"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.email.weeklyReports}
                          onChange={() => handleEmailNotificationChange('weeklyReports')}
                        />
                      }
                      label="Weekly performance reports"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.email.monthlyReports}
                          onChange={() => handleEmailNotificationChange('monthlyReports')}
                        />
                      }
                      label="Monthly performance reports"
                    />
                  </FormGroup>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" sx={{ mb: 2 }}>In-App Notifications</Typography>
                  <FormGroup sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.inApp.chatMessages}
                          onChange={() => handleInAppNotificationChange('chatMessages')}
                        />
                      }
                      label="Chat messages"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.inApp.newAssignments}
                          onChange={() => handleInAppNotificationChange('newAssignments')}
                        />
                      }
                      label="New assignments"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.inApp.taskUpdates}
                          onChange={() => handleInAppNotificationChange('taskUpdates')}
                        />
                      }
                      label="Task updates"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.inApp.meetingReminders}
                          onChange={() => handleInAppNotificationChange('meetingReminders')}
                        />
                      }
                      label="Meeting reminders"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.inApp.dealStatusChanges}
                          onChange={() => handleInAppNotificationChange('dealStatusChanges')}
                        />
                      }
                      label="Deal status changes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.notifications.inApp.systemUpdates}
                          onChange={() => handleInAppNotificationChange('systemUpdates')}
                        />
                      }
                      label="System updates"
                    />
                  </FormGroup>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary">
                      Save Preferences
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Appearance Tab */}
            <TabPanel value={tabValue} index={3}>
              <Card>
                <CardHeader title="Theme Settings" />
                <Divider />
                <CardContent>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Color Theme</Typography>
                    <RadioGroup
                      row
                      name="theme"
                      value={data.appearance.theme}
                      onChange={handleThemeChange}
                    >
                      <FormControlLabel value="light" control={<Radio />} label="Light" />
                      <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                      <FormControlLabel value="system" control={<Radio />} label="Use System Setting" />
                    </RadioGroup>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Accent Color</Typography>
                    <RadioGroup
                      row
                      name="accentColor"
                      value={data.appearance.accentColor}
                      onChange={handleAccentColorChange}
                    >
                      <FormControlLabel 
                        value="blue" 
                        control={<Radio sx={getAccentColorStyle('blue')} />} 
                        label="Blue" 
                      />
                      <FormControlLabel 
                        value="green" 
                        control={<Radio sx={getAccentColorStyle('green')} />} 
                        label="Green" 
                      />
                      <FormControlLabel 
                        value="purple" 
                        control={<Radio sx={getAccentColorStyle('purple')} />} 
                        label="Purple" 
                      />
                      <FormControlLabel 
                        value="red" 
                        control={<Radio sx={getAccentColorStyle('red')} />} 
                        label="Red" 
                      />
                    </RadioGroup>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Font Size</Typography>
                    <RadioGroup
                      row
                      name="fontSize"
                      value={data.appearance.fontSize}
                      onChange={handleFontSizeChange}
                    >
                      <FormControlLabel value="small" control={<Radio />} label="Small" />
                      <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                      <FormControlLabel value="large" control={<Radio />} label="Large" />
                    </RadioGroup>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary">
                      Save Settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Integrations Tab */}
            <TabPanel value={tabValue} index={4}>
              <Card>
                <CardHeader title="Connected Applications" />
                <Divider />
                <CardContent>
                  <List>
                    {data.integrations.map((integration) => (
                      <ListItem key={integration.id} divider>
                        <ListItemAvatar>
                          <Avatar>
                            {getIntegrationIcon(integration.icon)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={integration.name}
                          secondary={integration.description}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            edge="end"
                            checked={integration.connected}
                            onChange={() => handleIntegrationToggle(integration.id)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<ExtensionIcon />}
                    >
                      Connect New Application
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default SettingsPage; 