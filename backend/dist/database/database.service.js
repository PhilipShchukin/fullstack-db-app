"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DatabaseService = class DatabaseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async init() {
        const existing = await this.prisma.databaseMetadata.findFirst();
        if (existing)
            return existing;
        const now = new Date();
        const options = {
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
    async setCapacity(capacity) {
        if (capacity <= 0) {
            throw new common_1.BadRequestException('Invalid capacity');
        }
        const metadata = await this.prisma.databaseMetadata.findFirst();
        if (!metadata) {
            throw new common_1.NotFoundException('Metadata not found');
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
            throw new common_1.NotFoundException('Metadata not found');
        }
        return metadata;
    }
    async resetDatabase(databaseId) {
        const existing = await this.prisma.databaseMetadata.findUnique({
            where: { id: databaseId },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Database with id ${databaseId} not found`);
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
            this.prisma.$executeRawUnsafe(`ALTER SEQUENCE "Container_id_seq" RESTART WITH 1`),
        ]);
        return true;
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DatabaseService);
//# sourceMappingURL=database.service.js.map