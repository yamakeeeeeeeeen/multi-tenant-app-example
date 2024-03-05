import { z } from 'zod'

const ShiftSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  support_content: z.string(),
  comment: z.string().optional(),
  tenantId: z.string(),
})

export type Shift = z.infer<typeof ShiftSchema>
