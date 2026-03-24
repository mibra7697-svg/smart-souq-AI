/**
 * Pagination utility functions
 * Provides standardized pagination for API responses
 */

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

/**
 * Parse pagination parameters from request query
 */
export function parsePaginationParams(query: any): PaginationParams {
  const page = Math.max(1, parseInt(query.page as string) || DEFAULT_PAGE);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(query.limit as string) || DEFAULT_LIMIT)
  );
  
  return { page, limit };
}

/**
 * Calculate pagination metadata
 */
export function calculatePagination(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}

/**
 * Create paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  totalItems: number,
  paginationParams: PaginationParams
): PaginatedResponse<T> {
  const pagination = calculatePagination(
    totalItems,
    paginationParams.page,
    paginationParams.limit
  );

  return {
    data,
    pagination
  };
}