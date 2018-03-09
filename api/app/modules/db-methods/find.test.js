process.env.NODE_ENV = test;
const Config = require('../../../config');
const Database = require('../../connections/database');

beforeAll(() => {
  Database.init();
});
