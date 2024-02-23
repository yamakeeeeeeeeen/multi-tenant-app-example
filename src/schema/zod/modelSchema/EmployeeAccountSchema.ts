import { z } from 'zod';

/////////////////////////////////////////
// EMPLOYEE ACCOUNT SCHEMA
/////////////////////////////////////////

export const EmployeeAccountSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string(),
  accountId: z.string(),
})

export type EmployeeAccount = z.infer<typeof EmployeeAccountSchema>

export default EmployeeAccountSchema;
