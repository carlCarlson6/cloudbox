import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {},
  server: {
    STORAGE_ACCOUNT_NAME:           z.string(),
    STORAGE_ACCOUNT_KEY:            z.string(),
    FILE_SHARE_CONTAINER_NAME:      z.string(),
    FILE_SHARE_STATES_TABLE_NAME:   z.string(),
  },

  runtimeEnv: {
    STORAGE_ACCOUNT_NAME:         process.env.STORAGE_ACCOUNT_NAME,
    STORAGE_ACCOUNT_KEY:          process.env.STORAGE_ACCOUNT_KEY,
    FILE_SHARE_CONTAINER_NAME:    process.env.FILE_SHARE_CONTAINER_NAME,
    FILE_SHARE_STATES_TABLE_NAME: process.env.FILE_SHARE_STATES_TABLE_NAME  
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
