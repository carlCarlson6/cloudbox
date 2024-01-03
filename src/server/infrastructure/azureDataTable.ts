import { AzureNamedKeyCredential, TableClient, TableServiceClient } from "@azure/data-tables";
import { env } from "~/env";

const credential = new AzureNamedKeyCredential(env.STORAGE_ACCOUNT_NAME, env.STORAGE_ACCOUNT_KEY);
const azureDataTableUrl = `https://${env.STORAGE_ACCOUNT_NAME}.table.core.windows.net`

type TableNames = 'fileShareStates';

const buildTableClient = async (tableName: TableNames) => {
  const fileSharesStateAzureTable = new TableClient(azureDataTableUrl, tableName, credential);
  await fileSharesStateAzureTable.createTable();
  return fileSharesStateAzureTable;
}

const buildFileShareStatesTableClient = () => buildTableClient('fileShareStates');