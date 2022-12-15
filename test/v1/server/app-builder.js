const request = require('supertest');
const Logger = require('../../../v1/src/logger');

const serverAppBuilder = require('../../../v1/src/server/app-builder');

describe('serverAppBuilder', () => {
  it('builds a working serverApp', async () => {
    Logger.supressOutput = true;
    const app = serverAppBuilder();

    app.serverApp.get('/test', (req, res) => res.status(302).end());

    await request(app.serverApp).get('/test').expect(302);
  });
});
