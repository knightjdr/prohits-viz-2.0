import PropTypes from 'prop-types';
import { Component } from 'react';

class CanUpdate extends Component {
  constructor(props) {
    super(props);
    const { beforeUpdate } = this.props;
    this.mounted = false;
    this.state = {
      canUpdate: false,
      update: { ...beforeUpdate },
    };
  }
  componentDidMount = () => {
    this.mounted = true;
  }
  componentWillReceiveProps = (nextProps) => {
    if (!this.state.canUpdate && this.mounted) {
      const { afterUpdate } = nextProps;
      this.setState({
        canUpdate: true,
        update: { ...afterUpdate },
      });
    }
  }
  render() {
    const { update } = this.state;
    const { render } = this.props;
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
