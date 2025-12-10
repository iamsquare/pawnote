import { createZodDto } from 'nestjs-zod';
import * as z from 'zod/mini';

export const StringSchema = z.string().check(z.trim(), z.minLength(1), z.maxLength(255));
export const PasswordSchema = z.string().check(z.trim(), z.minLength(8), z.maxLength(32));

export const PaginationQuerySchema = z.object({
  page: z.optional(z.coerce.number().check(z.minimum(1))),
  limit: z.optional(z.coerce.number().check(z.minimum(1), z.maximum(100))),
});
export class PaginationQueryDto extends createZodDto(PaginationQuerySchema) {}

export const createPaginatedResponseSchema = <T extends z.ZodMiniType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      totalPages: z.number(),
    }),
  });

export type PaginatedResponse<T extends z.ZodMiniType> = {
  data: z.infer<T>[];
  meta: z.infer<ReturnType<typeof createPaginatedResponseSchema<T>>>['meta'];
};
