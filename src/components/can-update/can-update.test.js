import React from 'react';
import { mount } from 'enzyme';

import CanUpdate from './can-update';

const render = jest.fn(props => <div {...props} />);

describe('Can update', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <CanUpdate
        afterUpdate={{ test: 'after' }}
        beforeUpdate={{ test: 'before' }}
        render={render}
      />,
    );
  });

  it('should call render once', () => {
    expect(render).toHaveBeenCalledTimes(1);
  });

  it('should call render with before state', () => {
    expect(render).toHaveBeenCalledWith({ update: { test: 'before' } });
  });

  it('should call render with after state when props change', () => {
    wrapper.setProps({});
    expect(render).toHaveBeenCalledWith({ update: { test: 'after' } });
  });
});
