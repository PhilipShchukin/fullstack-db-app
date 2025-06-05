import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';

import {
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Controller('api/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async addMessage(@Body() dto: MessageDto) {
    return this.messageService.addMessage(dto.content, dto.databaseId);
  }

  @Get('search')
  async searchMessage(@Query('content') content: string, @Query('databaseId') dbId: string) {
    return this.messageService.searchMessage(content, Number(dbId));
  }

  @Get()
  async getAll(@Query('databaseId') dbId: string) {
    return this.messageService.getAllMessages(Number(dbId));
  }
}