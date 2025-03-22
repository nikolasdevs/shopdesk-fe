export interface PaginatedResponse<T> {
  page: number;
  size: number;
  total: number;
  debug: null;
  previous_page: number | null;
  next_page: number | null;
  items: T[];
}
export interface PaginatedRequest {
  page: number;
}

export interface APIResponse<T> {
  status: string;
  status_code: number;
  message: string;
  data: T;
}
