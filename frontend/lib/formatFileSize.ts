export function formatFileSize(numberInBytes: number): string {
  if (numberInBytes < 1024) {
    return `${numberInBytes} bytes`;
  }

  const numberInKB = numberInBytes / 1024;

  if (numberInKB < 1024) {
    return `${numberInKB.toFixed(2)} KB`;
  }

  const numberInMB = numberInKB / 1024;

  if (numberInMB < 1024) {
    return `${numberInMB.toFixed(2)} MB`;
  }

  const numberInGB = numberInMB / 1024;

  return `${numberInGB.toFixed(2)} GB`;
}
