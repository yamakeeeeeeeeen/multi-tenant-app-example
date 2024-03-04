import { z } from 'zod'

const AccountSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tenantId: z.string(),
})

export type Account = z.infer<typeof AccountSchema>
