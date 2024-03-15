import { z } from 'zod'

const ShiftSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  tenantId: z.string(),
  reservationId: z.string(),
  employeeId: z.string(),
})

export type Shift = z.infer<typeof ShiftSchema>
