import { HttpRequest } from '../../controllers/types/HttpRequest';

export function createMockHttpRequest(overrides: HttpRequest = {}): HttpRequest {
  return {
    body: {},
    params: {},
    headers: {},
    query: {},
    file: null,
    ...overrides,
  };
}
