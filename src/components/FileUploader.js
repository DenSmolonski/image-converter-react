import React, { useState } from 'react';
import Canvg from 'canvg';

const FileUploader = () => {
  const [imgState, setImgState] = useState({
    file: null,
    imagePreviewUrl: null,
  });

  const handleChangeImage = (e) => {
    const canvas = document.createElement('canvas');
    // const canvgEl = new Canvg(canvas, '<svg></svg>');
    // console.log(canvgEl);

    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      //   setImgState({
      //     file: file,
      //     imagePreviewUrl: reader.result,
      //   });
      console.log(reader.result);
      const ccans = Canvg.fromString(canvas.getContext('2d'), reader.result);
      ccans.start();
      console.log(ccans);
      const img = canvas.toDataURL('image/png');
      console.log(img);
      const a = document.createElement('a');
      a.textContent = 'save';
      a.download = 'export_' + Date.now() + '.png';
      a.href = img;
      a.click();
    };

    reader.readAsText(file);
  };

  return (
    <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
      <div className='space-y-1 text-center'>
        <svg
          className='mx-auto h-12 w-12 text-gray-400'
          stroke='currentColor'
          fill='none'
          viewBox='0 0 48 48'
          aria-hidden='true'
        >
          <path
            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <div className='flex text-sm text-gray-600'>
          <label
            htmlFor='file-upload'
            className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
          >
            <span>Upload a file</span>
            <input
              id='file-upload'
              name='file-upload'
              type='file'
              className='sr-only'
              onChange={handleChangeImage}
            />
          </label>
          <p className='pl-1'>or drag and drop</p>
        </div>
        {/* <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p> */}
      </div>
    </div>
  );
};

export default FileUploader;
