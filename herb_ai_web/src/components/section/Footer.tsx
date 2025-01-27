'use client'

import React from 'react'

import { github, x, linkedin, copyright } from '@/src/assets'
import Image from 'next/image'

const footerIcon = [
  {
    name: 'Github',
    icon: github,
    link: 'https://github.com/KudaChan',
  },
  {
    name: 'Twitter',
    icon: x,
    link: 'https://x.com/@lk_kashyap05',
  },
  {
    name: 'LinkedIn',
    icon: linkedin,
    link: 'https://linkedin.com/in/chandan-kumarn-972b54224',
  }
]

const Footer = () => {
  return (
    <div className='w-full bg-primary flex justify-center items-center py-4'>
      <div className='container flex justify-between items-center flex-wrap gap-5 px-4'>
        <div className='text-white flex gap-2 cursor-pointer'
          onClick={() => window.scrollTo(0, 0)}
        >
          <p className='font-medium text-[18px]'>Herb Ai | Chandan Kumar</p>
          <Image
            src={copyright}
            alt="copy-right"
            className="w-4 h-4 object-contain"
          />
        </div>

        <div className='flex gap-3'>
          {footerIcon.map((icon, index) => (
            <div
              key={`footer-icon-${index}`}
              onClick={() => {
                if (icon.link) {
                  window.open(icon.link, '_blank');
                } else {
                  console.error(`Invalid link for icon at index ${index}`);
                }
              }}
              className="bg-black w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <Image
                src={icon.icon}
                alt={icon.name}
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer