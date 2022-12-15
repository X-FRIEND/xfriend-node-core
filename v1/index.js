const Logger = require('./src/logger');
const AppSettings = require('./src/app-settings');
const BaseCommand = require('./src/commands/base-command');
const baseEvents = require('./src/base-events');
const { BucketFactory, PROVIDERS } = require('./src/utils/bucket');
const serverAdapter = require('./src/server/handler-to-function-adapter');
const serverAppBuilder = require('./src/server/app-builder');
const serverAuthenticatedHandler = require('./src/server/authenticated-handler');
const serverCorsMiddleware = require('./src/server/cors-middleware');
const serverHandler = require('./src/server/handler');
const serverLoggingMiddleware = require('./src/server/logging-middleware');
const serverUserAuthenticatedHandler = require('./src/server/user-authenticated-handler');
const lambdaAdapter = require('./src/message-queue/lambda-handler-adapter');
const LambdaHandler = require('./src/message-queue/lambda-handler');
const mochaHelpers = require('./src/tests/mocha-helpers');
const Module = require('./src/module');
const NodeInspector = require('./src/development/node-inspector');
const Security = require('./src/security');
const testsHelpers = require('./src/tests/helpers');
const TypeOrmConfigFactory = require('./src/orm/typeorm/typeorm-config-factory');
const typeOrmLogger = require('./src/orm/typeorm/logger');
const ArrayUtils = require('./src/utils/array');
const CorrelationIdHandler = require('./src/utils/correlation-id-handler');

module.exports = {
  App: {
    baseEvents,
    Command: BaseCommand,
    Logger,
    Security,
    Settings: AppSettings,
  },
  Server: {
    adapter: serverAdapter,
    appBuilder: serverAppBuilder,
    AuthenticatedHandler: serverAuthenticatedHandler,
    corsMiddleware: serverCorsMiddleware,
    Handler: serverHandler,
    loggingMiddleware: serverLoggingMiddleware,
    UserAuthenticatedHandler: serverUserAuthenticatedHandler,
  },
  External: {
    TypeOrmConfigFactory,
    typeOrmLogger,
  },
  MessageQueue: {
    lambdaAdapter,
    LambdaHandler,
  },
  Tests: {
    helpers: testsHelpers,
    mochaHelpers,
  },
  Util: {
    ArrayUtils,
    Bucket: {
      BucketFactory,
      PROVIDERS,
    },
    CorrelationIdHandler,
    Module,
    NodeInspector,
  },
};
