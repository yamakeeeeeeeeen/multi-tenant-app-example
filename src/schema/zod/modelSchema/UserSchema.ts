import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  kana: z.string(),
  birthday: z.coerce.date(),
  gender: z.string(),
  postalCode: z.string(),
  address: z.string(),
  addressDetail: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
  careLevel: z.string(),
  comment: z.string().nullable(),
  isDeleted: z.boolean(),
  tenantId: z.string(),
  userAccountId: z.string(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
