import React from 'react';
import { shallow } from 'enzyme';

import getFile from '../helpers/get-file';
import { TaskContainer } from './tasks-container';

jest.mock('../helpers/get-file');

const fetchTaskStatus = jest.fn();
const push = jest.fn();

describe('Task container', () => {
  describe('methods', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <TaskContainer
          fetchTaskStatus={fetchTaskStatus}
          history={{
            push,
          }}
          id="task1"
          tasks={{
            didError: false,
            isUpdating: false,
            list: ['task1', 'task2'],
            session: 'abcdef',
            shouldUpdate: false,
            status: [
              { id: 'task1', status: 'running' },
              { id: 'task2', primaryFile: 'dotplot', status: 'complete' },
            ],
          }}
        />,
      );
    });

    describe('component updates from prop', () => {
      let spyFetch;
      let spyUpdate;

      afterAll(() => {
        spyFetch.mockRestore();
        spyUpdate.mockRestore();
      });

      beforeAll(() => {
        spyFetch = jest.spyOn(wrapper.instance(), 'fetchTasks');
        spyUpdate = jest.spyOn(wrapper.instance(), 'updateTasks');
        wrapper.update();
        wrapper.setProps({});
      });

      it('should call fetchTasks', () => {
        expect(spyFetch).toHaveBeenCalled();
      });

      it('should call updateTasks', () => {
        expect(spyUpdate).toHaveBeenCalled();
      });
    });

    describe('error getting status', () => {
      beforeAll(() => {
        wrapper.instance().getError();
      });

      it('should set modal content', () => {
        expect(wrapper.state().modalContent).toBe('There was an error retrieving this file/folder');
      });

      it('should set modal title', () => {
        expect(wrapper.state().modalTitle).toBe('Error');
      });

      it('should open modal', () => {
        expect(wrapper.state().openModal).toBeTruthy();
      });
    });

    it('should set task file to view', () => {
      wrapper.instance().changeFile('task1', 'log.txt');
      expect(wrapper.state('selectedFiles')).toEqual({ task1: 'log.txt' });
    });

    describe('close modal', () => {
      beforeAll(() => {
        wrapper.instance().closeModal();
      });

      it('should set modal content', () => {
        expect(wrapper.state().modalContent).toBeNull();
      });

      it('should set modal title', () => {
        expect(wrapper.state().modalTitle).toBeNull();
      });

      it('should open modal', () => {
        expect(wrapper.state().openModal).toBeFalsy();
      });
    });

    it('should download folder', () => {
      getFile.mockClear();
      const expectedOptions = {
        err: wrapper.instance().getError,
        ext: 'zip',
        name: 'task1',
      };
      wrapper.instance().downloadFolder('task1');
      expect(getFile).toHaveBeenCalledWith('task/task1', expectedOptions);
    });

    describe('fetch task status', () => {
      it('should not call fetch task status when session empty', () => {
        fetchTaskStatus.mockClear();
        wrapper.instance().fetchTasks('', '');
        expect(fetchTaskStatus).not.toHaveBeenCalled();
      });

      it('should not call fetch task status when session does not change', () => {
        fetchTaskStatus.mockClear();
        wrapper.instance().fetchTasks('abcdef', 'abcdef');
        expect(fetchTaskStatus).not.toHaveBeenCalled();
      });

      it('should call fetch task status when session defined and changes', () => {
        fetchTaskStatus.mockClear();
        wrapper.instance().fetchTasks('abcdef', '');
        expect(fetchTaskStatus).toHaveBeenCalledWith('task1');
      });
    });

    describe('open modal', () => {
      let spy;

      afterAll(() => {
        spy.mockRestore();
      });

      beforeAll(() => {
        spy = jest.spyOn(wrapper.instance(), 'showText');
        wrapper.update();
      });

      it('should call showText', () => {
        wrapper.instance().openModal('task1')('test');
        expect(spy).toHaveBeenCalledWith('test', 'task1');
      });
    });

    describe('modal content', () => {
      beforeAll(() => {
        wrapper.instance().showText('text', 'task1');
      });

      it('should set modal content', () => {
        expect(wrapper.state().modalContent).toBe('text');
      });

      it('should set modal title', () => {
        expect(wrapper.state().modalTitle).toBe('Task: task1');
      });

      it('should open modal', () => {
        expect(wrapper.state().openModal).toBeTruthy();
      });
    });

    describe('Update tasks', () => {
      it('should not update tasks when list does not change', () => {
        fetchTaskStatus.mockClear();
        const currentTasks = {
          list: ['task1', 'task2'],
          shouldUpdate: false,
        };
        const prevTasks = {
          list: ['task1', 'task2'],
          shouldUpdate: false,
        };
        wrapper.instance().updateTasks(currentTasks, prevTasks);
        expect(fetchTaskStatus).not.toHaveBeenCalled();
      });

      it('should update tasks when list changes', () => {
        fetchTaskStatus.mockClear();
        const currentTasks = {
          list: ['task1', 'task2', 'task3'],
          shouldUpdate: false,
        };
        const prevTasks = {
          list: ['task1', 'task2'],
          shouldUpdate: false,
        };
        wrapper.instance().updateTasks(currentTasks, prevTasks);
        expect(fetchTaskStatus).toHaveBeenCalled();
      });

      it('should update tasks when shouldUpdate boolean is true', () => {
        fetchTaskStatus.mockClear();
        const currentTasks = {
          list: ['task1', 'task2'],
          shouldUpdate: true,
        };
        const prevTasks = {
          list: ['task1', 'task2'],
          shouldUpdate: false,
        };
        wrapper.instance().updateTasks(currentTasks, prevTasks);
        expect(fetchTaskStatus).toHaveBeenCalled();
      });
    });

    describe('view file', () => {
      describe('no file selected', () => {
        beforeAll(() => {
          wrapper.setState({ selectedFiles: { task1: null } });
          getFile.mockClear();
          push.mockClear();
          wrapper.instance().viewFile('task1');
        });

        it('should not get file', () => {
          expect(getFile).not.toHaveBeenCalled();
        });

        it('should not push to history', () => {
          expect(push).not.toHaveBeenCalled();
        });
      });

      describe('file selected but not text file', () => {
        beforeAll(() => {
          wrapper.setState({ selectedFiles: { task1: 'dotplot' } });
          getFile.mockClear();
          push.mockClear();
          wrapper.instance().viewFile('task1');
        });

        it('should not get file', () => {
          expect(getFile).not.toHaveBeenCalled();
        });

        it('should push to history', () => {
          expect(push).toHaveBeenCalledWith('/visualization/task1/dotplot');
        });
      });

      describe('file selected and is text file', () => {
        beforeAll(() => {
          wrapper.setState({ selectedFiles: { task1: 'log' } });
          getFile.mockClear();
          push.mockClear();
          wrapper.instance().viewFile('task1');
        });

        it('should get file', () => {
          expect(getFile).toHaveBeenCalled();
        });

        it('should not push to history', () => {
          expect(push).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('falsy id prop', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <TaskContainer
          fetchTaskStatus={fetchTaskStatus}
          history={{
            push,
          }}
          id=""
          tasks={{
            didError: false,
            isUpdating: false,
            list: ['task1', 'task2'],
            shouldUpdate: false,
            status: [
              { id: 'task1', status: 'running' },
              { id: 'task2', status: 'complete' },
            ],
          }}
        />,
      );
    });

    it('should set missing prop to false when no ID', () => {
      expect(wrapper.props().missing).toBeFalsy();
    });

    it('should set task array to prop task status', () => {
      const expectedValue = [
        { id: 'task1', status: 'running' },
        { id: 'task2', status: 'complete' },
      ];
      expect(wrapper.props().tasks).toEqual(expectedValue);
    });
  });

  describe('id prop with value and status', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <TaskContainer
          fetchTaskStatus={fetchTaskStatus}
          history={{
            push,
          }}
          id="task1"
          tasks={{
            didError: false,
            isUpdating: false,
            list: ['task1', 'task2'],
            shouldUpdate: false,
            status: [
              { id: 'task1', status: 'running' },
              { id: 'task2', status: 'complete' },
            ],
          }}
        />,
      );
    });

    it('should set missing prop to false when no ID', () => {
      expect(wrapper.props().missing).toBeFalsy();
    });

    it('should set task array to prop task status', () => {
      const expectedValue = [
        { id: 'task1', status: 'running' },
      ];
      expect(wrapper.props().tasks).toEqual(expectedValue);
    });
  });

  describe('id prop with value and but no status', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <TaskContainer
          fetchTaskStatus={fetchTaskStatus}
          history={{
            push,
          }}
          id="task3"
          tasks={{
            didError: false,
            isUpdating: false,
            list: ['task1', 'task2'],
            shouldUpdate: false,
            status: [
              { id: 'task1', status: 'running' },
              { id: 'task2', status: 'complete' },
            ],
          }}
        />,
      );
    });

    it('should set missing prop to false when no ID', () => {
      expect(wrapper.props().missing).toBeTruthy();
    });

    it('should set task array to prop task status', () => {
      expect(wrapper.props().tasks).toEqual([]);
    });
  });
});
