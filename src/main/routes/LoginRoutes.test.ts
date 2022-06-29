import request from 'supertest';
import { MongoHelper } from '@infra/db/mongodb/helpers/MongoHelper';

import app from '@main/config/app';

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollections = await MongoHelper.getCollection('accounts');
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
});
