const RoundNearest = (value, round) => (
  Math.round(value / round) * round
);
export default RoundNearest;
