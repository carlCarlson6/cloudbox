import { z } from "zod";
import { generateUploadUrlOnBlobStorage } from "../infrastructure/azureStorageBlob";
import { generate } from "shortid";

export const initFileShareUploadCommandSchema = z.object({
  userEmail: z.string().email(),
  fileName: z.string().min(1),
});

export const initFileShareUploadAction = (
  generateUploadUrl: ReturnType<typeof generateUploadUrlOnBlobStorage>
) => async ({
  userEmail, fileName,
}: z.infer<typeof initFileShareUploadCommandSchema>) => {
  const fileShareId = generate();

  return {
    slug: fileShareId,
    uploadUrl: await generateUploadUrl(`${fileShareId}/${fileName}`)
  }
};