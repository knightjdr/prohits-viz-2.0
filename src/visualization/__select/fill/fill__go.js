import { defaultState } from '../../../state/set/analysis/go-reducer';

const fillGo = (userGo) => {
  const go = {};

  const {
    annotation,
  } = userGo;

  go.annotation = typeof annotation === 'string' ? annotation : defaultState.annotation;

  return go;
};

export default fillGo;
