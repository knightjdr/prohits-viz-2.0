import DefaultState from '../../../visualization/test/annotations';
import AnnotationReducer from './annotation-reducer';

describe('AnnotationReducer set reducer', () => {
  it('should return an empty initial state', () => {
    expect(AnnotationReducer(undefined, {})).toEqual(DefaultState);
  });
});
