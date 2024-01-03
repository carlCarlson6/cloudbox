import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {},
  server: {
    STORAGE_ACCOUNT_NAME:               z.string(),
    STORAGE_ACCOUNT_KEY:                z.string(),
  },

  runtimeEnv: {
    STORAGE_ACCOUNT_NAME:               process.env.STORAGE_ACCOUNT_NAME,
    STORAGE_ACCOUNT_KEY:                process.env.STORAGE_ACCOUNT_KEY,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
