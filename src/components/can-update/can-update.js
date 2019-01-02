import PropTypes from 'prop-types';
import { Component } from 'react';

class CanUpdate extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }
  componentDidMount = () => {
    this.mounted = true;
  }
  render() {
    const { afterUpdate, beforeUpdate, render } = this.props;
    const update = this.mounted ? afterUpdate : beforeUpdate;
    return render({ update });
  }
}

CanUpdate.defaultProps = {
  afterUpdate: {},
  beforeUpdate: {},
};

CanUpdate.propTypes = {
  afterUpdate: PropTypes.shape({}),
  beforeUpdate: PropTypes.shape({}),
  render: PropTypes.func.isRequired,
};

export default CanUpdate;
