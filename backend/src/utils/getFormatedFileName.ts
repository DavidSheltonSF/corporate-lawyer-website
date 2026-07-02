import path from 'path';
export function getFormatedFileName(originalName: string): string {
  const fixedName = Buffer.from(originalName, 'utf-8').toString();
  return path.parse(fixedName).name;
}
