import React from 'react';
import { shallow } from 'enzyme';

import Browser from './session__browser';

const props = {
  sessionItemsTotal: 5,
  sessions: [
    { id: 1, name: 'test1', date: 'July 18, 2018' },
    { id: 2, name: 'test2', date: 'July 18, 2018' },
    { id: 3, name: 'test3', date: 'July 18, 2018' },
    { id: 4, name: 'test4', date: 'July 18, 2018' },
    { id: 5, name: 'test5', date: 'July 18, 2018' },
  ],
  sessionsPage: 1,
};

const changePage = jest.fn();
const deleteSession = jest.fn();
const openSession = jest.fn();

describe('Save session browser component', () => {
  beforeEach(() => {
    /* Clear call count */
    changePage.mockClear();
    deleteSession.mockClear();
    openSession.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Browser
        changePage={changePage}
        deleteSession={deleteSession}
        openSession={openSession}
        {...props}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call change page prop method on pagination button click', () => {
    const wrapper = shallow(
      <Browser
        changePage={changePage}
        deleteSession={deleteSession}
        openSession={openSession}
        {...props}
      />,
    );
    wrapper.find('Pagination').simulate('change');
    expect(changePage).toHaveBeenCalled();
  });

  it('should call delete session prop method on button click', () => {
    const wrapper = shallow(
      <Browser
        changePage={changePage}
        deleteSession={deleteSession}
        openSession={openSession}
        {...props}
      />,
    );
    wrapper.find('Popconfirm').last().prop('onConfirm')();
    expect(deleteSession).toHaveBeenCalled();
  });

  it('should call open session prop method on button click', () => {
    const wrapper = shallow(
      <Browser
        changePage={changePage}
        deleteSession={deleteSession}
        openSession={openSession}
        {...props}
      />,
    );
    wrapper.find('Popconfirm').first().prop('onConfirm')();
    expect(openSession).toHaveBeenCalled();
  });
});
