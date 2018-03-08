const news = () => {};

const Routes = {
  configure: (app) => {
    // get all news items
    app.get('/api/news/', (req, res) => {
      news.get()
        .then((response) => {
          Routes.response(res, response);
        });
    });
    // invalid get methods
    app.get('*', (req, res) => {
      res.status(404).send({
        status: 404,
        error: Routes.messages.invalidRoute,
      });
    });
  },
  messages: {
    invalidRoute: 'The requiested route is not valid',
    notSupported: 'The requested method is not supported',
  },
  response: (resObject, response) => {
    const data = response.clientResponse;
    Object.entries(resObject.locals).forEach(([key, value]) => {
      if (key !== 'user') {
        data[key] = value;
      }
    });
    // security headers
    resObject.setHeader('X-XSS-Protection', '1;mode=block');
    resObject.setHeader('X-Frame-Options', 'SAMEORIGIN');
    resObject.setHeader('X-Content-Type-Options', 'nosniff');
    resObject.status(response.status).send(data);
  },
};
module.exports = Routes;
