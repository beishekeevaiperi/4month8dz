import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root'); // Привязываем модальное окно к корневому элементу

const Modal = ({ isOpen, onRequestClose, message }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Уведомление"
    >
      <h2>{message}</h2>
      <button onClick={onRequestClose}>Закрыть</button>
    </ReactModal>
  );
};

export default Modal;
