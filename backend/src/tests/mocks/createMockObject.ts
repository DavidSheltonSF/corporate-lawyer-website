import { Mocked, vi } from 'vitest';

export function createMockObject<T>(methods: (keyof T)[]) {
  const mock: any = {};

  methods.forEach((method) => {
    mock[method] = vi.fn();
  });

  return mock as Mocked<T>;
}
