'use client';
import { ReactNode, useState } from 'react';
import Modal from './Modal';

type Props = {
  children?: ReactNode;
};

export default function PageLayout({ children }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      {children}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className='text-xl font-semibold'>Modal Title</h2>
        <p className='mt-2 text-gray-600'>
          This is a reusable modal component created with TypeScript and styled
          using Tailwind CSS.
        </p>
        <button
          className='mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600'
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </>
  );
}
