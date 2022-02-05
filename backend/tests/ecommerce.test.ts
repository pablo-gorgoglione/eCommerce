import supertest from 'supertest';
import { app } from '../app';

export const api = supertest(app);

test('product are returned as json', async () => {
  await api
    .get('/api/products')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
