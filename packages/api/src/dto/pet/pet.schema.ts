import { Gender, Kind } from '@repo/db/enums';
import { createZodDto } from 'nestjs-zod';
import * as z from 'zod/mini';

import { createPaginatedResponseSchema, type PaginatedResponse, StringSchema } from '../common.schema';

export const PetSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.enum(Kind),
  breed: z.nullable(z.string()),
  dateOfBirth: z.coerce.date(),
  adoptedAt: z.nullable(z.coerce.date()),
  weight: z.nullable(z.number().check(z.positive())),
  gender: z.enum(Gender),
});
export class PetDto extends createZodDto(PetSchema) {}

export const PaginatedPetSchema = createPaginatedResponseSchema(PetSchema);
export class PaginatedPetDto extends createZodDto(PaginatedPetSchema) implements PaginatedResponse<typeof PetSchema> {}

export const CreatePetSchema = z.object({
  name: StringSchema,
  kind: z.enum(Kind),
  breed: z.optional(StringSchema),
  dateOfBirth: z.coerce.date(),
  adoptedAt: z.optional(z.coerce.date()),
  weight: z.optional(z.number().check(z.positive())),
  gender: z.enum(Gender),
});

export class CreatePetDto extends createZodDto(CreatePetSchema) {}

export const UpdatePetSchema = z.partial(CreatePetSchema);
export class UpdatePetDto extends createZodDto(UpdatePetSchema) {}
