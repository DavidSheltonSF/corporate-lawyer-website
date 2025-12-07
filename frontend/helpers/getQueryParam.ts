export function getQueryParam(req: Request, key: string): string | null {
  const { searchParams } = new URL(req.url);

  return searchParams.get(key);
}
