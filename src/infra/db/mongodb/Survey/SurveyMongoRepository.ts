import { ObjectId } from 'mongodb';
import { AddSurveyParams } from '@domain/usecases/Survey/AddSurvey';
import { SurveyModel } from '@domain/models/Survey';
import { IAddSurveyRepository } from '@data/interfaces/db/Survey/IAddSurveyRepository';
import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { ILoadSurveyByIdRepository } from '@data/interfaces/db/Survey/ILoadSurveyByIdRepository';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyMongoRepository
  implements
    IAddSurveyRepository,
    ILoadSurveysRepository,
    ILoadSurveyByIdRepository
{
  public async add(surveyData: AddSurveyParams): Promise<void> {
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
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.mapper(survey);
  }
}
