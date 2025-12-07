// API Response Types

export interface LoginResponse {
  access_token: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

