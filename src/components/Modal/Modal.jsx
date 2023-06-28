import {useEffect } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';


export const Modal = ({ onClose, originalImg }) => {
  const handleModalEvent = e => {
    const { nodeName: currentElement } = e.target;
    if (currentElement !== 'IMG') {
      onClose();
    }
  };
  useEffect(() => {
    const handleModalClose = e => {
      if (e.code !== 'Escape') {
        return;
      }
      onClose();
    };
    window.addEventListener('keydown', handleModalClose);
    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  }, []);

  return (
    <div className={style.Overlay} onClick={handleModalEvent}>
      <div className={style.Modal}>
        <img src={originalImg} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  originalImg: PropTypes.string,
  onClose: PropTypes.func,
};
