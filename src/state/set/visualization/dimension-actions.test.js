import * as actions from './dimension-actions';

describe('Dimesion set actions', () => {
  it('should dispatch an action to set the image dimensions', () => {
    const expectedAction = {
      columns: 30,
      height: 0.2,
      pageX: 20,
      pageY: 15,
      rows: 30,
      type: actions.SET_DIMENSIONS,
      width: 0.5,
    };
    expect(actions.setDimensions(30, 30, 0.2, 20, 15, 0.5)).toEqual(expectedAction);
  });
});
