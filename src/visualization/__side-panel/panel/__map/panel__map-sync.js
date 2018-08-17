import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button } from 'antd';
import { faCog, faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

import './panel__map.css';

const text = {
  false: {
    button: 'Generate now',
    error: 'generating',
    warning: 'No minimap available.',
  },
  true: {
    button: 'Sync now',
    error: 'synchronizing',
    warning: 'Map not in sync with image.',
  },
};

const Synced = ({
  isSyncing,
  minimap,
  syncError,
  syncMap,
}) => (
  <div className="panel__map-sync">
    {
      isSyncing ?
        <Fragment>
          <FontAwesomeIcon icon={faCog} spin /> Syncing...
        </Fragment>
        :
        <Fragment>
          <div>
            { text[Boolean(minimap)].warning }
          </div>
          <Button
            onClick={() => { syncMap(); }}
          >
            { text[Boolean(minimap)].button }
          </Button>
        </Fragment>
    }
    {
      syncError &&
      <div className="panel__map-sync_error">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <span>There was an error {text[Boolean(minimap)].error} the minmap.</span>
      </div>
    }
  </div>
);

Synced.defaultProps = {
  minimap: null,
};

Synced.propTypes = {
  minimap: PropTypes.string,
  isSyncing: PropTypes.bool.isRequired,
  syncError: PropTypes.bool.isRequired,
  syncMap: PropTypes.func.isRequired,
};

export default Synced;
