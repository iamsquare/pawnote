import { Timezone, UnitSystem } from '@repo/db';
import { createZodDto } from 'nestjs-zod';
import * as z from 'zod/mini';

import { StringSchema } from '../common.schema';
import { PetSchema } from '../pet/pet.schema';

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  name: StringSchema,
  image: z.nullable(z.string()),
  timezone: z.enum(Timezone),
  unitSystem: z.enum(UnitSystem),
  createdAt: z.date(),
  updatedAt: z.date(),
  pets: z.array(PetSchema),
  sessions: z.array(z.any()),
  accounts: z.array(z.any()),
});
export class UserDto extends createZodDto(UserSchema) {}

export const UserResponseSchema = z.intersection(
  z.omit(UserSchema, {
    sessions: true,
    accounts: true,
    pets: true,
  }),
  z.object({
    petsCount: z.number(),
  }),
);
export class UserResponseDto extends createZodDto(UserResponseSchema) {}

export const UserFindByEmailSchema = z.object({
  email: z.email(),
});

export class UserFindByEmailDto extends createZodDto(UserFindByEmailSchema) {}

export const UserUpdateSchema = z.partial(
  z.omit(UserSchema, {
    id: true,
    email: true,
    emailVerified: true,
    createdAt: true,
    updatedAt: true,
    pets: true,
    sessions: true,
    accounts: true,
  }),
);
export class UserUpdateDto extends createZodDto(UserUpdateSchema) {}
