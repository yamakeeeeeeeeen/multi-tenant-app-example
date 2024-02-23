import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','kana','birthday','gender','postalCode','address','addressDetail','email','phone','careLevel','comment','isDeleted','tenantId','userAccountId']);

export default UserScalarFieldEnumSchema;
