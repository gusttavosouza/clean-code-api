import { MongoHelper } from '@infra/db';
import { ILogErrorRepository } from '@data/protocols/db';

export class LogMongoRepository implements ILogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
