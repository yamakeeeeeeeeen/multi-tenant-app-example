import { z } from 'zod'

const ShiftAssignmentSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  tenantId: z.string(),
  shiftId: z.string(),
  employeeId: z.string(),
})

export type ShiftAssignment = z.infer<typeof ShiftAssignmentSchema>
