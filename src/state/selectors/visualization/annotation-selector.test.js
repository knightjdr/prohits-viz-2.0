import AnnotationSelector from './annotation-selector';

const state = {
  annotations: {
    color: '#ff0000',
    list: [
      {
        text: 'annotation1',
        x: 0,
        y: 20,
      },
      {
        text: 'annotation2',
        x: 40,
        y: 60,
      },
    ],
  },
};

describe('Annotation selector', () => {
  it('should return an array of annotations', () => {
    expect(AnnotationSelector(state)).toEqual(state.annotations);
  });
});
