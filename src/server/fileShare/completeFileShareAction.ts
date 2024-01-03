import { z } from "zod"

export const completeFileShareCommandSchema = z.object({
  id: z.string().min(1)
});

export const completeFileShareAction = () => ({
  id: fileShareId
}: z.infer<typeof completeFileShareCommandSchema>) => {

}