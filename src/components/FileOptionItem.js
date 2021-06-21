import React, { useEffect, useState } from 'react';

const FileOptionItem = ({ file, onChangeOptions }) => {
  const [uploadedFileAsString, setUploadedFileAsString] = useState(null);
  const [optionsFile, setOptionsFile] = useState({ width: 0, height: 0 });
  const [formValues, setFormValues] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let reader = new FileReader();
    let img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const opt = { width: img.width, height: img.height };
      setOptionsFile(opt);
      setFormValues(opt);
      if (onChangeOptions) {
        onChangeOptions(opt);
      }
    };

    reader.onloadend = () => {
      setUploadedFileAsString(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file, onChangeOptions]);

  const handleChangeInput = (e) => {
    const aspectRatio = optionsFile.width / optionsFile.height;
    let newFormValues = {};
    switch (e.target.name) {
      case 'width':
        newFormValues = {
          width: Number.parseInt(e.target.value),
          height: Math.round(Number.parseInt(e.target.value) / aspectRatio),
        };
        break;
      case 'height':
        newFormValues = {
          height: Number.parseInt(e.target.value),
          width: Math.round(Number.parseInt(e.target.value) * aspectRatio),
        };
        break;
      default:
        break;
    }
    setFormValues(newFormValues);
    if (onChangeOptions) {
      onChangeOptions(newFormValues);
    }
  };

  return (
    <div className='w-full mt-10'>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-5 bg-white sm:p-6'>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-2'>
              {uploadedFileAsString ? (
                <img
                  className='h-32'
                  src={uploadedFileAsString}
                  alt={file.name}
                />
              ) : (
                'Loading...'
              )}
            </div>
            <div className='col-span-2'>
              <label
                htmlFor='width'
                className='block text-sm font-medium text-gray-700'
              >
                Width
              </label>
              <input
                type='number'
                name='width'
                id='width'
                onChange={handleChangeInput}
                value={formValues?.width}
                className='mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            <div className='col-span-2'>
              <label
                htmlFor='height'
                className='block text-sm font-medium text-gray-700'
              >
                Height
              </label>
              <input
                type='number'
                name='height'
                id='height'
                onChange={handleChangeInput}
                value={formValues?.height}
                className='mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileOptionItem;
