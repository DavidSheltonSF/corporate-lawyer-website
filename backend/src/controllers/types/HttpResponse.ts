type SuccessResponse<T> = {
  status: number;
  data: T;
};

type ErrorResponse = {
  status: number;
  message: string;
};

type EmptyResponse = {
  status: Number;
};

export type HttpResponse<T> = SuccessResponse<T> | ErrorResponse | EmptyResponse;
