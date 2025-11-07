import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField, Grid } from '@mui/material';
import DataTable from '../../components/table/DataTable';
import { generatePaginationParams, parsePaginationResponse } from '../../utils/paginationUtils';

const mockUserData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-02-20' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive', joinDate: '2024-01-10' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', status: 'Active', joinDate: '2024-03-05' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Viewer', status: 'Active', joinDate: '2024-02-28' },
  { id: 6, name: 'Emma Davis', email: 'emma@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-20' },
  { id: 7, name: 'Alex Rodriguez', email: 'alex@example.com', role: 'Editor', status: 'Active', joinDate: '2024-03-15' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'User', status: 'Inactive', joinDate: '2024-02-10' },
  { id: 9, name: 'David Miller', email: 'david@example.com', role: 'Viewer', status: 'Active', joinDate: '2024-03-20' },
  { id: 10, name: 'Grace Lee', email: 'grace@example.com', role: 'User', status: 'Active', joinDate: '2024-01-30' },
  { id: 11, name: 'Chris Martin', email: 'chris@example.com', role: 'Editor', status: 'Active', joinDate: '2024-03-25' },
  { id: 12, name: 'Sophie Taylor', email: 'sophie@example.com', role: 'Admin', status: 'Active', joinDate: '2024-02-15' },
  { id: 13, name: 'Oliver Wilson', email: 'oliver@example.com', role: 'User', status: 'Inactive', joinDate: '2024-01-25' },
  { id: 14, name: 'Ava Thomas', email: 'ava@example.com', role: 'Viewer', status: 'Active', joinDate: '2024-03-10' },
  { id: 15, name: 'Ethan Jackson', email: 'ethan@example.com', role: 'Editor', status: 'Active', joinDate: '2024-02-05' },
  { id: 16, name: 'Mia White', email: 'mia@example.com', role: 'User', status: 'Active', joinDate: '2024-03-01' },
  { id: 17, name: 'Lucas Harris', email: 'lucas@example.com', role: 'Admin', status: 'Active', joinDate: '2024-02-20' },
  { id: 18, name: 'Olivia Martin', email: 'olivia@example.com', role: 'Editor', status: 'Inactive', joinDate: '2024-01-15' },
  { id: 19, name: 'Noah Thompson', email: 'noah@example.com', role: 'User', status: 'Active', joinDate: '2024-03-12' },
  { id: 20, name: 'Isabella Garcia', email: 'isabella@example.com', role: 'Viewer', status: 'Active', joinDate: '2024-02-25' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'error';
    default:
      return 'default';
  }
};

const TableExample = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchTableData();
  }, [page, limit, searchQuery, sortBy, sortOrder]);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const params = generatePaginationParams(page, limit);
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredData = mockUserData;

      if (searchQuery) {
        filteredData = filteredData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      filteredData.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === 'string') {
          return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });

      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const paginatedData = filteredData.slice(startIdx, endIdx);

      const response = parsePaginationResponse(
        {
          items: paginatedData,
          total: filteredData.length,
        },
        page,
        limit
      );

      setData(response.items);
      setPaginationInfo({
        total: response.total,
        pages: response.totalPages,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSort = (columnKey, order) => {
    setSortBy(columnKey);
    setSortOrder(order);
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: 60,
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      minWidth: 150,
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      minWidth: 180,
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      minWidth: 120,
      sortable: true,
      render: (value) => (
        <Box
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            backgroundColor: 'primary.lighter',
            color: 'primary.main',
            borderRadius: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          {value}
        </Box>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      minWidth: 110,
      sortable: true,
      render: (value) => (
        <Box
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            backgroundColor:
              value === 'Active'
                ? 'success.lighter'
                : value === 'Inactive'
                  ? 'error.lighter'
                  : 'action.hover',
            color:
              value === 'Active'
                ? 'success.main'
                : value === 'Inactive'
                  ? 'error.main'
                  : 'text.primary',
            borderRadius: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          {value}
        </Box>
      ),
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      minWidth: 120,
      sortable: true,
    },
  ];

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>
        Users Table with Pagination
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Standard table implementation with sorting, pagination, and search
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={handleSearch}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchQuery('');
                  setPage(1);
                  setSortBy('id');
                  setSortOrder('asc');
                }}
              >
                Reset Filters
              </Button>
            </Box>
          </Grid>
        </Grid>

        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          totalItems={paginationInfo.total}
          page={page}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
          pageSizeOptions={[5, 10, 25, 50]}
          noDataMessage="No users found"
          striped={true}
          hover={true}
        />
      </Paper>

      <Paper sx={{ p: 2, backgroundColor: 'info.lighter' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          API Parameters Being Sent:
        </Typography>
        <Box
          component="pre"
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}
        >
          {JSON.stringify(
            {
              page,
              limit,
              offset: (page - 1) * limit,
              searchQuery: searchQuery || undefined,
              sortBy,
              sortOrder,
            },
            null,
            2
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TableExample;
