import { leaf1, leaf2, leaf3, leaf4 } from '@/src/assets';

const models = [
  {
    name: 'Inception V3',
    img: leaf1,
    desc: 'Inception V3 is a convolutional neural network architecture that was introduced by researchers at Google. It is an improved version of the original Inception architecture, also known as GoogLeNet. Inception V3 was designed to perform image classification tasks and has been trained on the ImageNet dataset, which contains millions of labeled images across thousands of categories.',
  },
  {
    name: 'DenseNet',
    img: leaf2,
    desc: 'DenseNet is a convolutional neural network architecture that was introduced by researchers at Microsoft Research. It is designed to perform image classification tasks and has been trained on the ImageNet dataset. DenseNet is known for its dense connectivity pattern, which connects each layer to every other layer in a feed-forward fashion. This connectivity pattern allows DenseNet to learn more complex features from the data and achieve higher accuracy on image classification tasks.',
  },
  {
    name: 'Inception ResNet',
    img: leaf3,
    desc: 'Inception ResNet is a convolutional neural network architecture that combines the strengths of Inception networks and Residual networks (ResNets). It was introduced by researchers at Google and is designed to perform image classification tasks with high accuracy and efficiency. Inception ResNet uses a combination of Inception modules and ResNet blocks to achieve state-of-the-art performance on image classification tasks.',
  },
  {
    name: 'VGG16',
    img: leaf4,
    desc: 'VGG16 is a convolutional neural network architecture that was introduced by researchers at the Visual Geometry Group (VGG) at the University of Oxford. It is known for its simplicity and effectiveness in image classification tasks. VGG16 has 16 layers and uses small 3x3 convolutional filters with a stride of 1. It has been trained on the ImageNet dataset and has achieved high accuracy on image classification tasks.',
  },
]

export default models;