import { z } from "zod";
import type { GenerateUploadUrl } from "../infrastructure/azureStorageBlob";
import { generate } from "shortid";
import type { UpsertFileShareState } from "./fileShareRepository";

export const initFileShareUploadCommandSchema = z.object({
  owner: z.string().email(),
  fileName: z.string().min(1),
});

export const initFileShareUploadAction = ({generateUploadUrl, upsertFileShareState}: {
  generateUploadUrl: GenerateUploadUrl,
  upsertFileShareState: UpsertFileShareState
}) => async (
  command: z.infer<typeof initFileShareUploadCommandSchema>
) => {
  const {owner, fileName} = await initFileShareUploadCommandSchema.parseAsync(command)
  const slug = generate();
  const filePath = `${slug}/${fileName}`;
  await upsertFileShareState({slug, owner}, { status: 'PENDING_TO_UPLOOAD', owner, filePath });
  return {
    slug,
    uploadUrl: await generateUploadUrl(filePath)
  }
};