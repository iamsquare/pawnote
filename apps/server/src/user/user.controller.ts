import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserResponseDto, UserUpdateDto } from '@repo/api';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMe(@Session() session: UserSession): Promise<UserResponseDto> {
    return this.userService.findOne(session.user.id);
  }

  @Patch()
  update(
    @Session() session: UserSession,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(session.user.id, updateUserDto);
  }
}
