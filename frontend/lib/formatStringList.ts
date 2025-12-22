export function formatStringList(list: string[]): string | null {
  if (list.length === 0 || list.join('').trim().length === 0) {
    return null;
  }

  let formatedString = '';
  let separator = '';

  for (let i = 0; i < list.length; i++) {
    if (i === list.length - 1) {
      separator = ' e ';
    }

    formatedString += separator + list[i];

    separator = ', ';
  }
  return formatedString;
}
