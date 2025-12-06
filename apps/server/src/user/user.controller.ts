import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from '@repo/api';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserCreateDto) {
    return this.userService.create(createUserDto);
  }
}
