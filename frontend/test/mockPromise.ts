export async function mockPromise(seconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
