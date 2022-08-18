import { AddSurveyModel } from '@domain/usecases/Survey/AddSurvey';
import { IAddSurveyRepository } from '@data/interfaces/db/Survey/IAddSurveyRepository';
import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { SurveyModel } from '@domain/models/Survey';
import { ILoadSurveyByIdRepository } from '@data/usecases/Survey/LoadSurveyById/DbLoadSurveyByIdProtocols';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyMongoRepository
  implements
    IAddSurveyRepository,
    ILoadSurveysRepository,
    ILoadSurveyByIdRepository
{
  public async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  public async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();
    return MongoHelper.mapperCollection(surveys);
  }

  public async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: id });
    return survey && MongoHelper.mapper(survey);
  }
}
