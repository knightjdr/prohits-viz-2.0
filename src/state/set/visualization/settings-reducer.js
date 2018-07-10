import { UPDATE_SETTING } from './settings-actions';

import Default from './default-settings';

const Settings = (state = Object.assign({}, Default), action) => {
  const updateState = {};
  switch (action.type) {
    case UPDATE_SETTING:
      updateState[action.setting] = action.value;
      return Object.assign(
        {},
        state,
        updateState,
      );
    default:
      return state;
  }
};
export default Settings;
