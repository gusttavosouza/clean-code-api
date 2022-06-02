import { Router, Response } from 'express';

export default (router: Router): void => {
  router.post('/signup', (req: any, res: Response) => {
    res.json({ ok: 'ok' });
  });
};
