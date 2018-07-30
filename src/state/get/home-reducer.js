import { FILL_HOME } from './home-actions';

const Home = (state = {
  isLoaded: false,
  news: [],
  spotlight: [],
}, action) => {
  switch (action.type) {
    case FILL_HOME:
      return {
        ...state,
        isLoaded: true,
        ...action.data,
      };
    default:
      return state;
  }
};
export default Home;
