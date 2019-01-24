const { MongoClient } = require('mongodb');
const assert = require('assert');

const environment = process.env.NODE_ENV || 'development';

const DATABASE_NAME = `roses_${environment}`;
const DATABASE_URL = 'mongodb://localhost:27017';

const close = async (client) => {
  await client.close();

  return true;
};

const connect = () => (
  new Promise(resolve => (
    MongoClient.connect(
      DATABASE_URL,
      { useNewUrlParser: true },
      (err, client) => {
        assert.equal(null, err);

        resolve(client);
      },
    )
  ))
);

const connection = async (fn) => {
  const client = await connect();
  const db = client.db(DATABASE_NAME);
  const result = await fn(db);

  await client.close(environment === 'test');

  return result;
};

module.exports = {
  DATABASE_NAME,
  close,
  connect,
  connection,
};
