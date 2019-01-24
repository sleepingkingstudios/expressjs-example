const { MongoClient } = require('mongodb');
const { clearSeeds, seed } = require('./seeds');

const {
  DATABASE_NAME,
  close,
  connect,
  connection,
} = require('./index');

const seedWidgets = async () => {
  await seed('widgets', [
    { name: 'widget' },
    { name: 'gadget' },
    { name: 'whatsit' },
  ]);
};

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

describe('DATABASE_NAME', () => {
  it('should be == "roses_test"', () => {
    expect(DATABASE_NAME).toEqual('roses_test');
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
    beforeEach(seedWidgets);

    afterEach(() => clearSeeds('widgets'));

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

describe('connection()', () => {
  it('should pass a mongo database to the function', async () => {
    const database = await connection(db => db);

    expect(database.databaseName).toEqual(DATABASE_NAME);
  });

  it('find() should return an empty array', async () => {
    const widgets = await connection(findWidgets);

    expect(widgets).toEqual([]);
  });

  describe('when there are many documents', () => {
    beforeEach(seedWidgets);

    afterEach(() => clearSeeds('widgets'));

    it('find() should return the documents', async () => {
      const widgets = await connection(findWidgets);
      const names = widgets.map(widget => (widget.name));

      expect(names).toEqual(['widget', 'gadget', 'whatsit']);
    });
  });
});
