import { AccountModel } from '@domain/models/Account';
import { SurveyModel } from '@domain/models/Survey';
import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/MongoHelper';
import { SurveyResultMongoRepository } from './SurveyResultMongoRepository';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
    
  });

  const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository();
  };

  const makeSurvey = async (): Promise<SurveyModel> => {
    const res = await surveyCollection.insertOne({
      question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
        ],
        date: new Date(),
    })
    return MongoHelper.mapper(res.ops[0]);
  }

  const makeAccount = async (): Promise<AccountModel> => {
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_name',
      password: 'any_password',
    })
    
    return MongoHelper.mapper(res.ops[0]);
  }

  describe('Save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();
      const surveyResult = await sut.save({ 
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      });

      console.log(surveyResult);

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe('any_answer');
    });
  });
});
