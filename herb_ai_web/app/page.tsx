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
    if (!selectedImage) return;

    // Create a FormData object to send the image to your AI model
    const formData = new FormData();
    if (selectedImage) {
      const file = await fetch(selectedImage).then(res => res.blob());
      formData.append('image', file, 'image');
    }

    try {
      const response = await fetch('/api/predict', { // Adjust the endpoint as needed
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result); // Set the analysis result from the response
      } else {
        console.error('Error analyzing image:', response.statusText);
      }
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
          {selectedImage && (
            <div className="mt-4 w-full h-auto max-h-[300px] max-w-[300px]">
              <Image
                src={selectedImage}
                alt="Selected"
                className="mt-2 w-full h-auto rounded-xl"
                width={300} height={300}
                objectFit='contain' />
            </div>
          )}
          <button
            onClick={handleAnalyze}
            className="bg-blue-500 text-white px-4 py-2 my-4 rounded"
          >
            Analyze Image
          </button>
          {analysisResult && (
            <div className="mt-4 text-white text-2xl">
              <h3 className="font-bold">Analysis Result:</h3>
              <pre>{JSON.stringify(analysisResult, null, 2)}</pre> {/* Display the result */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
