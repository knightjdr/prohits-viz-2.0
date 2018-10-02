import convertIso from '../helpers/convert-iso-date';
import status from './task__status';

const format = tasks => (
  tasks.map(task => ({
    analysis: {
      content: task.analysis,
    },
    date: {
      content: convertIso(task.date, true),
    },
    files: {
      content: null,
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
