import request from 'supertest';
import { Collection } from 'mongodb';

import { MongoHelper } from '@infra/db/mongodb/helpers/MongoHelper';
import app from '@main/config/app';
import { hash } from 'bcrypt';

let accountCollections: Collection;
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollections = await MongoHelper.getCollection('accounts');
    await accountCollections.deleteMany({});
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Gustavo',
          email: 'gustavorobertotb@outlook.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12);
      await accountCollections.insertOne({
        name: 'Gustavo',
        email: 'gustavorobertotb@outlook.com',
        password,
      });

      await request(app)
        .post('/api/login')
        .send({
          email: 'gustavorobertotb@outlook.com',
          password: '123',
        })
        .expect(200);
    });
  });
});
