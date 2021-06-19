import React from 'react';
import Menu from './components/Menu';
import FileUploader from './components/FileUploader';
const App = () => {
  return (
    <div>
      {/* <Menu /> */}

      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Svg to png converter
          </h1>
        </div>
      </header>
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            <div className='rounded-lg h-full'>
              <FileUploader />
              <div className='w-full mt-10'>
                <button className='bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded-md px-5 py-2 mx-auto block text-white transition duration-500 ease-in-out'>
                  download
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
