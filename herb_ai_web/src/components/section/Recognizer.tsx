"use client"

import Image from 'next/image';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { style } from '@/src/utils/style';

const Recognizer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a URL for the selected image
    }
  };

  const handleAnalyze = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedImage) return "No selected image";

    setAnalysisResult(null);
    setLoading(true);
    setError(null);

    try {
      // Fetch the image as a blob
      const file = await fetch(selectedImage).then(res => res.blob());

      // Convert the image Blob to a base64 string
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1];

        if (base64Image) {
          // Create the request body with the base64 image
          const requestBody = { "imageBuffer": base64Image };

          try {
            const response = await fetch('http://192.168.31.182:5000/predict', {
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
              setError('Server is down. Please try contacting the owner.');
              console.error('Error analyzing image:', response.statusText);
            }
          } catch (networkError) {
            setError('Server is down. Please try again later.');
            console.error('Network error:', networkError);
          }
        } else {
          setError('Error selecting image: No base64 image');
          console.error('Error selecting image:', 'No base64 image');
        }
      };

      reader.readAsDataURL(file); // Start reading the image as a base64 string
    } catch (error) {
      setError('Server is down. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeNext = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={`${style.paddingX} w-full h-full bg-tertiary flex flex-col justify-center items-center rounded-3xl shadow-2xl py-5`}>
      <div className='w-full h-full flex flex-col justify-center items-start'>
        <h2 className={`${style.sectionHeadText} text-primary/80`}> Let Us... Recognize</h2>
        <p className={`${style.sectionSubText} text-primary/60`}>Herbs in your images</p>
      </div>
      <div className="backdrop-blur-sm bg-white/10 p-10 w-full rounded-2xl shadow-lg z-10 mt-10">
        <div className="flex flex-col items-center justify-center max-sm:px-0 px-10">
          {selectedImage ? "" : (
            <div {...getRootProps({ className: 'border-2 rounded-xl border-gray-400 p-4 w-full h-[100px] text-center bg-white/50 cursor-pointer' })}>
              <input {...getInputProps()} />
              <p className='text-black max-sm:text-sm'>Drag &apos;n&apos; drop an image here, or click to select one</p>
            </div>
          )}
          <div className="flex max-sm:flex-col flex-row items-center justify-center p-4 w-full bg-white/50 rounded-xl my-5">
            {selectedImage && (
              <div className="w-full h-auto max-h-[300px] max-w-[300px]">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-auto rounded-xl"
                  width={500}
                  height={500} />
              </div>
            )}
            <div className='flex flex-col items-center justify-center w-full'>
              {error && (
                <div className="m-10 text-red-500 text-2xl font-semibold flex items-center justify-center text-wrap break-words w-full max-w-[300px] bg-primary/20 rounded-lg p-2">
                  <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
              )}
              {analysisResult && (
                <div className="w-full">
                  {loading ? (
                    <div className="m-10 text-black text-5xl font-semibold flex items-center justify-center text-wrap break-words w-full max-w-[300px] bg-primary/20 rounded-lg p-2">
                      <pre>Analyzing...</pre>
                    </div>
                  ) : (
                    analysisResult && (
                        <div className="m-10 text-black text-5xl font-semibold flex items-center justify-center text-wrap break-words w-full max-w-[300px] bg-primary/20 rounded-lg p-2">
                        <pre>{analysisResult}</pre>
                      </div>
                    )
                  )}
                </div>
              )}
              <div className='mt-2'>
                {(selectedImage && !analysisResult) ? (
                  <button
                    onClick={handleAnalyze}
                    className="bg-primary text-secondary px-4 py-4 rounded-xl cursor-pointer"
                  >
                    Analyze Image
                  </button>
                ) : (
                  <button
                    onClick={handleAnalyzeNext}
                    className="bg-primary text-secondary px-4 py-4 rounded-xl cursor-pointer"
                  >
                    Analyze Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recognizer;