import React from 'react'
import Image from 'next/image';

import { style } from '@/src/utils/style';

import { aloevera, Curry, Tulsi } from '@/src/assets';

const examples = [
  {
    name: 'Aloe Vera',
    img: aloevera,
  },
  {
    name: 'Curry Leaves',
    img: Curry,
  },
  {
    name: 'Tulsi Leaves',
    img: Tulsi,
  },
]

const Example = () => {
  return (
    <div className={`${style.paddingX} w-full h-full bg-tertiary flex flex-col justify-center items-center rounded-3xl shadow-2xl py-5`}>
      <div className='w-full h-full flex flex-col justify-center items-start'>
        <h2 className={`${style.sectionHeadText} text-primary/80`}>Example</h2>
        <p className={`${style.sectionSubText} text-primary/60`}>Currently we support these 3 plants</p>
      </div>
      <div className="backdrop-blur-sm bg-white/30 p-10 w-full rounded-2xl shadow-lg z-10 mt-10 flex justify-center items-center">
        {examples.map((example) => (
          <div key={example.name} className="flex flex-col items-center justify-center px-5 bg-white/50 rounded-xl my-5 mx-2 shadow-2xl">
            <Image
              src={example.img}
              alt={example.name}
              className=" rounded-3xl mt-5 h-60 w-60 shadow-2xl"
            />
            <p className='text-[22px] text-primary'>{example.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Example