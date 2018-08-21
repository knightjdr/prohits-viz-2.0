import React from 'react';
import { Spin } from 'antd';

import './visualization__running.css';

const Running = () => (
  <div className="visualization__running">
    <Spin size="large" />
  </div>
);

export default Running;
