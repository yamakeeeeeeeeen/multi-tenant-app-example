import { z } from 'zod'

const ReservationSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  support_content: z.string(),
  comment: z.string().optional(),
  tenantId: z.string(),
  userId: z.string(),
})

export type Reservation = z.infer<typeof ReservationSchema>

export const ReservationFormSchema = ReservationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
}).refine((data) => data.startTime < data.endTime, {
  message: '開始時間は終了時間より前に設定してください。',
  path: ['startTime'],
})

export type ReservationForm = z.infer<typeof ReservationFormSchema>
