import { PostgresConnector } from './PostgreConnector';
jest.setTimeout(99999);

describe('Testing MongodbConnector', () => {
  test('should be returned the same MongodbConnector instance', async () => {
    const connection1 = PostgresConnector.getInstance();
    const connection2 = PostgresConnector.getInstance();
    expect(connection1).toBe(connection2);
  });

  test('should connect to the database', async () => {
    let errorHasBeenThrown = false;
    try {
      const connection = PostgresConnector.getInstance();
      await connection.connect();
      await connection.disconnect();
    } catch (error) {
      console.log(error);
      errorHasBeenThrown = true;
    }
    expect(errorHasBeenThrown).toBeFalsy();
  });
});
