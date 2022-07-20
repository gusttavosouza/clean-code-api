import request from 'supertest';
import { Collection } from 'mongodb';
import { MongoHelper } from '@infra/db/mongodb/helpers/MongoHelper';
import app from '@main/config/app';
import { sign } from 'jsonwebtoken';
import env from '@main/config/env';

let surveyCollections: Collection;
let accountCollections: Collection;

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
});
