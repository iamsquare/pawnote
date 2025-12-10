import { createZodDto } from 'nestjs-zod';
import * as z from 'zod/mini';

import { PasswordSchema, StringSchema } from '../common.schema';

export const SignUpSchema = z.object({
  name: StringSchema,
  email: z.email(),
  password: PasswordSchema,
});

export class SignUpDto extends createZodDto(SignUpSchema) {}

export const SignInSchema = z.object({
  email: z.email(),
  password: PasswordSchema,
});
export class SignInDto extends createZodDto(SignInSchema) {}
