import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  it('should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Teste',
      description: 'De 0 a 10, qual nota você dá pra esse teste?',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to get all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'Exemplo 2',
      description: 'Exemplo 2 aqui novamente',
    });

    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(2);
  });
});
