/* eslint no-unused-vars: "off" */ // this is to allow the DB to initialize

const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

const Config = require('./config');
const Database = require('./app/connections/database');
const routes = require('./app/routes');

//  init app
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyparser.json({ limit: '1000mb' }));
routes.configure(app);

// start server
server.listen(Config.port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
