import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardHeader, 
  CardContent, 
  Grid, 
  InputAdornment,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link as MuiLink,
  List,
  ListItem,
  Divider,
  ButtonGroup
} from '@mui/material';
import { 
  Search as SearchIcon,
  Upload as UploadIcon,
  CreateNewFolder as CreateNewFolderIcon,
  Folder as FolderIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  TableChart as ExcelIcon,
  Image as ImageIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Description
} from '@mui/icons-material';
import MainLayout from '@/components/layout/MainLayout';
import documentsData from '@/data/mock/documents.json';
import { DocumentsData, Folder, File, Breadcrumb } from '@/types';
import Link from 'next/link';

const DocumentsPage = () => {
  const [data] = useState<DocumentsData>(documentsData as unknown as DocumentsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date Modified');
  const [uploadAnchorEl, setUploadAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUploadAnchorEl(event.currentTarget);
  };

  const handleUploadClose = () => {
    setUploadAnchorEl(null);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option?: string) => {
    if (option) {
      setSortBy(option);
    }
    setSortAnchorEl(null);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <PdfIcon />;
      case 'docx':
        return <DocIcon />;
      case 'xlsx':
        return <ExcelIcon />;
      case 'image':
        return <ImageIcon />;
      default:
        return <Description />;
    }
  };

  const getFileIconClass = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return { bgcolor: '#feecec', color: '#e53935' };
      case 'docx':
        return { bgcolor: '#e3f2fd', color: '#1976d2' };
      case 'xlsx':
        return { bgcolor: '#e8f5e9', color: '#2e7d32' };
      case 'image':
        return { bgcolor: '#f3e5f5', color: '#8e24aa' };
      default:
        return { bgcolor: '#f5f5f5', color: '#757575' };
    }
  };

  return (
    <MainLayout title="Documents">
      <Box sx={{ mb: 4 }}>
        {/* Header with search and actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Documents</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ 
                mr: 2,
                width: 250,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={handleUploadClick}
              sx={{ mr: 2 }}
            >
              Upload
            </Button>
            <Menu
              anchorEl={uploadAnchorEl}
              open={Boolean(uploadAnchorEl)}
              onClose={handleUploadClose}
            >
              <MenuItem onClick={handleUploadClose}>File</MenuItem>
              <MenuItem onClick={handleUploadClose}>Folder</MenuItem>
            </Menu>
            <Button
              variant="contained"
              startIcon={<CreateNewFolderIcon />}
            >
              New Folder
            </Button>
          </Box>
        </Box>

        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          {data.breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === data.breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={breadcrumb.id} color="text.primary">
                {breadcrumb.name}
              </Typography>
            ) : (
              <Link key={breadcrumb.id} href={breadcrumb.path} passHref>
                <MuiLink underline="hover" color="inherit">
                  {breadcrumb.name}
                </MuiLink>
              </Link>
            );
          })}
        </Breadcrumbs>

        {/* Folders Grid */}
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Folders" />
          <CardContent>
            <Grid container spacing={3}>
              {data.folders.map((folder) => (
                <Grid item xs={12} sm={6} md={3} key={folder.id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                      <FolderIcon 
                        sx={{ 
                          fontSize: 48, 
                          color: 'warning.main', 
                          mb: 2 
                        }} 
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500, textAlign: 'center' }}>
                        {folder.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {folder.fileCount} files
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Files List */}
        <Card>
          <CardHeader 
            title="Files" 
            action={
              <Button
                variant="outlined"
                size="small"
                endIcon={<ArrowDropDownIcon />}
                onClick={handleSortClick}
              >
                Sort by: {sortBy}
              </Button>
            }
          />
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={() => handleSortClose()}
          >
            <MenuItem onClick={() => handleSortClose('Date Modified')}>Date Modified</MenuItem>
            <MenuItem onClick={() => handleSortClose('Name')}>Name</MenuItem>
            <MenuItem onClick={() => handleSortClose('Size')}>Size</MenuItem>
            <MenuItem onClick={() => handleSortClose('Type')}>Type</MenuItem>
          </Menu>
          <Divider />
          <List disablePadding>
            {data.files.map((file) => (
              <ListItem 
                key={file.id}
                sx={{ 
                  py: 1.5, 
                  px: 3,
                  borderLeft: '4px solid transparent',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderLeftColor: 'primary.main',
                    bgcolor: 'action.hover'
                  },
                  '&:hover .document-actions': {
                    visibility: 'visible'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box 
                    sx={{ 
                      ...getFileIconClass(file.type),
                      width: 40, 
                      height: 40, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      borderRadius: 1,
                      mr: 2
                    }}
                  >
                    {getFileIcon(file.type)}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Modified: {file.modified} • {file.size}
                    </Typography>
                  </Box>
                  <Box 
                    className="document-actions" 
                    sx={{ 
                      display: 'flex', 
                      visibility: 'hidden'
                    }}
                  >
                    <IconButton size="small" sx={{ mx: 0.5 }}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ mx: 0.5 }}>
                      <ShareIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ mx: 0.5 }}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default DocumentsPage; 