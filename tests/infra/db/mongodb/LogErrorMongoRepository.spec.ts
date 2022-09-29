import { Collection } from 'mongodb';
import { LogErrorMongoRepository } from '@infra/db/mongodb/LogErrorMongoRepository';
import { MongoHelper } from '@infra/db/mongodb/helpers/MongoHelper';

const makeSut = (): LogErrorMongoRepository => {
  return new LogErrorMongoRepository();
};

describe('LogError Repository Mongo', () => {
  let errorCollections: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollections = await MongoHelper.getCollection('errors');
    await errorCollections.deleteMany({});
  });

  it('Should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    const count = await errorCollections.countDocuments();
    expect(count).toBe(1);
  });
});
