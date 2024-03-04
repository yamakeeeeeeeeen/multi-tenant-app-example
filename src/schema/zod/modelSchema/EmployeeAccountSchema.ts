import { z } from 'zod'

const EmployeeAccountSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tenantId: z.string(),
  accountId: z.string(),
})

export type EmployeeAccount = z.infer<typeof EmployeeAccountSchema>
