import React from 'react';

import Files from './task__files';
import format from './tasks__format';

jest.mock('../helpers/convert-iso-date', () => () => 'today');
jest.mock('./task__files');
jest.mock('./task__status');

const changeFile = jest.mock();
const downloadFile = jest.mock();
const viewFile = jest.mock();

const tasks = [
  {
    analysis: 'dotplot',
    date: new Date().toISOString(),
    files: [],
    id: 'task2',
    status: 'running',
  },
  {
    analysis: 'correlation',
    date: new Date().toISOString(),
    files: ['log.txt', 'correlation.txt'],
    id: 'task1',
    primaryFile: 'correlation.txt',
    status: 'complete',
  },
  {
    analysis: 'dotplot',
    date: new Date().toISOString(),
    files: ['log.txt', 'dotplot.txt'],
    id: 'task3',
    primaryFile: 'dotplot.txt',
    status: 'complete',
  },
];
const expectedTasks = [
  {
    analysis: { content: 'dotplot' },
    date: { content: 'today' },
    files: {
      content: (
        <Files
          changeFile={changeFile}
          downloadFolder={downloadFile}
          files={[]}
          id="task2"
          viewFile={viewFile}
        />
      ),
    },
    id: { content: 'task2' },
    status: { content: <div className="status" /> },
  },
  {
    analysis: { content: 'correlation' },
    date: { content: 'today' },
    files: {
      content: (
        <Files
          changeFile={changeFile}
          downloadFolder={downloadFile}
          files={['log.txt', 'correlation.txt']}
          id="task1"
          primaryFile="correlation.txt"
          viewFile={viewFile}
        />
      ),
    },
    id: { content: 'task1' },
    status: { content: <div className="status" /> },
  },
  {
    analysis: { content: 'dotplot' },
    date: { content: 'today' },
    files: {
      content: (
        <Files
          changeFile={changeFile}
          downloadFolder={downloadFile}
          files={['log.txt', 'dotplot.txt']}
          id="task3"
          primaryFile="log.txt"
          viewFile={viewFile}
        />
      ),
    },
    id: { content: 'task3' },
    status: { content: <div className="status" /> },
  },
];

describe('Format tasks', () => {
  it('should return an array of tasks formatted for a table', () => {
    const selectedFiles = { task3: 'log.txt' };
    expect(format(tasks, changeFile, viewFile, downloadFile, selectedFiles)).toEqual(expectedTasks);
  });
});
