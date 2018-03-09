/* eslint global-require: "off" */
const Database = require('./database');
const Init = require('./init');

const err = new Error('err');
// mock init
jest.mock('./init');

// mock logger
jest.mock('../../logger');

describe('database connection', () => {
  beforeAll(() => {
    Init.mockResolvedValue('database');
  });
  test('resolve successful connection', () => {
    Database.init()
      .then(() => {
        expect(Database.connection).toBe('database');
      });
  });
});

describe('database connection', () => {
  beforeAll(() => {
    Init.mockRejectedValue(err);
  });
  test('reject unsuccessful connection', () => {
    Database.init()
      .catch(() => {
        expect(Database.connection).toBe(null);
      });
  });
});
