import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardHeader, 
  CardContent, 
  Grid, 
  Button, 
  Menu, 
  MenuItem, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  ButtonGroup,
  Divider
} from '@mui/material';
import { 
  Download as DownloadIcon, 
  CalendarToday as CalendarIcon, 
  Add as AddIcon, 
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  ShowChart as ShowChartIcon
} from '@mui/icons-material';
import MainLayout from '@/components/layout/MainLayout';
import reportsData from '@/data/mock/reports.json';
import { ReportsData } from '@/types';

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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
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
    id: `report-tab-${index}`,
    'aria-controls': `report-tabpanel-${index}`,
  };
}

// Define types for the color values
type StageColorType = 'primary' | 'secondary' | 'warning' | 'info' | 'default';
type SegmentColorType = 'primary' | 'warning' | 'default';

const ReportsPage = () => {
  const [data] = useState<ReportsData>(reportsData as unknown as ReportsData);
  const [tabValue, setTabValue] = useState(0);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const [timeRangeAnchorEl, setTimeRangeAnchorEl] = useState<null | HTMLElement>(null);
  const [timeRange, setTimeRange] = useState('This Quarter');
  const [chartView, setChartView] = useState('Daily');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const handleTimeRangeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTimeRangeAnchorEl(event.currentTarget);
  };

  const handleTimeRangeClose = (option?: string) => {
    if (option) {
      setTimeRange(option);
    }
    setTimeRangeAnchorEl(null);
  };

  const handleChartViewChange = (view: string) => {
    setChartView(view);
  };

  const getStageColor = (stage: string): StageColorType => {
    switch (stage) {
      case 'Qualified':
        return 'primary';
      case 'Proposal':
        return 'secondary';
      case 'Negotiation':
        return 'warning';
      case 'Closing':
        return 'info';
      default:
        return 'default';
    }
  };

  const getSegmentColor = (segment: string): SegmentColorType => {
    switch (segment) {
      case 'High Net Worth':
        return 'primary';
      case 'Small Business':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <MainLayout title="Reports & Analytics">
      <Box sx={{ mb: 4 }}>
        {/* Header with actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Reports & Analytics</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExportClick}
              sx={{ mr: 2 }}
            >
              Export
            </Button>
            <Menu
              anchorEl={exportAnchorEl}
              open={Boolean(exportAnchorEl)}
              onClose={handleExportClose}
            >
              <MenuItem onClick={handleExportClose}>Export as PDF</MenuItem>
              <MenuItem onClick={handleExportClose}>Export as Excel</MenuItem>
              <MenuItem onClick={handleExportClose}>Export as CSV</MenuItem>
            </Menu>
            <Button
              variant="outlined"
              startIcon={<CalendarIcon />}
              onClick={handleTimeRangeClick}
              sx={{ mr: 2 }}
            >
              {timeRange}
            </Button>
            <Menu
              anchorEl={timeRangeAnchorEl}
              open={Boolean(timeRangeAnchorEl)}
              onClose={() => handleTimeRangeClose()}
            >
              <MenuItem onClick={() => handleTimeRangeClose('This Week')}>This Week</MenuItem>
              <MenuItem onClick={() => handleTimeRangeClose('This Month')}>This Month</MenuItem>
              <MenuItem onClick={() => handleTimeRangeClose('This Quarter')}>This Quarter</MenuItem>
              <MenuItem onClick={() => handleTimeRangeClose('This Year')}>This Year</MenuItem>
              <MenuItem onClick={() => handleTimeRangeClose('Custom Range...')}>Custom Range...</MenuItem>
            </Menu>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
            >
              Create Report
            </Button>
          </Box>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {data.keyMetrics.map((metric) => (
            <Grid item xs={12} sm={6} md={3} key={metric.id}>
              <Card sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Report Tabs */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
              <Tab label="Sales Performance" {...a11yProps(0)} />
              <Tab label="Customer Analytics" {...a11yProps(1)} />
              <Tab label="Product Performance" {...a11yProps(2)} />
              <Tab label="Team Performance" {...a11yProps(3)} />
            </Tabs>
          </Box>

          {/* Sales Performance Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader 
                    title="Sales Trend" 
                    action={
                      <ButtonGroup size="small">
                        <Button 
                          variant={chartView === 'Daily' ? 'contained' : 'outlined'} 
                          onClick={() => handleChartViewChange('Daily')}
                        >
                          Daily
                        </Button>
                        <Button 
                          variant={chartView === 'Weekly' ? 'contained' : 'outlined'} 
                          onClick={() => handleChartViewChange('Weekly')}
                        >
                          Weekly
                        </Button>
                        <Button 
                          variant={chartView === 'Monthly' ? 'contained' : 'outlined'} 
                          onClick={() => handleChartViewChange('Monthly')}
                        >
                          Monthly
                        </Button>
                      </ButtonGroup>
                    }
                  />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <ShowChartIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Sales trend chart visualization</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Pipeline by Stage" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <PieChartIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Pipeline stage distribution chart</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader 
                    title="Top Deals" 
                    action={
                      <Button variant="outlined" size="small">View All</Button>
                    }
                  />
                  <Divider />
                  <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 400 }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Opportunity Name</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Stage</TableCell>
                            <TableCell>Expected Close</TableCell>
                            <TableCell>Assigned To</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.salesPerformance.topDeals.map((deal) => (
                            <TableRow key={deal.id} hover>
                              <TableCell>{deal.name}</TableCell>
                              <TableCell>{deal.customer}</TableCell>
                              <TableCell>{deal.value}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={deal.stage} 
                                  color={getStageColor(deal.stage)} 
                                  size="small" 
                                />
                              </TableCell>
                              <TableCell>{deal.expectedClose}</TableCell>
                              <TableCell>{deal.assignedTo}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Customer Analytics Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Customer Segment Distribution" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <PieChartIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Customer segment pie chart</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Customer Acquisition Trend" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <TimelineIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Customer acquisition line chart</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Top Customers by Value" />
                  <Divider />
                  <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 400 }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Segment</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell>Lifetime Value</TableCell>
                            <TableCell>Relationship Length</TableCell>
                            <TableCell>Last Contact</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.customerAnalytics.topCustomers.map((customer) => (
                            <TableRow key={customer.id} hover>
                              <TableCell>{customer.name}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={customer.segment} 
                                  color={getSegmentColor(customer.segment)} 
                                  size="small" 
                                />
                              </TableCell>
                              <TableCell>{customer.products}</TableCell>
                              <TableCell>{customer.lifetimeValue}</TableCell>
                              <TableCell>{customer.relationshipLength}</TableCell>
                              <TableCell>{customer.lastContact}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Product Performance Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Product Revenue Contribution" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <BarChartIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Product revenue bar chart</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Product Cross-Selling Opportunities" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <BarChartIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Cross-selling heatmap visualization</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Product Growth Rate" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <TimelineIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Product growth line chart</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Team Performance Tab */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Team Performance by Revenue" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <BarChartIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Team performance bar chart</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Conversion Rates by Team Member" />
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 300, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <PieChartIcon sx={{ fontSize: 60, opacity: 0.3, mr: 2 }} />
                      <Typography>Conversion rate chart</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Team Member Performance" />
                  <Divider />
                  <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 400 }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Team Member</TableCell>
                            <TableCell>Revenue Generated</TableCell>
                            <TableCell>Opportunities Closed</TableCell>
                            <TableCell>Conversion Rate</TableCell>
                            <TableCell>Avg. Deal Size</TableCell>
                            <TableCell>In Pipeline</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.teamPerformance.teamMembers.map((member) => (
                            <TableRow key={member.id} hover>
                              <TableCell>{member.name}</TableCell>
                              <TableCell>{member.revenueGenerated}</TableCell>
                              <TableCell>{member.opportunitiesClosed}</TableCell>
                              <TableCell>{member.conversionRate}</TableCell>
                              <TableCell>{member.avgDealSize}</TableCell>
                              <TableCell>{member.inPipeline}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default ReportsPage; 