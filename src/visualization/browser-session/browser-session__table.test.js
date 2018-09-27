import { shallow } from 'enzyme';

import renderTable from './browser-session__table';

const props = {
  sessionItemsTotal: 5,
  sessionsPage: [
    { id: 1, name: 'test1', date: 'July 18, 2018' },
    { id: 2, name: 'test2', date: 'July 18, 2018' },
    { id: 3, name: 'test3', date: 'July 18, 2018' },
    { id: 4, name: 'test4', date: 'July 18, 2018' },
    { id: 5, name: 'test5', date: 'July 18, 2018' },
  ],
  sessionsPageNumber: 1,
};

const changePage = jest.fn();
const deleteSession = jest.fn();
const openSession = jest.fn();

describe('Save session browser component', () => {
  it('should return null without storage support', () => {
    const wrapper = shallow(
      renderTable(
        {
          ...props,
          changePage,
          deleteSession,
          openSession,
          storageSupport: false,
        },
      ),
    );
    expect(wrapper.find('.browser-session').length).toBe(0);
  });

  it('should return null with storage support but no sessions', () => {
    const wrapper = shallow(
      renderTable(
        {
          ...props,
          changePage,
          deleteSession,
          openSession,
          sessionItemsTotal: 0,
          sessionsPage: [],
          storageSupport: true,
        },
      ),
    );
    expect(wrapper.find('.browser-session').length).toBe(0);
  });

  describe('with storage support and sessionsPage', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        renderTable(
          {
            ...props,
            changePage,
            deleteSession,
            openSession,
            storageSupport: true,
          },
        ),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call change page prop method on pagination button click', () => {
      wrapper.find('Pagination').simulate('change');
      expect(changePage).toHaveBeenCalled();
    });

    it('should call delete session prop method on button click', () => {
      wrapper.find('Popconfirm').last().prop('onConfirm')();
      expect(deleteSession).toHaveBeenCalled();
    });

    it('should call open session prop method on button click', () => {
      wrapper.find('Popconfirm').first().prop('onConfirm')();
      expect(openSession).toHaveBeenCalled();
    });
  });
});
