import React from 'react';
import Image from 'next/image';

import { style } from '@/src/utils/style';
import { heroimg } from '@/src/assets';

const Hero = () => {
  return (
    <section id='home' className="relative w-full max-sm:h-full h-[85vh] bg-primary mx-0 flex justify-center items-center rounded-b-3xl">
        <div className="h-full max-w-7xl flex max-lg:flex-col flex-row justify-center items-center gap-10 xl:gap-20 px-4 sm:px-6 lg:px-8 max-sm:mt-12">
          <div className="max-w-2xl w-full h-full flex flex-col justify-center items-start rounded-b-xl">
            <div className="flex flex-col justify-center items-start">
              <h1 className={`${style.heroHeadText} py-10 text-left`}>Welcome to Herb.AI</h1>
              <p className={`${style.heroSubText} text-justify`}>
                Leveraging the power of machine learning, our platform allows you to identify various medicinal plants simply by analyzing images of their leaves. Upload a photo of a leaf, and let our AI-driven system reveal the secrets of nature&apos;s pharmacy.
              </p>
            </div>
            <div className='flex flex-col justify-center items-start w-full'>
              <button className='mt-10 bg-tertiary h-16 w-36 rounded-xl shadow-lg shadow-green-500 text-primary text-[18px] lg:cursor-pointer'>
                <a href="#recognizer" className={`mt-10`}>
                  Get Started
                </a>
              </button>
              <div className='border-b-2 w-full mt-10' />
              <div className='w-full flex justify-between items-center mt-5 px-4 sm:px-10'>
                <div className='flex flex-col justify-center items-center'>
                  <h3 className='lg:text-[38px] text-[48px]  font-bold text-tertiary'>4</h3>
                  <p className='text-[22px] font-semibold text-wrap text-tertiary mr-5'>Models Used</p>
                </div>
                <div className='border-r-2 h-full hidden sm:block' />
                <div className='flex flex-col justify-center items-center mt-5 sm:mt-0'>
                  <h3 className='text-[48px] font-bold text-tertiary ml-5'>3</h3>
                  <p className='text-[22px] font-semibold text-wrap text-tertiary ml-5'>Plant Supported</p>
                </div>
              </div>
              <div className='border-b-2 w-full mt-5' />
            </div>
          </div>
          <div className="max-lg:w-auto w-full h-5/6 bg-tertiary justify-center items-center rounded-3xl shadow-2xl shadow-green-400 lg:flex hidden mb-5 px">
            <Image
              src={heroimg}
              alt="Hero Image"
              className="rounded-3xl shadow-2xl shadow-green-300 max-lg:h-[500px] h-auto w-auto object-cover m-5"
            />
          </div>
      </div>
    </section>
  );
};

export default Hero;