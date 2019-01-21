const { MongoClient } = require('mongodb');
const { close, connect, DATABASE_NAME } = require('./mongo');

describe('DATABASE_NAME', () => {
  it('should be == "roses"', () => {
    expect(DATABASE_NAME).toEqual('roses');
  });
});

describe('connect()', () => {
  it('should return a mongo client', async () => {
    const client = await connect();

    expect(client).toEqual(expect.any(MongoClient));

    await client.close();
  });
});

describe('close()', () => {
  it('should close the client', async () => {
    const client = { close: jest.fn() };

    await close(client);

    expect(client.close).toHaveBeenCalled();
  });

  it('should return true', async () => {
    const client = { close: () => {} };
    const value = await close(client);

    expect(value).toBe(true);
  });
});
