import React, { Component } from 'react';

import format from './tasks__format';
import Tasks from './tasks';

const tasks = [
  {
    analysis: 'dot plot',
    date: new Date(),
    id: 'task1',
    status: 'running',
  },
  {
    analysis: 'correlation',
    date: new Date(),
    id: 'task2',
    files: [
      {
        name: 'error',
        path: 'error',
      },
    ],
    status: 'error',
  },
  {
    analysis: 'dot plot',
    date: new Date(),
    files: [
      {
        name: 'dotplot',
        path: 'interactive/dotplot',
      },
      {
        name: 'condition-condition',
        path: 'interactive/condition-condition',
      },
      {
        name: 'log',
        path: 'log',
      },
    ],
    id: 'task3',
    status: 'complete',
  },
];

class TaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tasks: format(tasks),
    };
  }
  componentDidMount = () => {
    this.updateStatus();
  }
  updateStatus = () => {}
  render() {
    return (
      <Tasks
        loading={this.state.loading}
        tasks={this.state.tasks}
      />
    );
  }
}

export default TaskContainer;
