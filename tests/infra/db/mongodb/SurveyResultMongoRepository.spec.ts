import { Collection, ObjectId } from 'mongodb';
import { AccountModel } from '@domain/models/Account';
import { SurveyModel } from '@domain/models/Survey';
import { MongoHelper } from '@infra/db/mongodb/helpers/MongoHelper';
import { SurveyResultMongoRepository } from '@infra/db/mongodb/SurveyResultMongoRepository';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository();
};

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer_1',
      },
      {
        answer: 'other_answer_2',
      },
      {
        answer: 'other_answer_3',
      },
    ],
    date: new Date(),
  });
  return MongoHelper.mapper(res.ops[0]);
};

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_name',
    password: 'any_password',
  });

  return MongoHelper.mapper(res.ops[0]);
};

describe('save()', () => {
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

  describe('Save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();

      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: survey.id,
        accountId: account.id,
      });

      expect(surveyResult).toBeTruthy();
    });

    test('Should add a survey result if its not new', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();
      await surveyResultCollection.insertOne({
        surveyId: ObjectId(survey.id),
        accountId: ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date(),
      });

      const surveyResult = await surveyResultCollection
        .find({
          surveyId: survey.id,
          accountId: account.id,
        })
        .toArray();

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.length).toBe(1);
    });
  });

  describe('loadBySurveyId()', () => {
    test('Should add a survey result if its not new 1', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();
      await surveyResultCollection.insertMany([
        {
          surveyId: ObjectId(survey.id),
          accountId: ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: ObjectId(survey.id),
          accountId: ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: ObjectId(survey.id),
          accountId: ObjectId(account.id),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
        {
          surveyId: ObjectId(survey.id),
          accountId: ObjectId(account.id),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
      ]);

      const surveyResult = await sut.loadBySurveyId(survey.id, account.id);
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toBe(survey.id.toString());
      expect(surveyResult.answers[0].count).toBe(2);
      expect(surveyResult.answers[0].percent).toBe(50);
      expect(surveyResult.answers[1].count).toBe(2);
      expect(surveyResult.answers[1].percent).toBe(50);
      expect(surveyResult.answers[2].count).toBe(0);
      expect(surveyResult.answers[2].percent).toBe(0);
    });

    test('Should return null if there is no survey result', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id);
      expect(surveyResult).toBeNull();
    });
  });
});
