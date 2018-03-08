const Init = require('./init');

// mock init
jest.mock('./init');
Init.mockReturnValue('database');

const Database = require('./database');

test('retrieve database instance', () => {
  expect(Database.connection).toBe('database');
});
