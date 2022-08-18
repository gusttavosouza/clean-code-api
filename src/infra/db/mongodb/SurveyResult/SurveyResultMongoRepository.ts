import { ISaveSurveyResultRepository } from '@data/interfaces/db/SurveyResult/ISaveSurveyResultRepository';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { SaveSurveyResultModel } from '@domain/usecases/SurveyResult/SaveSurveyResult';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  public async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults');
    const surveyResults = await surveyResultsCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    return surveyResults.value && MongoHelper.mapper(surveyResults.value);
  }

}