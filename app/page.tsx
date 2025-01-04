'use client';
import { useState } from 'react';
import Navbar from './ui/components/Navbar';
import { Icon } from './ui/icons';
import Modal from './ui/components/Modal';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className='bg-white'>
      <Navbar />

      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> */}
          <div className='text-center'>
            <h1 className='text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl'>
              Los restaurantes de tu barrio a un click
            </h1>
            <p className='mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
              Encontra restaurantes de barrio a un click, con un sistema de
              recomendaciones personalizados y una interfaz de usuario amigable.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6 bg-red-300'>
              <div className='relative w-full max-w-md'>
                <input
                  type='search'
                  // className="w-full py-2 pl-11 text-gray-700 rounded-md focus:outline-none focus:bg-white"
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='¿Cuál es tu dirección?'
                  onClick={() => setModalOpen(true)}
                />
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                  <Icon.MapPin className='text-red-600' />
                </div>
              </div>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className='text-xl font-semibold'>Modal Title</h2>
            <p className='mt-2 text-gray-600'>
              This is a reusable modal component created with TypeScript and
              styled using Tailwind CSS.
            </p>
            <button
              className='mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600'
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
}
