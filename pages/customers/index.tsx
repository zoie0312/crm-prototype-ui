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
  Avatar
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  AccountBalance as BankIcon
} from '@mui/icons-material';
import Link from 'next/link';

// Import types
import { Customer, CustomersData } from '@/types';

// Import mock data
import customersData from '@/data/mock/customers.json';

export default function Customers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the imported mock data with proper typing
  const [customers, setCustomers] = useState<Customer[]>(customersData.customers);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Customer type counts for summary cards
  const corporateCount = customers.filter(c => c.type === 'Corporate').length;
  const smbCount = customers.filter(c => c.type === 'SMB').length;
  const individualCount = customers.filter(c => c.type === 'Individual').length;

  return (
    <MainLayout title="Customers">
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
                    <PersonIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  {customers.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Corporate
                  </Typography>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                    <BusinessIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  {corporateCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    SMB
                  </Typography>
                  <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
                    <BusinessIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  {smbCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Individual
                  </Typography>
                  <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                    <PersonIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  {individualCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              Customer List
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              component={Link}
              href="/customers/new"
            >
              Add Customer
            </Button>
          </Box>
          
          <Box sx={{ px: 2, pb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search customers by name, company, or email"
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
                  <TableCell>Company</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Account Manager</TableCell>
                  <TableCell>Last Contact</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => (
                    <TableRow
                      hover
                      key={customer.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {customer.name}
                      </TableCell>
                      <TableCell>{customer.company}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Chip 
                          label={customer.type} 
                          size="small"
                          color={
                            customer.type === 'Corporate' ? 'secondary' : 
                            customer.type === 'SMB' ? 'info' : 'success'
                          }
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={customer.status} 
                          size="small"
                          color={customer.status === 'Active' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>{customer.accountManager}</TableCell>
                      <TableCell>{customer.lastContact}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton 
                            size="small"
                            component={Link}
                            href={`/customers/${customer.id}`}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small"
                            component={Link}
                            href={`/customers/${customer.id}/edit`}
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
            count={filteredCustomers.length}
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