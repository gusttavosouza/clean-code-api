import { IAddSurveyModel } from '@domain/usecases/AddSurvey';
import { IAddSurveyRepository } from '@data/interfaces/db/Survey/IAddSurveyRepository';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyMongoRepository implements IAddSurveyRepository {
  public async add(surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollections = await MongoHelper.getCollection('surveys');
    await surveyCollections.insertOne(surveyData);
  }
}
