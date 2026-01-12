import { HttpCode } from '../../types/HttpCode';

export interface HttpResponse {
  data?: any;
  message?: string;
  code: HttpCode;
}
