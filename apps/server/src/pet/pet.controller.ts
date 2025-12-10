import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatePetDto,
  PaginatedPetDto,
  PaginationQueryDto,
  PetDto,
  UpdatePetDto,
} from '@repo/api';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(
    @Session() session: UserSession,
    @Body() createPetDto: CreatePetDto,
  ): Promise<PetDto> {
    return this.petService.create(session.user.id, createPetDto);
  }

  @Get()
  findAll(
    @Session() session: UserSession,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedPetDto> {
    return this.petService.findAll(session.user.id, query);
  }

  @Get(':id')
  findOne(@Session() session: UserSession, @Param('id') id: string) {
    return this.petService.findOne(session.user.id, id);
  }

  @Patch(':id')
  update(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petService.update(session.user.id, id, updatePetDto);
  }

  @Delete(':id')
  remove(@Session() session: UserSession, @Param('id') id: string) {
    return this.petService.remove(session.user.id, id);
  }

  @Patch(':id/restore')
  restore(@Session() session: UserSession, @Param('id') id: string) {
    return this.petService.restore(session.user.id, id);
  }
}
