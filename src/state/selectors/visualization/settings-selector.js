import { createSelector } from 'reselect';

const getSetting = (state, property) => state.settings.current[property];

const GetSetting = createSelector(
  [getSetting],
  setting => (
    setting
  ),
);
export default GetSetting;
