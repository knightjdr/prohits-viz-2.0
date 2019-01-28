import React from 'react';

import convertIso from '../helpers/convert-iso-date';
import Files from './task__files';
import status from './task__status';

const format = (tasks, changeFile, viewFile, downloadFolder, selectedFiles) => (
  tasks.map(task => ({
    analysis: {
      content: task.analysis,
    },
    date: {
      content: convertIso(task.date, true),
    },
    files: {
      content: (
        <Files
          changeFile={changeFile}
          downloadFolder={downloadFolder}
          files={task.files}
          id={task.id}
          primaryFile={selectedFiles[task.id] || task.primaryFile}
          viewFile={viewFile}
        />
      ),
    },
    id: {
      content: task.id,
    },
    status: {
      content: status(task.status),
    },
  }))
);

export default format;
