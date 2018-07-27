import * as actions from './dimension-actions';

describe('Dimesion set actions', () => {
  it('should dispatch an action to set the image dimensions', () => {
    const expectedAction = {
      columns: 30,
      pageX: 20,
      pageY: 15,
      rows: 30,
      type: actions.SET_DIMENSIONS,
    };
    expect(actions.setDimensions(30, 30, 20, 15)).toEqual(expectedAction);
  });
});
