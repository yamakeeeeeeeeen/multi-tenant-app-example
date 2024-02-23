import { z } from 'zod';

/////////////////////////////////////////
// USER ACCOUNT SCHEMA
/////////////////////////////////////////

export const UserAccountSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string(),
  accountId: z.string(),
})

export type UserAccount = z.infer<typeof UserAccountSchema>

export default UserAccountSchema;
