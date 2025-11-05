import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableSortLabel,
  TableFooter,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
  Alert,
  Skeleton,
} from '@mui/material';
import { calculateTotalPages } from '../../utils/paginationUtils';

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  error = null,
  totalItems = 0,
  page = 1,
  limit = 10,
  onPageChange,
  onLimitChange,
  onSort,
  sortBy = null,
  sortOrder = 'asc',
  pageSizeOptions = [5, 10, 25, 50],
  rowsPerPageLabel = 'Rows per page:',
  noDataMessage = 'No data found',
  striped = true,
  hover = true,
  dense = false,
}) => {
  const totalPages = calculateTotalPages(totalItems, limit);

  const handleChangePage = (event, newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeLimit = (event) => {
    const newLimit = event.target.value;
    if (onLimitChange) {
      onLimitChange(newLimit);
    }
  };

  const handleSort = (columnKey) => {
    if (onSort) {
      const newOrder = sortBy === columnKey && sortOrder === 'asc' ? 'desc' : 'asc';
      onSort(columnKey, newOrder);
    }
  };

  const renderCellContent = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    return row[column.key];
  };

  const startRow = (page - 1) * limit + 1;
  const endRow = Math.min(page * limit, totalItems);

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align || 'left'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    width: column.width,
                    minWidth: column.minWidth || 100,
                  }}
                >
                  {column.sortable && onSort ? (
                    <TableSortLabel
                      active={sortBy === column.key}
                      direction={sortBy === column.key ? sortOrder : 'asc'}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: limit }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    {noDataMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  sx={{
                    backgroundColor:
                      striped && rowIndex % 2 === 0 ? 'action.hover' : 'background.paper',
                    '&:hover': hover ? { backgroundColor: 'action.selected' } : {},
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      align={column.align || 'left'}
                      sx={{ color: 'text.primary' }}
                    >
                      {renderCellContent(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                      <InputLabel>{rowsPerPageLabel}</InputLabel>
                      <Select
                        value={limit}
                        onChange={handleChangeLimit}
                        label={rowsPerPageLabel}
                      >
                        {pageSizeOptions.map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography variant="body2" color="text.secondary">
                      {totalItems > 0
                        ? `Showing ${startRow} to ${endRow} of ${totalItems}`
                        : 'No data'}
                    </Typography>
                  </Box>
                  {totalPages > 1 && (
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChangePage}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default DataTable;
