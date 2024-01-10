"use server"

import { fileShareContainer, generateUploadUrlOnBlobStorage } from "./infrastructure/azureStorageBlob"
import { initFileShareUploadAction } from "./fileShare/initFileShareUpload.action"
import { getFileShareUrlFromAzureBlobStorage, readFileShateStateOnAzureTable, upsertFileShareStateOnAzureTable } from "./fileShare/fileShareRepository"
import { buildFileShareStatesTableClient, } from "./infrastructure/azureDataTable"
import { completeFileShareAction } from "./fileShare/completeFileShare.action"

const upsertFileShareState = upsertFileShareStateOnAzureTable(buildFileShareStatesTableClient);

export const initFileShareUpload = initFileShareUploadAction({
  generateUploadUrl: generateUploadUrlOnBlobStorage(fileShareContainer),
  upsertFileShareState,
});

export const completeFileShare = completeFileShareAction(
  readFileShateStateOnAzureTable(buildFileShareStatesTableClient),
  upsertFileShareState,
  getFileShareUrlFromAzureBlobStorage(fileShareContainer)
);