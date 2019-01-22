const { MongoClient } = require('mongodb');
const assert = require('assert');

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'roses';

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

module.exports = {
  DATABASE_NAME,
  close,
  connect,
};
