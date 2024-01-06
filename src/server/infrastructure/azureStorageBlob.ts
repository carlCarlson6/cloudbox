import { BlobServiceClient, type ContainerClient, StorageSharedKeyCredential, BlobSASPermissions } from "@azure/storage-blob";
import { env } from "~/env";

const sharedKeyCredential = new StorageSharedKeyCredential(env.STORAGE_ACCOUNT_NAME, env.STORAGE_ACCOUNT_KEY);
const blobServiceClient = new BlobServiceClient(
  `https://${env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  sharedKeyCredential
);

export const fileShareContainer = blobServiceClient.getContainerClient(env.FILE_SHARE_CONTAINER_NAME);


export const generateUploadUrlOnBlobStorage = (
  container: ContainerClient
) => async (
  filePath: string
) => {
  await fileShareContainer.createIfNotExists();
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

export type GenerateUploadUrl = (filePath: string) => Promise<string>;