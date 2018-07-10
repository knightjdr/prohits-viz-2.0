/* eslint import/newline-after-import: "off" */
/* eslint import/first: "off" */
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import React from 'react';

// React 16 Enzyme adapter.
Enzyme.configure({ adapter: new Adapter() });

// Always mock NavLink from react-router.
import * as moduleToMock from 'react-router-dom';
moduleToMock.NavLink = () => (<div />);
jest.setMock('react-router-dom', moduleToMock);

// Mock ObjectURL.
const noOp = () => {};
if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: noOp, writable: true });
}
if (typeof window.URL.revokeObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'revokeObjectURL', { value: noOp, writable: true });
}
