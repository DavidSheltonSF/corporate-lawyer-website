import { reduceString } from './reduceString';

describe('Test reduceString', () => {
  test('Should return a reduced string properly', () => {
    const longStr = 'This long string has characteres';
    const limit = 4;
    const reducedStr = reduceString(longStr, limit);
    expect(reducedStr.replace('...', '').length === limit).toBeTruthy();
  });
});
