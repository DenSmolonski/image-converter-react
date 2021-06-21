import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import Canvg from "canvg";

const App = () => {
  const [uploadedFileAsString, setUploadedFileAsString] = useState(null);
  const [optionsFile, setOptionsFile] = useState({ width: 0, height: 0 });
  const [formValues, setFormValues] = useState({ width: 0, height: 0 });

  const handleUploadImg = (file, fileAsString, fileOpt) => {
    if (uploadedFileAsString !== fileAsString) {
      setUploadedFileAsString(fileAsString);
      setOptionsFile(fileOpt);
      setFormValues(fileOpt);
    }
  };

  const handleChangeInput = (e) => {
    if (!uploadedFileAsString) {
      setFormValues({
        ...formValues,
        [e.target.name]: Number.parseInt(e.target.value),
      });
      return;
    }

    const aspectRatio = optionsFile.width / optionsFile.height;

    switch (e.target.name) {
      case "width":
        setFormValues({
          width: Number.parseInt(e.target.value),
          height: Math.round(Number.parseInt(e.target.value) / aspectRatio),
        });
        break;
      case "height":
        setFormValues({
          height: Number.parseInt(e.target.value),
          width: Math.round(Number.parseInt(e.target.value) * aspectRatio),
        });
        break;
      default:
        break;
    }
  };

  const handleClickDownload = () => {
    const canvas = document.createElement("canvas");
    const svg = uploadedFileAsString.replace(
      /(width=")\d+("\W+height=")\d+"/,
      ""
    );
    const ccans = Canvg.fromString(canvas.getContext("2d"), svg);
    canvas.width = formValues.width;
    canvas.height = formValues.height;
    ccans.start();
    ccans.resize({ width: formValues.width, height: formValues.height });
    const img = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.textContent = "save";
    a.download = "export_" + Date.now() + ".png";
    a.href = img;
    a.click();
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Svg to png converter
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg h-full">
              <FileUploader onUploadFileFunc={handleUploadImg} />
              <div className="w-full mt-10">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-3">
                        <label
                          htmlFor="width"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Width
                        </label>
                        <input
                          type="number"
                          name="width"
                          id="width"
                          onChange={handleChangeInput}
                          value={formValues?.width}
                          className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="height"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Height
                        </label>
                        <input
                          type="number"
                          name="height"
                          id="height"
                          onChange={handleChangeInput}
                          value={formValues?.height}
                          className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-10">
                <button
                  onClick={handleClickDownload}
                  className="bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded-md px-5 py-2 mx-auto block text-white transition duration-500 ease-in-out"
                >
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
