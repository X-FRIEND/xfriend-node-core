const assert = require('assert');

const { prettyPrint } = require('../../../../v1/src/logger/formatters');

describe('prettyPrint formatter', () => {
  let emptyOutput;

  before(() => {
    emptyOutput = {
      correlationId: null,
      log_level: undefined,
      log_message: undefined,
      log_timestamp: undefined,
    };
    // emptyOutput = { ...emptyOutput, log_message: undefined };
  });

  it('return pretty Print Log', () => {
    // given
    const expectedResult = '\n[undefined]: [undefined]\n\tcorrelationId: null\n\n';
    // when
    const formattedEvent = prettyPrint(emptyOutput);

    // then
    assert.deepEqual(formattedEvent, expectedResult);
  });
});
