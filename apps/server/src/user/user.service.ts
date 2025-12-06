import { Injectable } from '@nestjs/common';
import { PrismaService, UserCreateDto } from '@repo/api';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: UserCreateDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
}
