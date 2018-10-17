import fetchMock from 'fetch-mock';

import formSubmit from './form-submit';

afterAll(() => {
  fetchMock.restore();
});

describe('Submit analysis form', () => {
  describe('successfully', () => {
    describe('receive 200 status', () => {
      let taskid;

      beforeAll(async (done) => {
        fetchMock.postOnce('*', { id: 'taskID' });
        formSubmit({ field: 'test' }, 'sessionID', 'dotplot')
          .then((id) => {
            taskid = id;
            done();
          });
      });

      it('should call sync route', () => {
        expect(fetchMock.lastUrl()).toBe('http://localhost:8004/api/analysis/dotplot');
      });

      it('should call fetch with correct headers', () => {
        const expectedHeaders = {
          accept: 'application/json',
          session: 'sessionID',
        };
        expect(fetchMock.lastOptions().headers.map).toEqual(expectedHeaders);
      });

      it('should call fetch with correct body', () => {
        const expectedBody = { field: 'test' };
        expect(fetchMock.lastOptions().body).toEqual(expectedBody);
      });

      it('should resolve with task ID', () => {
        expect(taskid).toBe('taskID');
      });
    });

    describe('receive 500 status', () => {
      beforeAll(() => {
        fetchMock.postOnce('*', 500, { overwriteRoutes: true });
      });

      it('should reject promise', () => (
        expect(formSubmit({}, 'sessionID', 'dotplot')).rejects.toBeUndefined()
      ));
    });
  });
});
