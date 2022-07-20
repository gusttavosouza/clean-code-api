import { IAddSurveyModel } from '@domain/usecases/AddSurvey';
import { IAddSurveyRepository } from '@data/interfaces/db/Survey/IAddSurveyRepository';
import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { ISurveyModel } from '@domain/models/Survey';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyMongoRepository
  implements IAddSurveyRepository, ILoadSurveysRepository
{
  public async add(surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollections = await MongoHelper.getCollection('surveys');
    await surveyCollections.insertOne(surveyData);
  }

  public async loadAll(): Promise<ISurveyModel[]> {
    const surveyCollections = await MongoHelper.getCollection('surveys');
    const surveys: ISurveyModel[] = await surveyCollections.find({}).toArray();
    return surveys;
  }
}
