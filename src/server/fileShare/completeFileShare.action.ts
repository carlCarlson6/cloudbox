import { z } from "zod"
import type { ReadFileShareState, UpsertFileShareState } from "./fileShareStateRepository";

export const completeFileShareCommandSchema = z.object({
  fileShareId: z.object({
    slug: z.string().min(1),
    owner: z.string().email()
  })
});

export const completeFileShareAction = (
  read: ReadFileShareState,
  upsert: UpsertFileShareState
) => async (
  command: z.infer<typeof completeFileShareCommandSchema>
) => {
  const {fileShareId} = await completeFileShareCommandSchema.parseAsync(command);
  
  const state = await read(fileShareId);
  if (!state) {
    throw new Error("file share not found");
  }

  const expiresOn = new Date();
  expiresOn.setHours(expiresOn.getHours()+5*24)
  
  await upsert(fileShareId, {
    ...state,
    status: 'UPLOADED',
    expiresOn,
  });
}