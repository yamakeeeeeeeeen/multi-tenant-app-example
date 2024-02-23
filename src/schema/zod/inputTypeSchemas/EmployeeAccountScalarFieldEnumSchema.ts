import { z } from 'zod';

export const EmployeeAccountScalarFieldEnumSchema = z.enum(['id','tenantId','accountId']);

export default EmployeeAccountScalarFieldEnumSchema;
