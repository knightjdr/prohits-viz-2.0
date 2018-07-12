import MarkerSelector from './marker-selector';

const state = {
  markers: {
    color: '#000000',
    list: [
      {
        height: 50,
        width: 100,
        x: 0,
        y: 20,
      },
      {
        height: 50,
        width: 200,
        x: 40,
        y: 60,
      },
    ],
  },
};

describe('Marker selector', () => {
  it('should return an array of annotations', () => {
    expect(MarkerSelector(state)).toEqual(state.markers);
  });
});
