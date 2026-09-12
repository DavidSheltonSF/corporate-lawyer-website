import { HttpRequest } from '../../controllers/types/HttpRequest.js';

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
