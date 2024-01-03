"use server"

import { fileShareContainer, generateUploadUrlOnBlobStorage } from "./infrastructure/azureStorageBlob"
import { initFileShareUploadAction } from "./fileShare/initFileShareUploadAction"

export const initFileShareUpload = initFileShareUploadAction(
  generateUploadUrlOnBlobStorage(fileShareContainer),
)