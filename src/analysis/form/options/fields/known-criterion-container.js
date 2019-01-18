import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import KnownCriterion from './known-criterion';

class KnownCriterionContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }
  componentDidMount = () => {
    import('../../../../assets/data/interactor-species')
      .then((content) => {
        this.setState({
          dataSource: content.default,
        });
      })
      .catch(() => {});
  }
  render() {
    const { disableSpecies } = this.props;
    const { dataSource } = this.state;
    return (
      <KnownCriterion
        dataSource={dataSource}
        disableSpecies={disableSpecies}
      />
    );
  }
}

KnownCriterionContainer.propTypes = {
  disableSpecies: PropTypes.bool.isRequired,
};

export default KnownCriterionContainer;
