export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
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
