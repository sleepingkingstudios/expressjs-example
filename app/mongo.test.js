const { MongoClient } = require('mongodb');

const {
  DATABASE_NAME,
  close,
  connect,
} = require('./mongo');

const insertSeeds = async () => {
  const client = await connect();
  const db = client.db('roses_test');
  const collection = db.collection('widgets');

  await collection.insertMany([
    { name: 'widget' },
    { name: 'gadget' },
    { name: 'whatsit' },
  ]);

  await client.close(true);
};

const clearSeeds = async () => {
  const client = await connect();
  const db = client.db('roses_test');
  const collection = db.collection('widgets');

  await collection.deleteMany();

  await client.close(true);
};

describe('DATABASE_NAME', () => {
  it('should be == "roses"', () => {
    expect(DATABASE_NAME).toEqual('roses');
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

describe('connect()', () => {
  const findWidgets = db => (
    new Promise(
      (resolve, reject) => {
        const collection = db.collection('widgets');

        collection
          .find({})
          .toArray((err, data) => (
            err ? reject(err) : resolve(data)
          ));
      },
    )
  );

  it('should return a mongo client', async () => {
    const client = await connect();

    expect(client).toEqual(expect.any(MongoClient));

    await client.close();
  });

  it('find() should return an empty array', async () => {
    const client = await connect();
    const db = client.db('roses_test');
    const widgets = await findWidgets(db);

    expect(widgets).toEqual([]);

    await client.close(true);
  });

  describe('when there are many documents', () => {
    beforeEach(insertSeeds);

    afterEach(clearSeeds);

    it('find() should return the documents', async () => {
      const client = await connect();
      const db = client.db('roses_test');
      const widgets = await findWidgets(db);
      const names = widgets.map(widget => (widget.name));

      expect(names).toEqual(['widget', 'gadget', 'whatsit']);

      await client.close(true);
    });
  });
});
