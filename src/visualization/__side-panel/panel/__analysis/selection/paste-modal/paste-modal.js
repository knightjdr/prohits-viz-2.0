import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import './paste-modal.css';

const { TextArea } = Input;

const PasteModal = ({
  cancel,
  paste,
  pasteText,
  updatePasteList,
  visible,
}) => (
  <Modal
    className="paste-modal"
    closable={false}
    maskClosable
    okText="Paste"
    onCancel={cancel}
    onOk={paste}
    visible={visible}
    title="Paste gene list"
  >
    <div className="paste-modal-help">
      <FontAwesomeIcon icon={faInfoCircle} />
      <span>
        Genes can be pasted as a comma-, space- or newline-separated list.
      </span>
    </div>
    <TextArea
      rows={8}
      onChange={updatePasteList}
      value={pasteText}
    />
  </Modal>
);

PasteModal.propTypes = {
  cancel: PropTypes.func.isRequired,
  paste: PropTypes.func.isRequired,
  pasteText: PropTypes.string.isRequired,
  updatePasteList: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PasteModal;
