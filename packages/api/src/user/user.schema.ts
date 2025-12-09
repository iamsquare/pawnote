import { Timezone, UnitSystem } from '@repo/db';
import { createZodDto } from 'nestjs-zod';
import * as z from 'zod/mini';

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.nullable(z.string()),
  imageUrl: z.nullable(z.string()),
  verified: z.boolean(),
  timezone: z.enum(Timezone),
  unitSystem: z.enum(UnitSystem),
});

export type UserModel = z.infer<typeof UserSchema>;
export class UserDto extends createZodDto(UserSchema) {}

export const UserCreateSchema = z.object({
  email: z.email(),
  password: z.string().check(z.trim(), z.minLength(8), z.maxLength(32)),
});

export class UserCreateDto extends createZodDto(UserCreateSchema) {}

export const UserFindByEmailSchema = z.object({
  email: z.email(),
});

export class UserFindByEmailDto extends createZodDto(UserFindByEmailSchema) {}
