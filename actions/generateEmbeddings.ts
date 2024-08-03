"use server";

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
    auth().protect(); // Protect this route with Clerk

    //  turn a PDF into embeddings [0.0123456789, 0.123456789, 0.23456789, ...]
    await generateEmbeddingsInPineconeVectorStore(docId);

    revalidatePath("/dashboard");

    return { completed: true };
}