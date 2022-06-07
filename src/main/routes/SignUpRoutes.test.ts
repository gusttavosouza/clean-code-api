import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper';

import app from '../config/app';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollections = MongoHelper.getCollection('accounts');
    await accountCollections.deleteMany({});
  });

  test('Should return an account on success', async () => {
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
