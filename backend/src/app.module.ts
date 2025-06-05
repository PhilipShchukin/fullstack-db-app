import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MessageModule } from './message/message.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    DatabaseModule,
    MessageModule,
  ],
})
export class AppModule {} 