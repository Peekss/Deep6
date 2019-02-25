import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { hideModal } from '../Modal/actions';
import DeleteNodeModal from './DeleteNode';

import './modal.css';
Modal.setAppElement(document.getElementById('root'));

const MODAL_COMPONENTS = {
  'DELETE_NODE': DeleteNodeModal,
};

const ModalRoot = ({ modalType, modalProps, ...props }) => {
  if (!modalType) {
    return <span />;
  }
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return (
    <Modal
      isOpen={modalType !== null}
      onRequestClose={props.hideModal}
      shouldCloseOnOverlayClick={false}
      className="Modal"
      overlayClassName="Overlay"
    >
      <SpecificModal {...modalProps} onClose={props.hideModal} />
    </Modal>
  );
}

const mapStateToProps = state => state.modal;
export default connect(mapStateToProps, { hideModal })(ModalRoot);

