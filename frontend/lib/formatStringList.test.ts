import { formatStringList } from './formatStringList';

describe('Test formatStringList', () => {
  test('should return a formated string list with one value', () => {
    const list = ['banana'];
    const listStr = formatStringList(list);

    expect(listStr).toBe(list[0]);
  });

  test('should return a formated string list with two values', () => {
    const list = ['banana', 'laranja'];
    const listStr = formatStringList(list);

    expect(listStr).toBe('banana e laranja');
  });

  test('should return a formated string list with more than two values', () => {
    const list = ['banana', 'laranja', 'abacaxi'];
    const listStr = formatStringList(list);

    expect(listStr).toBe('banana, laranja e abacaxi');
  });

  test('should return an empty string if the list provided contains only empty strings', () => {
    const list = ['', '    '];
    const listStr = formatStringList(list);

    expect(listStr).toBe('');
  });

  test('should return an empty string if the list provided is empty', () => {
    const list: any = [];
    const listStr = formatStringList(list);

    expect(listStr).toBe('');
  });
});
