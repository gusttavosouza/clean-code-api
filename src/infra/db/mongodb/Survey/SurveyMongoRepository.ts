import { AddSurveyModel } from '@domain/usecases/AddSurvey';
import { IAddSurveyRepository } from '@data/interfaces/db/Survey/IAddSurveyRepository';
import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { SurveyModel } from '@domain/models/Survey';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyMongoRepository
  implements IAddSurveyRepository, ILoadSurveysRepository
{
  public async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollections = await MongoHelper.getCollection('surveys');
    await surveyCollections.insertOne(surveyData);
  }

  public async loadAll(): Promise<SurveyModel[]> {
    const surveyCollections = await MongoHelper.getCollection('surveys');
    const surveys: SurveyModel[] = await surveyCollections.find({}).toArray();
    return surveys;
  }
}
