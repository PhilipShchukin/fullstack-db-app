import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async init() {
    const existing = await this.prisma.databaseMetadata.findFirst();

    if (existing) return existing;

    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };

    return this.prisma.databaseMetadata.create({
      data: {
        name: now.toLocaleDateString('ru-RU', options)
      },
    });
  }

  async setCapacity(capacity: number) {
    if (capacity <= 0) {
      throw new BadRequestException('Invalid capacity');
    }

    const metadata = await this.prisma.databaseMetadata.findFirst();
    if (!metadata) {
      throw new NotFoundException('Metadata not found');
    }

    return this.prisma.databaseMetadata.update({
      where: { id: metadata.id },
      data: {
        containerCapacity: capacity,
        isInitialized: true,
      },
    });
  }

  async getState() {
    const metadata = await this.prisma.databaseMetadata.findFirst({
      include: {
        containers: true,
        messages: true,
      },
    });

    if (!metadata) {
      throw new NotFoundException('Metadata not found');
    }

    return metadata;
  }

  async resetDatabase(databaseId: number): Promise<boolean> {

    const existing = await this.prisma.databaseMetadata.findUnique({
      where: { id: databaseId },
    });
    
    if (!existing) {
      throw new NotFoundException(`Database with id ${databaseId} not found`);
    }

    await this.prisma.message.deleteMany({
      where: {
        container: {
          databaseId,
        },
      },
    });
    
    await this.prisma.container.deleteMany({
      where: {
        databaseId,
      },
    });
    
    await this.prisma.databaseMetadata.delete({
      where: { id: databaseId },
    });

  
    await this.prisma.$transaction([
      // Сбрасываем автоинкрементные id
      this.prisma.$executeRawUnsafe(`ALTER SEQUENCE "Container_id_seq" RESTART WITH 1`),
    ]);

    return true
  }

}