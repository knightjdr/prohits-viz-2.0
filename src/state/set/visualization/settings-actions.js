export const UPDATE_SETTING = 'UPDATE_SETTING';

export const updateSetting = (setting, value) => ({
  setting,
  type: 'UPDATE_SETTING',
  value,
});
