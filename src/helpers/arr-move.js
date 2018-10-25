import deepCopy from './deep-copy';

const arrMove = (from, to, arr) => {
  const newArr = deepCopy(arr);
  newArr.splice(to, 0, newArr.splice(from, 1)[0]);
  return newArr;
};

export default arrMove;
