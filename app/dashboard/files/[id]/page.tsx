import PDFView from "@/components/PdfView";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const ChatToFilePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  auth().protect();
  const { userId } = await auth();

  const ref = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .get();

  const url = ref.data()?.downloadUrl;

  return (
    <div className="grid lg:grid-cols-5 h-full overflow-hidden">
      {/* Right */}

      <div className="col-span-5 lg:col-span-2 overflow-y-auto">
        {/* Chat  */}
      </div>

      {/* Left */}
      <div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-amber-600 lg:-order-1 overflow-auto">
        <PDFView url={url} />
      </div>
    </div>
  );
};

export default ChatToFilePage;
