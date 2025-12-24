import { HttpCode } from '../types/HttpCode';
import { HttpResponse } from '../types/HttpResponse';

export const ok = (data: any): HttpResponse => {
  return {
    data,
    code: HttpCode.ok,
  };
};

export const unauthorized = (message: string) => {
  return {
    message,
    code: HttpCode.unouthorized,
  };
};

export const badRequest = (message: string) => {
  return {
    message,
    code: HttpCode.bad_request,
  };
};

export const notFound = (message: string) => {
  return {
    message,
    code: HttpCode.not_found,
  };
};

export const serverError = (message: string) => {
  return {
    message,
    code: HttpCode.server_error,
  };
};
