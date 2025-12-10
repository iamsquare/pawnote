import { Injectable } from '@nestjs/common';
import { PrismaService, UserResponseDto, UserUpdateDto } from '@repo/api';
import { merge } from 'remeda';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<UserResponseDto> {
    const [user, petsCount] = await this.prisma.$transaction([
      this.prisma.user.findUniqueOrThrow({
        where: { id },
      }),
      this.prisma.user.count({
        where: { id },
      }),
    ]);

    return merge(user, { petsCount });
  }

  async update(
    id: string,
    updateUserDto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    const [user, petsCount] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      }),
      this.prisma.user.count({
        where: { id },
      }),
    ]);

    return merge(user, { petsCount });
  }
}
