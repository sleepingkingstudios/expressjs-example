const { DATABASE_NAME, connect } = require('./index');

const clearSeeds = async (collectionName) => {
  const client = await connect();
  const db = client.db(DATABASE_NAME);
  const collection = db.collection(collectionName);

  await collection.deleteMany();

  await client.close(true);
};

const seed = async (collectionName, data) => {
  const client = await connect();
  const db = client.db(DATABASE_NAME);
  const collection = db.collection(collectionName);

  await collection.insertMany(data);

  await client.close(true);
};

module.exports = {
  clearSeeds,
  seed,
};
