'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '../icons';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        className='relative mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'
        role='dialog'
        aria-modal='true'
      >
        <button
          className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
          onClick={onClose}
          aria-label='Close'
        >
          <Icon.Close />
        </button>

        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;
