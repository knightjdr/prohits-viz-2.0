export const UPDATE_SELECTIONS = 'UPDATE_SELECTIONS';

export const updateGeneList = selections => ({
  selections,
  type: UPDATE_SELECTIONS,
});

/* Add items to target list and remove duplicates. */
export const addToTarget = (arr, target, replace) => {
  if (replace) {
    return [...new Set(arr)];
  }
  return [...new Set([...target, ...arr])];
};

/* Sort list. */
export const sortTarget = (arr, sortBy) => {
  if (sortBy) {
    return arr.sort((a, b) => sortBy[a] - sortBy[b]);
  }
  return arr;
};

/* Filters a input list of genes based on their presence in the source
** and target list. However, they are only removed from the target list
** when replace = false. */
export const filterGeneList = (arr, source, target, replace) => {
  if (replace) {
    return arr.filter(item => source.includes(item) || target.includes(item));
  }
  return arr.filter(item => source.includes(item) && !target.includes(item));
};

/* Updates a source list by removing items going to another list and
** adding items from the target list if that list is being replaced. */
export const updateSource = (list, source, target, newTarget, sortBy, replace) => {
  let newSource = source.filter(gene => !list.includes(gene));
  if (replace) {
    const notInNewTarget = target.filter(item => !newTarget.includes(item));
    newSource = [...newSource, ...notInNewTarget];
  }
  if (sortBy) {
    return newSource.sort((a, b) => sortBy[a] - sortBy[b]);
  }
  return newSource;
};

/* setSelections will remove any of the specified arr items that are not in the
** source list or that are in the target list. It will add the remaining to target list
** and remove from the source list. */
export const setSelections = (arr, source, target, replace = false, sortBy) => (
  (dispatch, getState) => {
    const { genes } = getState();
    const newLists = {};

    const filteredArr = filterGeneList(arr, genes[source], genes[target], replace);
    newLists[target] = addToTarget(filteredArr, genes[target], replace);
    newLists[target] = sortTarget(newLists[target], genes[sortBy]);
    newLists[source] = updateSource(
      filteredArr,
      genes[source],
      genes[target],
      newLists[target],
      genes[sortBy],
      replace,
    );
    dispatch(updateGeneList(newLists));
  }
);
