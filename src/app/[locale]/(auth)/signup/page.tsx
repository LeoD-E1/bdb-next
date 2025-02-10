'use client';
import Spinner from '@/src/ui/components/Spinner';
import Link from 'next/link';
import React, { useState } from 'react';

const SignupPage = () => {
  const [loading] = useState(true);

  return (
    <div className='h-screen max-h-screen w-full'>
      <div className='flex h-full w-full'>
        <div
          className='hidden h-auto w-full bg-gray-400 bg-cover lg:block lg:w-5/12'
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/5903264/pexels-photo-5903264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          }}
        />
        <div className='flex w-full flex-col items-center justify-center bg-white p-5 lg:w-7/12'>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className='text-end'>
                <span> ¿Ya estás registrado? </span>
                <Link
                  className='text-accent inline-block align-baseline text-sm hover:underline'
                  href='/login'
                >
                  Ingresar
                </Link>
              </div>

              <h3 className='my-10 text-2xl text-gray-700'>Crear cuenta</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
