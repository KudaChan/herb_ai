import React from 'react';
import Image from 'next/image';

import {style} from '@/src/utils/style';

import {heroimg} from '@/src/assets';

const Hero = () => {
  return (
    <section id='home' className="relative w-full h-[85vh] bg-primary mx-0 flex xl:flex-row flex-col justify-center items-center rounded-b-3xl">
      <div className= "h-full max-w-7xl flex xl:flex-row flex-col justify-center items-center gap-20">
        <div className="w-full h-full flex flex-col justify-center items-start rounded-b-xl">
          <div className= "flex flex-col justify-center items-">
            <h1 className= {`${style.heroHeadText} py-10`}>Welcome to Herb.AI</h1>
            <p className= {`${style.heroSubText} text-justify`}>
              Leveraging the power of machine learning, our platform allows you to identify various medicinal plants simply by analyzing images of their leaves.  Upload a photo of a leaf, and let our AI-driven system reveal the secrets of nature&apos;s pharmacy.
            </p>
          </div>
          <div className='flex flex-col justify-center items-start w-full'>
            <button className = 'mt-10 bg-tertiary h-16 w-36 rounded-xl shadow-lg shadow-green-500 text-primary text-[18px]'>
              <a href="#recognizer" className= {`mt-10`}>
                Get Started
              </a>
            </button>
            <div className='border-b-2 w-full mt-10'/>
            <div className= 'w-full flex justify-between items-center mt-5 px-10'>
              <div className='flex flex-col justify-center items-center'>
                <h3 className='text-[48px] font-bold text-tertiary'>4</h3>
                <p className='text-[22px] font-semibold text-wrap text-tertiary mr-5'>Models Used</p>
              </div>
              <div className='border-r-2 h-full'/>
              <div className='flex flex-col justify-center items-center'>
                <h3 className='text-[48px] font-bold text-tertiary ml-5'>3</h3>
                <p className='text-[22px] font-semibold text-wrap text-tertiary ml-5'>Plant Supported</p>
              </div>
            </div>
            <div className='border-b-2 w-full mt-5'/>
          </div>
        </div>
        <div className="w-full h-[80%] bg-tertiary flex justify-center items-center rounded-3xl shadow-2xl shadow-green-400 shadow-offset-2xl">
          <div className="mx-4">
            <Image
              src={heroimg}
              alt="Hero Image"
              className="rounded-3xl shadow-2xl shadow-green-300"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;