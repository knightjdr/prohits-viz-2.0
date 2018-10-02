import React from 'react';

import AnalysisForm from './form/form-container';
import Navbar from '../navbar/navbar-container';

const links = [
  {
    route: '/visualization',
    text: 'visualization',
  },
  {
    route: '/news',
    text: 'news',
  },
  {
    route: '/help',
    text: 'help',
  },
];

const Analysis = () => (
  <div>
    <Navbar
      links={links}
    />
    <AnalysisForm />
  </div>
);

export default Analysis;
