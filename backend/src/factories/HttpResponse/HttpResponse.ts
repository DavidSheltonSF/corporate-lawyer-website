import { HttpCode } from './HttpCode';

export interface HttpResponse {
  data?: any;
  message?: string;
  code: HttpCode;
}
