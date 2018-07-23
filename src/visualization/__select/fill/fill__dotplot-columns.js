const Columns = (userColumns) => {
  const columns = {};

  const {
    ref,
    names,
  } = userColumns;

  // Ensure ref is within names.
  columns.ref = !Number.isNaN(ref) && ref < names.length ? ref : null;
  columns.names = names;

  return columns;
};

export default Columns;
