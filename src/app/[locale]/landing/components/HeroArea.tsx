'use client';
import useModal from '@/src/app/hooks/useModal';
import Modal from '@/src/ui/components/Modal';
import { Icon } from '@/src/ui/icons';
import { useTranslations } from 'next-intl';
import React from 'react';

const HeroArea = () => {
  const { isOpen, toggleModal } = useModal();
  const t = useTranslations('HomePage');
  return (
    <>
      <div
        className={`relative flex min-h-[100vh] items-center bg-slate-800 bg-opacity-50 bg-[url(https://images.pexels.com/photos/5953515/pexels-photo-5953515.jpeg)] bg-cover bg-fixed bg-no-repeat px-6 pt-14 bg-blend-soft-light md:bg-center lg:px-8`}
      >
        <div className='w-full max-w-2xl py-32 sm:py-48 md:px-32 lg:py-56'>
          <div className='text-left'>
            <h1 className='text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              {t('title')}
            </h1>
            <p className='mt-8 text-pretty text-lg font-light text-white sm:text-base'>
              {t('description')}
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <div className='relative w-full max-w-md'>
                <input
                  type='search'
                  // className="w-full py-2 pl-11 text-gray-700 rounded-md focus:outline-none focus:bg-white"
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder={t('address_question')}
                  onClick={toggleModal}
                />
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                  <Icon.MapPin className='text-red-600' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h2 className='text-xl font-semibold'>Modal Title</h2>
        <p className='mt-2 text-gray-600'>
          This is a reusable modal component created with TypeScript and styled
          using Tailwind CSS.
        </p>
        <button
          className='mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600'
          onClick={toggleModal}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default HeroArea;
