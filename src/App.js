import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import FileOptionItem from './components/FileOptionItem';
import { svg2png } from 'svg-png-converter';

const App = () => {
  const [files, setFiles] = useState([]);
  const [commonOptions, setCommonOptions] = useState({
    width: null,
    height: null,
  });

  const handleUploadImg = (files) => {
    setFiles(files);
  };

  const handleChangeComOpt = (e) => {
    setCommonOptions({ ...commonOptions, [e.target.name]: e.target.value });
  };

  const initDowloadFile = async (uploadedFileAsString, options) => {
    const includeWH =
      !!uploadedFileAsString.match(/^<svg.*?width="(\d+)/) ||
      !!uploadedFileAsString.match(/^<svg.*?width="(\d+)/);

    const svg = includeWH
      ? uploadedFileAsString.replace(
          /(width=")\d+("\W+height=")\d+/,
          `$1${options.width}$2${options.height}`
        )
      : uploadedFileAsString.replace(
          `<svg`,
          `<svg width="${options.width}" height="${options.height}"`
        );
    let img = await svg2png({
      input: svg.trim(),
      encoding: 'dataURL',
      format: 'png',
      width: options.width,
      height: options.height,
      multiplier: 0,
      enableRetinaScaling: true,
      quality: 1,
    });
    const a = document.createElement('a');
    a.download = 'export_' + Date.now() + '.png';
    a.href = img;
    a.click();
  };

  const handleClickDownload = async () => {
    files.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        initDowloadFile(reader.result, file.options);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>SVG to PNG</h1>
        </div>
      </header>
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            <div className='rounded-lg h-full'>
              <FileUploader onUploadFileFunc={handleUploadImg} />
              <div className='w-full mt-10'>
                <button
                  onClick={handleClickDownload}
                  className='bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded-md px-5 py-2 mx-auto block text-white transition duration-500 ease-in-out'
                >
                  download
                </button>
              </div>
              {files.length ? (
                <div className='grid grid-cols-6 gap-6 pt-6'>
                  <div className='col-span-3'>
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
                      onChange={handleChangeComOpt}
                      className='border-2 border-gray-200 mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='col-span-3'>
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
                      onChange={handleChangeComOpt}
                      className='border-2 border-gray-200 mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              ) : null}
              <div className='w-full mt-10'>
                {files.map((file, index) => {
                  return (
                    <FileOptionItem
                      key={file.name + index}
                      file={file}
                      commonWidth={commonOptions.width}
                      commonHeight={commonOptions.height}
                      onChangeOptions={({ width, height }) => {
                        file['options'] = { width, height };
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
