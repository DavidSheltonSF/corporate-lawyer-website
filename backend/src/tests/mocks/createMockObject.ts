export function createMockObject<T>(methods: (keyof T)[]) {
  const mock: any = {};
  methods.forEach((method) => {
    mock[method] = jest.fn();
  });

  return mock as jest.Mocked<T>;
}
