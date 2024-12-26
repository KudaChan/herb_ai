"use client"

import Image from 'next/image';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a URL for the selected image
    }
  };

  const handleAnalyze = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedImage) return "No selected image";

    try {
      //fetch the image as a blob
      const file = await fetch(selectedImage).then(res => res.blob());

      // Convert the image Blob to a base64 string
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1];

        if (base64Image) {
          // Create the request body with the base64 image
          const requestBody = { "imageBuffer": base64Image };

          const response = await fetch('https://herb-ai-pdii.vercel.app/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
          });

          if (response.ok) {
            const result = await response.json();
            setAnalysisResult(result.name); // Set the analysis result from the response
          } else {
            console.error('Error analyzing image:', response.statusText);
          }
        } else {
          console.error('Error selecting image:', 'No base64 image');
        }
      };

      reader.readAsDataURL(file); // Start reading the image as a base64 string
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bg-bgImage bg-repeat bg-cover bg-bottom flex flex-col justify-center items-center h-screen w-full">
      <h1 className="text-6xl text-white font-extrabold text-center p-5">Welcome to Herb.AI</h1>
      <div className="backdrop-blur-sm bg-white/10 p-10 w-2/3 rounded-2xl shadow-lg z-10">
        <div className="flex flex-1 flex-col items-center justify-center p-10 space-x-5">
          <div {...getRootProps({ className: 'border-2 rounded-xl border-gray-400 p-4 mb-4 w-2/3 h-[100px] text-center bg-white/50' })}>
            <input {...getInputProps()} />
            <p className='text-black'>Drag &apos;n&apos; drop an image here, or click to select one</p>
          </div>
          <div className="flex flex-row items-center justify-between mx-5 w-2/3">
            {selectedImage && (
              <div className="m-5 w-full h-auto max-h-[300px] max-w-[300px]">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  className="mt-2 w-full h-auto rounded-xl"
                  width={300} height={300} />
              </div>
            )}
            <div className='flex flex-col items-center justify-center w-full bg-white/50 p-5 rounded-xl shadow-lg'>
              {analysisResult && (
                <div className="mt-4 text-black text-5xl text-semibold">
                  <pre>{analysisResult}</pre>
                </div>
              )}
              <button
                onClick={handleAnalyze}
                className="bg-blue-500 text-white px-4 py-2 my-4 rounded"
              >
                Analyze Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
