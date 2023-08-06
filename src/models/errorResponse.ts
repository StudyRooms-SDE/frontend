export interface Error {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface ErrorResponse {
  data: Error;
}
