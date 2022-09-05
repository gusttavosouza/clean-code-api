import { MongoHelper } from './MongoHelper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let accountsCollection = await MongoHelper.getCollection('accounts');
    expect(accountsCollection).toBeTruthy();
    await MongoHelper.disconnect();
    accountsCollection = await MongoHelper.getCollection('accounts');
    expect(accountsCollection).toBeTruthy();
  });
});
