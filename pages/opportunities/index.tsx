import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  BusinessCenter as BusinessCenterIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import Link from 'next/link';

// Import types
import { Opportunity, OpportunitiesData } from '@/types';

// Import mock data
import opportunitiesData from '@/data/mock/opportunities.json';

export default function Opportunities() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Use the imported mock data with proper typing
  const [opportunities, setOpportunities] = useState<Opportunity[]>(opportunitiesData.opportunities);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredOpportunities = opportunities.filter(opportunity => 
    opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary metrics
  const totalPipelineValue = opportunities
    .filter(o => o.stage !== 'Closed Lost')
    .reduce((sum, opportunity) => sum + opportunity.value, 0);
  
  const weightedPipelineValue = opportunities
    .filter(o => o.stage !== 'Closed Lost')
    .reduce((sum, opportunity) => sum + (opportunity.value * opportunity.probability / 100), 0);
  
  const closedWonValue = opportunities
    .filter(o => o.stage === 'Closed Won')
    .reduce((sum, opportunity) => sum + opportunity.value, 0);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Qualification':
        return 'info';
      case 'Discovery':
        return 'info';
      case 'Proposal':
        return 'warning';
      case 'Negotiation':
        return 'warning';
      case 'Closed Won':
        return 'success';
      case 'Closed Lost':
        return 'error';
      default:
        return 'default';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'success';
    if (probability >= 40) return 'warning';
    return 'error';
  };

  return (
    <MainLayout title="Opportunities">
      <Box sx={{ flexGrow: 1 }}>
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Pipeline Value
                  </Typography>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                    <MoneyIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  ${totalPipelineValue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Weighted Pipeline
                  </Typography>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                    <BusinessCenterIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  ${Math.round(weightedPipelineValue).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Closed Won (YTD)
                  </Typography>
                  <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                    <TrendingUpIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  ${closedWonValue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              Opportunity Pipeline
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              component={Link}
              href="/opportunities/new"
            >
              Add Opportunity
            </Button>
          </Box>
          
          <Box sx={{ px: 2, pb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search opportunities by name, customer, or product"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Filter">
                      <IconButton size="small">
                        <FilterIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Probability</TableCell>
                  <TableCell>Expected Close</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOpportunities
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((opportunity) => (
                    <TableRow
                      hover
                      key={opportunity.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {opportunity.name}
                      </TableCell>
                      <TableCell>{opportunity.customer}</TableCell>
                      <TableCell>${opportunity.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={opportunity.stage} 
                          size="small"
                          color={getStageColor(opportunity.stage)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={opportunity.probability} 
                              color={getProbabilityColor(opportunity.probability)}
                              sx={{ height: 8, borderRadius: 5 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {opportunity.probability}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{opportunity.expectedCloseDate}</TableCell>
                      <TableCell>{opportunity.owner}</TableCell>
                      <TableCell>{opportunity.product}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton 
                            size="small"
                            component={Link}
                            href={`/opportunities/${opportunity.id}`}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small"
                            component={Link}
                            href={`/opportunities/${opportunity.id}/edit`}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOpportunities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </MainLayout>
  );
} 