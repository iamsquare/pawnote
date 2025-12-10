import { Injectable } from '@nestjs/common';
import {
  CreatePetDto,
  PaginatedPetDto,
  PaginationQueryDto,
  PetDto,
  PrismaService,
  UpdatePetDto,
} from '@repo/api';
import { Prisma } from '@repo/db';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  create(ownerId: string, createPetDto: CreatePetDto): Promise<PetDto> {
    return this.prisma.pet.create({
      data: {
        ...createPetDto,
        ownerId,
      },
    });
  }

  async findAll(
    ownerId: string,
    { page = 1, limit = 10 }: PaginationQueryDto,
  ): Promise<PaginatedPetDto> {
    const skip = (page - 1) * limit;

    const where: Prisma.PetWhereInput = {
      ownerId,
      toDelete: false,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.pet.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.pet.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(ownerId: string, id: string): Promise<PetDto> {
    return this.prisma.pet.findUniqueOrThrow({
      where: { id, ownerId, toDelete: false },
    });
  }

  update(
    ownerId: string,
    id: string,
    updatePetDto: UpdatePetDto,
  ): Promise<PetDto> {
    return this.prisma.pet.update({
      where: { id, ownerId, toDelete: false },
      data: updatePetDto,
    });
  }

  remove(ownerId: string, id: string): Promise<PetDto> {
    return this.prisma.pet.delete({
      where: { id, ownerId, toDelete: false },
    });
  }

  restore(ownerId: string, id: string): Promise<PetDto> {
    return this.prisma.pet.update({
      where: { id, ownerId, toDelete: true },
      data: { toDelete: false },
    });
  }
}
