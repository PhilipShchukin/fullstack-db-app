import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseDto } from './dto/database.dto';

@Controller('/api/database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('/init')
  init() {
    return this.databaseService.init();
  }

  @Post('/set-capacity')
  setCapacity(@Body() dto: DatabaseDto) {
    return this.databaseService.setCapacity(dto.capacity);
  }

  @Get('/state')
  getState() {
    return this.databaseService.getState();
  }


  @Patch(':id/reset')
  resetDatabase(@Param('id', ParseIntPipe) id: number) {
  return this.databaseService.resetDatabase(id);
}
}