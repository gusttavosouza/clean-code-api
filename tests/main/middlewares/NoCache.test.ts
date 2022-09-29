import request from 'supertest';
import { NoCache } from '@main/middlewares/NoCache';

import app from '@main/config/app';

describe('NoCache Middleware', () => {
  test('Should disable caching', async () => {
    app.get('/test_no_cache', NoCache, (req, res) => {
      res.send();
    });

    await request(app)
      .get('/test_no_cache')
      .expect(
        'cache-control',
        'no-store, no-cache, must-revalidate, proxy-revalidate',
      )
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store');
  });
});
