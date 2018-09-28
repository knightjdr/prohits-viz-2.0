import { defaultState } from '../../state/set/visualization/columns-reducer';

const fillColumns = (userColumns) => {
  const columns = {};

  const {
    ref,
    names,
  } = userColumns;

  columns.names = Array.isArray(names) ? names : defaultState.names;
  // Ensure ref is within names.
  columns.ref = typeof ref === 'string' && columns.names.includes(ref) ? ref : null;

  return columns;
};

export default fillColumns;
