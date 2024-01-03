import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential, BlobSASPermissions } from "@azure/storage-blob";
import { env } from "~/env";

const sharedKeyCredential = new StorageSharedKeyCredential(env.STORAGE_ACCOUNT_NAME, env.STORAGE_ACCOUNT_KEY);
const blobServiceClient = new BlobServiceClient(
  `https://${env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  sharedKeyCredential
);

export const fileShareContainer = blobServiceClient.getContainerClient('file-share');

export const generateUploadUrlOnBlobStorage = (
  container: ContainerClient
) => async (
  filePath: string
) => {
  const expiresOn = new Date();
  expiresOn.setHours(expiresOn.getHours()+1)
  return await container
    .getBlobClient(filePath)
    .generateSasUrl({
      expiresOn,
      permissions: BlobSASPermissions.from({
        create: true
      }),
    })
}
