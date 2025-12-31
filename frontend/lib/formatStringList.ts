export function formatStringList(list: string[]): string {
  if (list.join('').trim().length === 0) {
    return '';
  }

  if (list.length === 1) {
    return list[0];
  }

  let formatedString = '';

  for (let i = 0; i < list.length; i++) {
    if (i === list.length - 2) {
      formatedString += `${list[i]} e ${list[i + 1]}`;
      break;
    }

    formatedString += `${list[i]}, `;
  }
  return formatedString;
}
