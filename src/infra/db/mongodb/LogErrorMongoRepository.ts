import { ILogErrorRepository } from '@data/interfaces/db';
import { MongoHelper } from './helpers';

export class LogErrorMongoRepository implements ILogErrorRepository {
  public async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
