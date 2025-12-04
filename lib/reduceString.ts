export function reduceString(str: string, limit: number): string {
  return str.slice(0, limit) + '...';
}
