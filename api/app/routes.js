const HomeLoad = require('./modules/home-load/home-load');

const Routes = {
  configure: (app) => {
    // get all news items
    app.get('/api/home/', (req, res) => {
      HomeLoad()
        .then((response) => {
          Routes.response(res, response);
        });
    });
    // invalid get methods
    app.get('*', (req, res) => {
      res.status(404).send({
        message: Routes.messages.invalidRoute,
      });
    });
    // for invalid methods
    app.use((req, res) => {
      res.status(405).send({
        message: Routes.messages.notSupported,
      });
    });
  },
  messages: {
    invalidRoute: 'The requested route is not valid',
    notSupported: 'The requested method is not supported',
  },
  response: (resObject, response) => {
    // security headers
    resObject.setHeader('X-XSS-Protection', '1;mode=block');
    resObject.setHeader('X-Frame-Options', 'SAMEORIGIN');
    resObject.setHeader('X-Content-Type-Options', 'nosniff');
    resObject.status(response.status).send({ data: response.data });
  },
};
module.exports = Routes;
