import { beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../src/index';

let server: any;

beforeAll(async () => {
  // Start the server for testing
  server = app.listen(0); // Use random port for testing
});

afterAll(async () => {
  // Close the server after tests
  if (server) {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  }
});

// Export app for use in tests
export { app, request };
