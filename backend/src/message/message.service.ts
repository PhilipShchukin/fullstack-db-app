import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import {
    BadRequestException,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async addMessage(content: string, databaseId: number) {
    // Валидация сообщения
    if (!/^[a-zA-Z0-9\s\.\,\!\?]*$/.test(content) || content.length > 10) {
      throw new BadRequestException('Invalid message');
    }

    return this.prisma.$transaction(async (tx) => {
      // Проверка уникальности
      const existing = await tx.message.findFirst({
        where: { content, databaseId },
      });
      if (existing) throw new ConflictException('Message must be unique');

      // Получение метаданных
      const meta = await tx.databaseMetadata.findUnique({
        where: { id: databaseId },
      });
      if (!meta || !meta.isInitialized || !meta.containerCapacity)
        throw new NotFoundException('Database not initialized');

      // Поиск свободного контейнера
      let container = await tx.container.findFirst({
        where: {
          databaseId,
          currentCount: { lt: meta.containerCapacity },
        },
        orderBy: { id: 'asc' },
      });

      // Если не найден — создать новый
      if (!container) {
        container = await tx.container.create({
          data: {
            databaseId,
            capacity: meta.containerCapacity,
          },
        });
      }

      // Добавление сообщения
      const message = await tx.message.create({
        data: {
          content,
          containerId: container.id,
          databaseId,
        },
      });

      // Обновление счетчиков
      await tx.container.update({
        where: { id: container.id },
        data: {
          currentCount: { increment: 1 },
        },
      });

      await tx.databaseMetadata.update({
        where: { id: databaseId },
        data: {
          totalMessages: { increment: 1 },
        },
      });

      return message;
    });
  }

  async searchMessage(content: string, databaseId: number) {
    const result = await this.prisma.message.findFirst({
      where: {
        content,
        databaseId,
      },
      include: {
        container: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Message not found');
    }

    return {
      message: result.content,
      containerId: result.container.id,
    };
  }

  async getAllMessages(databaseId: number) {
    return this.prisma.message.findMany({
      where: { databaseId },
      include: {
        container: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}