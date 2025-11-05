import { databases } from "./appwrite";

export const fetcher = async (collectionId, documentId = "") => {
  const res = await databases.getDocument(
    "[DATABSE_ID]",
    collectionId,
    documentId
  );
  return res;
};
