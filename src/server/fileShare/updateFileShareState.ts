import { TableClient } from "@azure/data-tables";
import { z } from "zod"

const fileShareStatesSchema = z.union([
  z.object({
    status: z.literal('PENDING_TO_UPLOAD'),
  }),
  z.object({
    status: z.literal("UPLOADED"),
    filePath: z.string().min(1),
    expiresOn: z.date()
  }),
]);


export const upsertFileShareState = (fileSharesTable: TableClient) => async (id: string, status: z.infer<typeof fileShareStatesSchema>) => {
  await fileSharesTable.createEntity({ partitionKey: 'fileshares', rowKey: id, ...status })
}