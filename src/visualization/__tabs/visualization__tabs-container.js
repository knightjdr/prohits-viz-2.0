import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Tabs from './visualization__tabs';

export class TabsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Tabs>
        { this.props.children }
      </Tabs>
    );
  }
}

TabsContainer.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default TabsContainer;