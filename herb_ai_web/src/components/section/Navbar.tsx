"use client"

import React, { useState } from 'react';

import { menu, close } from '../../assets';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'recognizer',
    title: 'Recognizer',
  },
  {
    id: 'example',
    title: 'Examples',
  },
  {
    id: 'models',
    title: 'Models',
  },
  {
    id: 'contact',
    title: 'Contact',
  }
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="sm:px-16 px-6 sm:py-0 py-0 w-full flex items-center justify-between fixed top-0 z-20 bg-primary">
      <div className='w-full flex justify-between items-center mx-auto px-16'>
        <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          href='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className='text-white text-[22px] font-bold cursor-pointer flex border-b-4 border-secondary my-3'>Herb AI</p>
        </Link>
        <ul className='list-none hidden sm:flex gap-10 flex-row'>
          {navItems.map((navItem) => (
            <li
              key={navItem.id}
              className={`${ active === navItem.title ? "text-white" : "text-secondary" } hover:text-white hover:underline cursor-pointer text-[18px] font-semibold`}
            >
              <a href={`#${navItem.id}`} onClick={() => setActive(navItem.title)}>
                {navItem.title}
              </a>
            </li>
          ))}
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <Image
            src={toggle ? close : menu}
            alt='menu'
            onClick={() => setToggle(!toggle)}
            className='cursor-pointer object-contain w-[28px] h-[28px]'
          />
          <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-green-200 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navItems.map((navItem) => (
                <li
                  key={navItem.id}
                  className={`${active === navItem.title ? "text-primary/60" : "text-primary"} font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(navItem.title);
                  }}
                >
                  <a href={`#${navItem.id}`}>
                    {navItem.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar