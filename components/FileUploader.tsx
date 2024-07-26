"use client";

import React, { useCallback } from "react";
import {useDropzone} from 'react-dropzone';

import {
    CheckCircleIcon,
    CircleArrowDown,
    HammerIcon,
    RocketIcon,
    SaveIcon,
} from "lucide-react";

const FileUploader = () => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files

        console.log("Drop Files", acceptedFiles);

      }, []);

      const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({onDrop})

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">

        {/* Loading... Tomorrow */}
        <div {...getRootProps()}
            className={`p-10 border-2 border-dashed mt-10 w-[90%] border-amber-600 text-amber-600 rounded-lg h-96 flex items-center justify-center ${isFocused || isDragAccept ? "bg-amber-300" : "bg-amber-100"}`}
            >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center">
                {
                    isDragActive ?
                   ( 
                    <>
                        <RocketIcon className="h-20 w-20 animate-ping" />
                        <p>Drop the files here ...</p>
                    </>
                    ) : (
                        <>
                            <CircleArrowDown className="h-20 w-20 animate-bounce" />
                            <p>Drag {`'n'`} drop some files here, or click to select files</p>
                        </>
                    )
                }
            </div>
        </div>
    </div>
  )
};

export default FileUploader;