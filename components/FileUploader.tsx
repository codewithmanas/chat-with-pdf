"use client";

import React, { useCallback, useEffect } from "react";
import {useDropzone} from 'react-dropzone';


import {
    CheckCircleIcon,
    CircleArrowDown,
    HammerIcon,
    RocketIcon,
    SaveIcon,
} from "lucide-react";
import useUpload, { StatusText } from "@/hooks/useUpload";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const FileUploader = () => {
    const { progress, status, fileId, handleUpload } = useUpload();
    const { toast } = useToast();

    console.log("FileUploader", progress, status, fileId);

    const router = useRouter();

    useEffect(() => {
            if(fileId) {
                router.push(`/dashboard/${fileId}`)

                // toast({
                //     title: "File uploaded successfully",
                //     description: "View your file here",
                //   })
            }

    }, [fileId, router]);


    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Do something with the files

        console.log("Drop Files", acceptedFiles);

        const file = acceptedFiles[0];

        if(file) {
            await handleUpload(file);
        } else {
            // do something
            // toast...
            toast({
                title: "Failed to upload file",
                description: "Please try again",
              })
            
        }

      }, [handleUpload, toast]);


    //   const statusIcons = {
    //     [StatusText.UPLOADING]: <CircleArrowDown className="w-16 h-16" />,
    //     [StatusText.UPLOADED]: <CheckCircleIcon className="w-16 h-16" />,
    //     [StatusText.SAVING]: <SaveIcon className="w-16 h-16" />,
    //     [StatusText.GENERATING]: <HammerIcon className="w-16 h-16" />,
    //   }

    const statusIcons: {
        [key in StatusText]: JSX.Element
    } = {
        [StatusText.UPLOADING]: <RocketIcon className="h-20 w-20 text-amber-600" />,
        [StatusText.UPLOADED]: <CheckCircleIcon className="h-20 w-20 text-amber-600" />,
        [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-amber-600" />,
        [StatusText.GENERATING]: <HammerIcon className="h-20 w-20 text-amber-600 animate-bounce" />,
    }

      const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
          'application/pdf': ['.pdf'],
        },
    })

    const uploadInProgress = progress != null && progress >= 0 && progress <= 100;



  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">

        {/* Loading... Tomorrow */}
        {
            uploadInProgress && (
                <div className="mt-32 flex flex-col justify-center items-center gap-5">
                    <div 
                        className={`radial-progress bg-amber-300 text-white border-amber-600 border-4 ${ progress === 100 && "hidden"}`}
                        role="progressbar"
                        style={{ 
                            // @ts-ignore
                            "--value": progress,
                            "--size": "12rem",
                            "--thickness": "1.3rem",
                        }}
                    >
                        {progress} %
                    </div>

                    {/* Render Status Icon */}

                    {
                        // @ts-ignore
                        statusIcons[status!]
                    }

                    {/* @ts-ignore */}
                    <p className="text-amber-600 animate-pulse">{status}</p>
                </div>
            )
        }


        { !uploadInProgress &&
            (
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
        )}
    </div>
  )
};

export default FileUploader;
