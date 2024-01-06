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
export type ReadFileShareState = (id: FileShareStateId) => Promise<FileShareState|undefined>;

export const upsertFileShareStateOnAzureTable = (
  buildTableClient: BuildTableClient
) => async (
  id: FileShareStateId, 
  status: FileShareState
) => {
  const fileSharesTable = await buildTableClient();
  await fileSharesTable.createEntity({ 
    partitionKey: id.owner, 
    rowKey: id.slug, 
    ...status 
  });
}

export const readFileShateStateOnAzureTable = (
  buildTableClient: BuildTableClient
): ReadFileShareState => async (
  id: FileShareStateId
) => {
  const fileSharesTable = await buildTableClient();
  const entity = await fileSharesTable.getEntity<FileShareState>(id.owner, id.slug);
  return entity;
}