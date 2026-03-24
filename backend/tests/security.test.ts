/// <reference types="jest" />
import request from 'supertest';
import app from '../src/index';

describe('Security Middleware Tests', () => {
  it('should have security headers (Helmet)', async () => {
    const res = await request(app).get('/health');
    // Helmet hides X-Powered-By
    expect(res.headers['x-powered-by']).toBeUndefined();
    // Helmet adds Strict-Transport-Security (if configured, but we check basic ones)
    // expect(res.headers['strict-transport-security']).toBeDefined(); 
  });

  it('should have rate limiting headers', async () => {
    const res = await request(app).get('/health');
    // Rate limit headers
    expect(res.headers['ratelimit-limit']).toBeDefined();
    expect(res.headers['ratelimit-remaining']).toBeDefined();
  });

  it('should return 200 for health check', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
