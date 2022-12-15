const { assert } = require('chai');
const request = require('supertest');
const server = require('express');
const sinon = require('sinon');

const UserAuthenticatedHandler = require('../../../v1/src/server/user-authenticated-handler');
const httpStatus = require('../../../v1/src/server/http-status-enum');
const adapt = require('../../../v1/src/server/handler-to-function-adapter');
const jwtGenerator = require('../../helpers/jwt-generator');
const { factory, FakeCommand } = require('../../../index').Tests.helpers;
const authorizationTokenData = require('../../helpers/authentication-token-data');
const { appTokenAttribute } = require('../../../v1/src/config');

describe('UserAuthenticatedHandler', () => {
  describe('enrich command input', () => {
    it('should add authorization token data when token is valid', async () => {
      // given
      const app = server();
      const fakeCommand = new FakeCommand('success');

      const spy = sinon.spy();

      fakeCommand.execute = (data) => {
        spy(data);
        fakeCommand.emit('success');
      };

      app.get('/hello', adapt(UserAuthenticatedHandler, factory(fakeCommand)));
      // when
      const authorizationJwt = jwtGenerator
        .generate(authorizationTokenData, process.env.JWT_SECRET_KEY);
      const expectedTokenData = {
        authenticationData: {
          authorizationInfo: authorizationTokenData,
          userInfo: authorizationTokenData,
        },
        headers: {
          authorization: authorizationJwt,
          xAppToken: authorizationJwt,
        },
      };
      const response = await request(app).get('/hello')
        .set('authorization', authorizationJwt)
        .set(appTokenAttribute, authorizationJwt);

      // then
      assert.equal(httpStatus.ok, response.statusCode);
      sinon.assert.calledWith(spy, expectedTokenData);
    });
  });
  describe('should return 200', () => {
    it('when request has valid authorization', async () => {
      // given
      const app = server();

      app.get('/hello', adapt(UserAuthenticatedHandler, factory(new FakeCommand('success'))));
      // when
      const authorizationJwt = jwtGenerator
        .generate(authorizationTokenData, process.env.JWT_SECRET_KEY);
      const response = await request(app).get('/hello')
        .set('authorization', authorizationJwt)
        .set(appTokenAttribute, authorizationJwt);

      // then
      assert.equal(httpStatus.ok, response.statusCode);
    });
  });
  describe('should return 401', () => {
    it('when request has not app token', async () => {
      // given
      const app = server();

      app.get('/hello', adapt(UserAuthenticatedHandler, factory(new FakeCommand('success'))));
      // when
      const authorizationJwt = jwtGenerator
        .generate(authorizationTokenData, process.env.JWT_SECRET_KEY);
      const response = await request(app).get('/hello')
        .set('authorization', authorizationJwt);

      // then
      assert.equal(response.statusCode, httpStatus.unauthorized);
    });

    it('when app token is invalid', async () => {
      // given
      const app = server();

      app.get('/hello', adapt(UserAuthenticatedHandler, factory(new FakeCommand('success'))));
      // when
      const authorizationJwt = jwtGenerator
        .generate(authorizationTokenData, `${process.env.JWT_SECRET_KEY}Z`);
      const response = await request(app).get('/hello')
        .set('authorization', authorizationJwt);

      // then
      assert.equal(response.statusCode, httpStatus.unauthorized);
    });
  });
});
