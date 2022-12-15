const domain = require('domain');
const Logger = require('../../logger');

/**
 * TypeORM custom logger that implements that TypeORM logger interface
 */
module.exports = {
  log(level, message) {
    const logger = domain.active.databaseLogger || Logger.current();

    logger.log('Database Log', { additionalInfo: message });
  },
  logMigration(message) {
    const logger = domain.active.databaseLogger || Logger.current();

    logger.log(message);
  },
  logQuery(query, parameters) {
    const logger = domain.active.databaseLogger || Logger.current();

    logger.log(`Running query: ${query}`, { parameters });
  },
  logQueryError(error, query, parameters) {
    const logger = domain.active.databaseLogger || Logger.current();

    logger.error(`Error ${error} running query ${query}`, { parameters });
  },
  logQuerySlow(time, query, parameters) {
    const logger = domain.active.databaseLogger || Logger.current();

    logger.log(`Query ${query} is slow`, { parameters, time });
  },
  logSchemaBuild(message) {
    const logger = domain.active.databaseLogger || Logger.current();

    logger.log(message);
  },
};
