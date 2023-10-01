'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../assets/images/logo.svg';
import { signOut, getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  console.log('providers:', providers);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex-gap-2 flex-center'>
        <Image
          src={Logo}
          alt='Promtopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />

        <p className='logo_text pl-3'>Promptopia</p>
      </Link>

      {/* Mobile Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={Logo}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider)}
                  className='black_btn'>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
