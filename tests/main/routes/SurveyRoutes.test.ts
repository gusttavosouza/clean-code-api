import request from 'supertest';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';

import { MongoHelper } from '@infra/db/mongodb/helpers/MongoHelper';
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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(403);
    });

    test('Should return 204 if valid token', async () => {
      const accessToken = await makeAccessToken();

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load survey without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403);
    });

    test('Should return 200 on load valid accessToken', async () => {
      await surveyCollections.insertMany([
        {
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
        },
        {
          question: 'other_question',
          answers: [
            {
              image: 'other_image',
              answer: 'other_answer',
            },
            {
              answer: 'other_answer',
            },
          ],
          date: new Date(),
        },
      ]);

      const accessToken = await makeAccessToken();

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
