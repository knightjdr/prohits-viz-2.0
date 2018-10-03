import taskSelector from './task-selector';

const state = {
  tasks: {
    list: ['a', 'b', 'c'],
  },
};

describe('Task selector', () => {
  it('should return an object with the table state', () => {
    expect(taskSelector(state)).toEqual(state.tasks);
  });
});
