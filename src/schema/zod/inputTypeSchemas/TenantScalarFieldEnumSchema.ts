import { z } from 'zod';

export const TenantScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','subdomain']);

export default TenantScalarFieldEnumSchema;
