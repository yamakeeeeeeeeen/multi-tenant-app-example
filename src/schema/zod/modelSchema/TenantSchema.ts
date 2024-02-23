import { z } from 'zod';

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  subdomain: z.string(),
})

export type Tenant = z.infer<typeof TenantSchema>

export default TenantSchema;
