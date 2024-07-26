"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PlaceHolderDocument = () => {
    const router = useRouter();

    const handleClick = () => {
            // Check if user is FREE tier and if they are over the file limit, push to the upgrade page

            router.push('/dashboard/upload')
    }

  return (
    <Button 
        onClick={handleClick}
        className="font-inter flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400">
      <PlusCircleIcon className="h-16 w-16" />
      <p>Add a document</p>
    </Button>
  );
};

export default PlaceHolderDocument;
