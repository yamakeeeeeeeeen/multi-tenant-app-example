import { z } from 'zod';

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  passwordHash: z.string(),
  tenantId: z.string(),
})

export type Account = z.infer<typeof AccountSchema>

export default AccountSchema;
