import React from 'react';
import { Input } from 'antd';

import Button from '../../../components/button/button';

import './visualization__annotation.css';

const Annotation = () => (
  <div className="visualization__annotation">
    <Input
      placeholder="Annotation..."
    />
    <Button
      handleClick={() => {}}
    >
      Annotate
    </Button>
  </div>
);

export default Annotation;
