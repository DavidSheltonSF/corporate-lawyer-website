export interface AuthTokenResponse {
  token: string | null;
  invalidFields?: Record<'email' | 'password', string | null>;
}
