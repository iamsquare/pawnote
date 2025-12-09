import { Injectable } from '@nestjs/common';
import { PrismaService, UserCreateDto, UserFindByEmailDto } from '@repo/api';
import { hash } from 'bcrypt';
import { merge, omit, prop } from 'remeda';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(userFindByEmailDto: UserFindByEmailDto) {
    return this.prisma.user.findUnique({
      where: userFindByEmailDto,
      include: { pets: true },
    });
  }

  async create(createUserDto: UserCreateDto) {
    const hashedPassword = await hash(prop(createUserDto, 'password'), 10);

    return this.prisma.user.create({
      data: merge(omit(createUserDto, ['password']), {
        password: hashedPassword,
      }),
    });
  }
}
