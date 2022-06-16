import ILogErrorRepository from '../../../../data/interfaces/db/ILogErrorRepository';
import { MongoHelper } from '../helpers/MongoHelper';

export class LogErrorMongoRepository implements ILogErrorRepository {
  public async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
