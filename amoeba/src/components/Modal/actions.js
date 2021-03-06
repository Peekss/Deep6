import { SHOW_MODAL, HIDE_MODAL } from '../../actionTypes';

export function showModal(modalType, modalProps) {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProps,
  };
}


export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}