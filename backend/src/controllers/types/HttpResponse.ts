export type SuccessResponse<T> = {
  status: number;
  data: T;
};

export type ErrorResponse = {
  status: number;
  message: string;
};

export type EmptyResponse = {
  status: number;
};

export type HttpResponse<T> = SuccessResponse<T> | ErrorResponse | EmptyResponse;
