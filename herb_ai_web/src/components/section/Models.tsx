import React from 'react'
import Image from 'next/image';

import { style } from '@/src/utils/style';
import { leaf1, leaf2, leaf3, leaf4 } from '@/src/assets';

const Models = () => {
  return (
    <div className= {`${style.paddingX} w-full h-full bg-tertiary flex flex-col justify-center items-center rounded-3xl shadow-2xl py-5`}>
      <div className='w-full h-full flex flex-col justify-center items-start'>
        <h2 className={`${style.sectionHeadText} text-primary/80`}>Models</h2>
        <p className={`${style.sectionSubText} text-primary/60`}>used to recognize</p>
      </div>
      <div className="backdrop-blur-sm bg-white/30 p-10 w-full h-full rounded-2xl shadow-lg z-10 mt-10 flex justify-center items-start">
        <Image
          src={leaf1}
          alt="leaf1"
          className="rounded-3xl mt-2 h-60 w-60 shadow-2xl bg-white/60"
        />
        <div className='flex flex-col justify-start items-start px-5 bg-white/50 rounded-xl my-2 mx-2 shadow-2xl w-full min-h-60'>
          <h3 className='text-[32px] text-primary font-semibold underline-offset-1 underline'>Inception V3</h3>
          <p className='text-wrap text-justify text-[18px] text-primary w-full h-full'>
            Inception V3 is a convolutional neural network architecture that was introduced by researchers at Google. It is an improved version of the original Inception architecture, also known as GoogLeNet. Inception V3 was designed to perform image classification tasks and has been trained on the ImageNet dataset, which contains millions of labeled images across thousands of categories.
          </p>
        </div>
      </div>
      <div className="backdrop-blur-sm bg-white/30 p-10 w-full h-full rounded-2xl shadow-lg z-10 mt-10 flex justify-center items-start">
        <div className='flex flex-col justify-start items-start px-5 bg-white/50 rounded-xl my-2 mx-2 shadow-2xl w-full min-h-60'>
          <h3 className='text-[32px] text-primary font-semibold underline-offset-1 underline'>DenseNet</h3>
          <p className='text-wrap text-[18px] text-justify text-primary w-full h-full'>
            DenseNet is a convolutional neural network architecture that was introduced by researchers at Microsoft Research. It is designed to perform image classification tasks and has been trained on the ImageNet dataset. DenseNet is known for its dense connectivity pattern, which connects each layer to every other layer in a feed-forward fashion. This connectivity pattern allows DenseNet to learn more complex features from the data and achieve higher accuracy on image classification tasks
          </p>
        </div>
        <Image
          src={leaf2}
          alt="leaf2"
          className="rounded-3xl mt-2 h-60 w-60 shadow-2xl bg-white/60"
        />
      </div>
      <div className="backdrop-blur-sm bg-white/30 p-10 w-full h-full rounded-2xl shadow-lg z-10 mt-10 flex justify-center items-start">
        <Image
          src={leaf3}
          alt="leaf3"
          className="rounded-3xl mt-2 h-60 w-60 shadow-2xl bg-white/60"
        />
        <div className='flex flex-col justify-start items-start px-5 bg-white/50 rounded-xl my-2 mx-2 shadow-2xl w-full min-h-60'>
          <h3 className='text-[32px] text-primary font-semibold underline-offset-1 underline'>Inception Resnet</h3>
          <p className='text-wrap text-[18px] text-primary text-justify w-full h-full'>
            Inception ResNet is a convolutional neural network architecture that combines the strengths of Inception networks and Residual networks (ResNets). It was introduced by researchers at Google and is designed to perform image classification tasks with high accuracy and efficiency. Inception ResNet uses a combination of Inception modules and ResNet blocks to achieve state-of-the-art performance on image classification tasks.
          </p>
        </div>
      </div>
      <div className="backdrop-blur-sm bg-white/30 p-10 w-full h-full rounded-2xl shadow-lg z-10 mt-10 flex justify-center items-start">
        <div className='flex flex-col justify-start items-start px-5 bg-white/50 rounded-xl my-2 mx-2 shadow-2xl w-full min-h-60'>
          <h3 className='text-[32px] text-primary font-semibold underline-offset-1 underline'>VGG16</h3>
          <p className='text-wrap text-[18px] text-primary w-full h-full text-justify'>
            VGG16 is a convolutional neural network architecture introduced by researchers at the University of Oxford in 2014. It was one of the models submitted to the ImageNet Large Scale Visual Recognition Challenge (ILSVRC) and achieved state-of-the-art performance in image classification tasks. The model has been trained on the ImageNet dataset and can classify images into 1,000 different categories.
          </p>
        </div>
        <Image
          src={leaf4}
          alt="leaf4"
          className="rounded-3xl mt-2 h-60 w-60 shadow-2xl bg-white/60"
        />
      </div>
    </div>
  )
}

export default Models;