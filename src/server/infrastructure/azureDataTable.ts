import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
import { env } from "~/env";

type AzureTableSettings = { 
  tableName:    string;
  accountName:  string;
  accountKey:   string;
  accountUrl:   string;
}

const buildTableClient = async ({tableName, accountName, accountKey, accountUrl }: AzureTableSettings) => {
  const fileSharesStateAzureTable = new TableClient(
    accountUrl, 
    tableName, 
    new AzureNamedKeyCredential(accountName, accountKey)
  );
  await fileSharesStateAzureTable.createTable();
  return fileSharesStateAzureTable;
}

export type BuildTableClient = () => Promise<TableClient>;

export const buildFileShareStatesTableClient = () => buildTableClient({
  tableName: env.FILE_SHARE_STATES_TABLE_NAME, 
  accountName: env.STORAGE_ACCOUNT_NAME,
  accountKey: env.STORAGE_ACCOUNT_KEY,
  accountUrl: `https://${env.STORAGE_ACCOUNT_NAME}.table.core.windows.net`,
});