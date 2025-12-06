import { createZodDto } from 'nestjs-zod';
import * as z from 'zod/mini';

export const UserCreateSchema = z.object({
  email: z.email(),
  firstName: z.string().check(z.trim(), z.minLength(1), z.maxLength(100)),
});

export class UserCreateDto extends createZodDto(UserCreateSchema) {}
