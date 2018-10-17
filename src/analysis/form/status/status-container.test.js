import React from 'react';
import { shallow } from 'enzyme';

import { StatusContainer } from './status-container';

const fetchTaskStatus = jest.fn();
const emptyTasks = {
  list: [],
  status: [],
};

describe('StatusContainer', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <StatusContainer
        closeModal={jest.fn}
        fetchTaskStatus={fetchTaskStatus}
        taskID="task1"
        tasks={emptyTasks}
      />,
    );
  });

  it('should have "loading" as initial status', () => {
    expect(wrapper.state().status).toBe('loading');
  });

  it('should fetch tasks on mount', () => {
    expect(fetchTaskStatus).toHaveBeenCalledWith('task1');
  });

  describe('receiving new props', () => {
    let spyContent;
    let spyTasks;
    const tasks = {
      list: ['task1'],
      shouldUpdate: true,
      status: [
        { id: 'task1', status: 'running' },
      ],
    };

    afterAll(() => {
      spyContent.mockRestore();
      spyTasks.mockRestore();
    });

    beforeAll(() => {
      spyContent = jest.spyOn(wrapper.instance(), 'updateContent');
      spyTasks = jest.spyOn(wrapper.instance(), 'updateTasks');
      wrapper.update();
      wrapper.setProps({
        tasks,
      });
    });

    it('should update content', () => {
      expect(spyContent).toHaveBeenCalledWith(tasks, 'task1', emptyTasks);
    });

    it('should update tasks', () => {
      expect(spyTasks).toHaveBeenCalledWith(true);
    });
  });

  describe('update content', () => {
    it('should not update status when current task ID status not found', () => {
      wrapper.setState({ status: 'loading' });
      const currentTasks = {
        status: [],
      };
      const prevTasks = {
        status: [],
      };
      wrapper.instance().updateContent(currentTasks, 'task1', prevTasks);
      expect(wrapper.state().status).toBe('loading');
    });

    it('should update status when current task ID status found and status is loading', () => {
      wrapper.setState({ status: 'loading' });
      const currentTasks = {
        status: [{ id: 'task1', status: 'running' }],
      };
      const prevTasks = {
        status: [],
      };
      wrapper.instance().updateContent(currentTasks, 'task1', prevTasks);
      expect(wrapper.state().status).toBe('running');
    });

    it('should not update status when current task ID status found and same as previous', () => {
      wrapper.setState({ status: 'testStatus' });
      const currentTasks = {
        status: [{ id: 'task1', status: 'running' }],
      };
      const prevTasks = {
        status: [{ id: 'task1', status: 'running' }],
      };
      wrapper.instance().updateContent(currentTasks, 'task1', prevTasks);
      expect(wrapper.state().status).toBe('testStatus');
    });

    it('should update status when current task ID status found and differs from previous', () => {
      wrapper.setState({ status: 'loading' });
      const currentTasks = {
        status: [{ id: 'task1', status: 'complete' }],
      };
      const prevTasks = {
        status: [{ id: 'task1', status: 'running' }],
      };
      wrapper.instance().updateContent(currentTasks, 'task1', prevTasks);
      expect(wrapper.state().status).toBe('complete');
    });
  });

  describe('update tasks', () => {
    beforeAll(() => {
      fetchTaskStatus.mockClear();
    });

    it('should not fetch task status when arg is "false"', () => {
      wrapper.instance().updateTasks(false);
      expect(fetchTaskStatus).not.toHaveBeenCalled();
    });

    it('should fetch task status when arg is "true"', () => {
      wrapper.instance().updateTasks(true);
      expect(fetchTaskStatus).toHaveBeenCalledWith('task1');
    });
  });
});
