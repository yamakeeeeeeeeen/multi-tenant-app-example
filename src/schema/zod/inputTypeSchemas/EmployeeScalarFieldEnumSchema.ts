import { z } from 'zod';

export const EmployeeScalarFieldEnumSchema = z.enum(['id','name','kana','gender','color','hireDate','contractEndDate','jobType','division1','division2','qualification','payment','carDriving','move1hour','multipleAssignments','postalCode','address','addressDetail','phone','email','comment','tenantId','employeeAccountId']);

export default EmployeeScalarFieldEnumSchema;
