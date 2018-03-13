import { FILL_HOME } from './home-actions';

const Home = (state = {
  news: [],
  spotlight: [],
}, action) => {
  switch (action.type) {
    case FILL_HOME:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
export default Home;
