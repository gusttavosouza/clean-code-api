import { ObjectId } from 'mongodb';
import { AddSurveyParams } from '@domain/usecases/AddSurvey';
import { SurveyModel } from '@domain/models/Survey';
import {
  IAddSurveyRepository,
  ILoadSurveysRepository,
  ILoadSurveyByIdRepository,
} from '@data/interfaces/db';
import { MongoHelper, QueryBuilder } from './helpers';

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

  public async loadAll(accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        isAnswered: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();

    const surveys = await surveyCollection.aggregate(query).toArray();
    return MongoHelper.mapperCollection(surveys);
  }

  public async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.mapper(survey);
  }
}
