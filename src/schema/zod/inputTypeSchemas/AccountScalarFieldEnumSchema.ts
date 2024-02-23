import { z } from 'zod';

export const AccountScalarFieldEnumSchema = z.enum(['id','email','passwordHash','tenantId']);

export default AccountScalarFieldEnumSchema;
