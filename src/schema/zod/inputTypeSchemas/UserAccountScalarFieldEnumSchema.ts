import { z } from 'zod';

export const UserAccountScalarFieldEnumSchema = z.enum(['id','tenantId','accountId']);

export default UserAccountScalarFieldEnumSchema;
