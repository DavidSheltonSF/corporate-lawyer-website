import { describe, expect, it } from 'vitest';
import { UserRole } from '../../types/UserRole';
import { createMockHttpRequest } from './createMockHttpRequest';

describe('createMockHttpRequest', () => {
  it('returns a request with default structure and merges overrides', () => {
    const user = { id: 'user-id', email: 'user@example.com', role: UserRole.client };

    const request = createMockHttpRequest({ user });

    expect(request).toEqual({
      body: {},
      params: {},
      headers: {},
      query: {},
      file: null,
      user,
    });
  });

  it('allows overriding individual properties', () => {
    const authorization = 'Bearer token';
    const request = createMockHttpRequest({ headers: { authorization } });

    expect(request.headers).toEqual({ authorization});
    expect(request.body).toEqual({});
  });
});
