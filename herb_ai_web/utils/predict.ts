import * as tf from '@tensorflow/tfjs-node';

// Function to load a model and make predictions
export const loadModelAndPredict = async (imageBuffer: Buffer): Promise<string> => {
  try {
    const classLabels = [1, 2, 3, 4, 5];
    const speciesDict: { [key: number]: string } = {
      1: 'Aloevera',
      2: 'Ashoka',
      3: 'Betel',
      4: 'Curry_Leaf',
      5: 'Tulsi',
    };

    // list of model paths
    const modelPath1 = '../model/InceptionV3_Orignal_Data.keras';
    const modelPath2 = '../model/Inception_ResNet_Orignal_Data.keras';
    const modelPath3 = '../model/DenseNet_Orignal_Data.keras';
    const modelPath4 = '../model/VGG16_Orignal_Data.keras';

    const model1 = await tf.loadLayersModel(`file://${modelPath1}`);
    const model2 = await tf.loadLayersModel(`file://${modelPath2}`);
    const model3 = await tf.loadLayersModel(`file://${modelPath3}`);
    const model4 = await tf.loadLayersModel(`file://${modelPath4}`);

    // Decode the image into a Tensor
    const tensor1 = tf.node.decodeImage(imageBuffer, 3)
      .resizeBilinear([224, 224])
      .expandDims(0)

    const tensor2 = tf.node.decodeImage(imageBuffer, 3)
      .resizeBilinear([299, 299])
      .expandDims(0)
    // Make a prediction
    const prediction1 = model1.predict(tensor2) as tf.Tensor;
    const prediction2 = model2.predict(tensor2) as tf.Tensor;
    const prediction3 = model3.predict(tensor1) as tf.Tensor;
    const prediction4 = model4.predict(tensor1) as tf.Tensor;

    // Combine the predictions from all models
    const prediction = tf.concat([prediction1, prediction2, prediction3, prediction4], 0);
    const maxIndex = prediction.argMax(1).dataSync()[0];
    const species = speciesDict[classLabels[maxIndex as keyof typeof speciesDict]];

    return species;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error loading model or predicting: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during prediction.');
    }
  }
};