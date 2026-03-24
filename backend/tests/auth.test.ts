/// <reference types="jest" />
import { app, request } from './setup';

describe('Authentication API', () => {
  let token: string;

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    
    token = response.body.accessToken;
    expect(token).toBeDefined();
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
  });

  it('should access protected route with valid token', async () => {
    const response = await request(app)
      .get('/api/wallet')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('wallet');
  });

  it('should reject protected route without token', async () => {
    const response = await request(app)
      .get('/api/wallet');

    expect(response.status).toBe(401);
  });
});
