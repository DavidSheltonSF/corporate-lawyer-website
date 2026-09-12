import { describe, expect, it } from 'vitest';
import { MongodbConnector } from './MongodbConnector.js';

describe('Testing MongodbConnector', () => {
  it('should be returned the same MongodbConnector instance', async () => {
    const connection1 = await MongodbConnector.connectAndReturn();
    const connection2 = await MongodbConnector.connectAndReturn();

    // Disconnect both in case of they are different
    connection1.disconnect();
    connection2.disconnect();
    expect(connection1).toBe(connection2);
  });
});
