export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_PAGE_SIZES = [5, 10, 25, 50, 100];

export const calculateTotalPages = (totalItems, limit) => {
  return Math.ceil(totalItems / limit);
};

export const calculateSkipRows = (page, limit) => {
  return (page - 1) * limit;
};

export const validatePaginationParams = (page, limit) => {
  const validPage = Math.max(1, parseInt(page) || DEFAULT_PAGE);
  const validLimit = Math.max(1, parseInt(limit) || DEFAULT_LIMIT);
  return { page: validPage, limit: validLimit };
};

export const generatePaginationParams = (page, limit) => {
  const { page: validPage, limit: validLimit } = validatePaginationParams(page, limit);
  return {
    offset: calculateSkipRows(validPage, validLimit),
    limit: validLimit,
    page: validPage,
  };
};

export const getPaginationRange = (currentPage, totalPages, pageRangeDisplayed = 5) => {
  let startPage = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2));
  let endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

  if (endPage - startPage < pageRangeDisplayed - 1) {
    startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return {
    pages,
    showFirstPage: startPage > 1,
    showLastPage: endPage < totalPages,
    startPage,
    endPage,
  };
};

export const buildPaginationQuery = (page, limit, filters = {}) => {
  const { page: validPage, limit: validLimit } = validatePaginationParams(page, limit);
  return {
    ...filters,
    offset: calculateSkipRows(validPage, validLimit),
    limit: validLimit,
  };
};

export const parsePaginationResponse = (data, page, limit) => {
  return {
    items: data.items || [],
    total: data.total || 0,
    page,
    limit,
    totalPages: calculateTotalPages(data.total || 0, limit),
    hasNextPage: page < calculateTotalPages(data.total || 0, limit),
    hasPreviousPage: page > 1,
  };
};
