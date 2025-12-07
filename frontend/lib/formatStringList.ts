export function formatStringList(list: string[]): string {
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
