import { z } from "zod"

const UserAccountSchema = z.object({
  id: z.string().uuid(),
  reatedAt: z.date(),
  updatedAt: z.date(),
  tenantId: z.string(),
  accountId: z.string(),
})

export type UserAccount = z.infer<typeof UserAccountSchema>
