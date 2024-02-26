import { z } from "zod"

export const TenantSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  subdomain: z.string(),
})

export type Tenant = z.infer<typeof TenantSchema>
