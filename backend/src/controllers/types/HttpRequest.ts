import { AuthenticatedUser } from "../../types/AuthenticatedUser";

export interface HttpRequest {
  body?: any;
  params?: any;
  headers?: any;
  query?: any;
  file?: Express.Multer.File | null;
  user?: AuthenticatedUser;
}
