import React from 'react'
import Image from 'next/image';

import { style } from '@/src/utils/style';
import models from '@/src/constant';

const Models = () => {
  return (
    <div className= {`${style.paddingX} w-full h-full bg-tertiary flex flex-col justify-center items-center rounded-3xl shadow-2xl py-5`}>
      <div className='w-full h-full flex flex-col justify-center items-start'>
        <h2 className={`${style.sectionHeadText} text-primary/80`}>Models</h2>
        <p className={`${style.sectionSubText} text-primary/60`}>used to recognize</p>
      </div>
      {models.map((model, index) => (
        <div key={index} className="backdrop-blur-sm bg-white/30 max-sm:p-2 p-10 w-full h-full rounded-2xl shadow-lg z-10 mt-10 flex flex-wrap justify-center items-start">
          <Image
            src={model.img}
            alt={model.name}
            className="rounded-3xl mt-2 h-60 w-60 shadow-2xl bg-white/60"
          />
          <div className='flex flex-col justify-start items-start px-5 bg-white/50 rounded-xl my-2 mx-2 shadow-2xl w-full min-h-60'>
            <h3 className='max-sm:text-[28px] text-[32px] text-primary font-semibold underline-offset-1 underline'>{model.name}</h3>
            <p className='text-wrap text-justify text-[18px] text-primary w-full h-full'>
              {model.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Models;