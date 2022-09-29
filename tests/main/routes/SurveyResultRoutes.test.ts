import request from 'supertest';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';

import { MongoHelper } from '@infra/db/mongodb/helpers';
import app from '@main/config/app';
import env from '@main/config/env';

let surveyCollections: Collection;
let accountCollections: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollections.insertOne({
    name: 'Gustavo',
    email: 'gustavo@gmail.com',
    password: '123456',
    role: 'admin',
  });

  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);

  await accountCollections.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        accessToken,
      },
    },
  );
  return accessToken;
};

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollections = await MongoHelper.getCollection('surveys');
    await surveyCollections.deleteMany({});
    accountCollections = await MongoHelper.getCollection('accounts');
    await surveyCollections.deleteMany({});
  });

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    test('Should return 200 on save survey result with accessToken', async () => {
      const res = await surveyCollections.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
          {
            answer: 'other_answer',
          },
        ],
        date: new Date(),
      });

      const accessToken = await makeAccessToken();
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer',
        })
        .expect(200);
    });
  });
});

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollections = await MongoHelper.getCollection('surveys');
    await surveyCollections.deleteMany({});
    accountCollections = await MongoHelper.getCollection('accounts');
    await surveyCollections.deleteMany({});
  });

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403);
    });
  });

  test('Should return 200 on load survey result with accessToken', async () => {
    const res = await surveyCollections.insertOne({
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
        {
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    });

    const accessToken = await makeAccessToken();
    await request(app)
      .get(`/api/surveys/${res.ops[0]._id}/results`)
      .set('x-access-token', accessToken)
      .expect(200);
  });
});
