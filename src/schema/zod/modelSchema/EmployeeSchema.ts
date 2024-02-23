import { z } from 'zod';

/////////////////////////////////////////
// EMPLOYEE SCHEMA
/////////////////////////////////////////

export const EmployeeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  kana: z.string(),
  gender: z.string(),
  color: z.string(),
  hireDate: z.coerce.date(),
  contractEndDate: z.coerce.date().nullable(),
  jobType: z.string(),
  division1: z.string().nullable(),
  division2: z.string().nullable(),
  qualification: z.string().nullable(),
  payment: z.number(),
  carDriving: z.boolean(),
  move1hour: z.boolean(),
  multipleAssignments: z.boolean(),
  postalCode: z.string(),
  address: z.string(),
  addressDetail: z.string().nullable(),
  phone: z.string(),
  email: z.string(),
  comment: z.string().nullable(),
  tenantId: z.string(),
  employeeAccountId: z.string(),
})

export type Employee = z.infer<typeof EmployeeSchema>

export default EmployeeSchema;
