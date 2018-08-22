const formatTerm = (depth, term) => {
  let content;
  let style;
  switch (depth) {
    case 1:
      content = `• ${term}`;
      style = {
        textAlign: 'left',
      };
      break;
    default:
      content = term;
      style = {
        marginLeft: 5 + (depth * 8),
        textAlign: 'left',
      };
      break;
  }
  return {
    content,
    style,
  };
};

export default formatTerm;
