import { BlobSASPermissions, type ContainerClient } from "@azure/storage-blob";
import type { BuildTableClient } from "../infrastructure/azureDataTable";

type FileShareStateId = {
  owner: string,
  slug: string
}

type FileShareState = {
  status: 'PENDING_TO_UPLOOAD',
  owner: string,
  filePath: string,
} | {
  status: 'UPLOADED'
  owner: string,
  filePath: string,
  expiresOn: Date,
}

export type UpsertFileShareState = (id: FileShareStateId, status: FileShareState) => Promise<void>;

export const upsertFileShareStateOnAzureTable = (
  buildTableClient: BuildTableClient
) => async (
  id: FileShareStateId, 
  status: FileShareState
) => {
  const fileSharesTable = await buildTableClient();
  await fileSharesTable.upsertEntity({
    partitionKey: id.owner, 
      rowKey: id.slug, 
      ...status 
  });
}

export type ReadFileShareState = (id: FileShareStateId) => Promise<FileShareState|undefined>;

export const readFileShateStateOnAzureTable = (
  buildTableClient: BuildTableClient
): ReadFileShareState => async (
  id: FileShareStateId
) => {
  const fileSharesTable = await buildTableClient();
  const entity = await fileSharesTable.getEntity<FileShareState>(id.owner, id.slug);
  return entity;
}

export type GetFileShareUrl = (fileSharePath: string, expiresOn: Date) => Promise<string>;

export const getFileShareUrlFromAzureBlobStorage = (
  container: ContainerClient
): GetFileShareUrl => (
  fileSharePath: string,
  expiresOn: Date
) => container
  .getBlobClient(fileSharePath)
  .generateSasUrl({
    permissions: BlobSASPermissions.from({
      read: true,
    }),
    expiresOn
  });