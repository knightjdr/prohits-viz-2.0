import AnnotationSelector from './annotation-selector';

const state = {
  annotations: [
    {
      height: 50,
      text: 'annotation1',
      width: 100,
      x: 0,
      y: 20,
    },
    {
      height: 50,
      text: 'annotation2',
      width: 200,
      x: 40,
      y: 60,
    },
  ],
};

describe('AnnotationSelector selector', () => {
  it('should return an array of annotations', () => {
    expect(AnnotationSelector(state)).toEqual(state.annotations);
  });
});
