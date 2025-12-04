import { reduceString } from './reduceString';

describe('Test reduceString', () => {
  test('Should return a reduced string properly', () => {
    const longStr = 'This long string has characteres';
    const limit = 4;
    const reducedStr = reduceString(longStr, limit);
    expect(reducedStr.replace('...', '').length === limit).toBeTruthy();
  });
  test('Should not modify strings that do not overflow the limit', () => {
    const str = 'Abcd'
    const reducedStr = reduceString(str, 4);
    expect(reducedStr === str).toBeTruthy()
  })
});
