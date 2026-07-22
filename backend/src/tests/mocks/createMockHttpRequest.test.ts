import { createMockHttpRequest } from './createMockHttpRequest';

describe('createMockHttpRequest', () => {
  test('returns a request with default structure and merges overrides', () => {
    const user = { id: 'user-id', email: 'user@example.com' };

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

  test('allows overriding individual properties', () => {
    const request = createMockHttpRequest({ headers: { authorization: 'Bearer token' } });

    expect(request.headers).toEqual({ authorization: 'Bearer token' });
    expect(request.body).toEqual({});
  });
});
