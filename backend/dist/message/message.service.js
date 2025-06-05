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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let MessageService = class MessageService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addMessage(content, databaseId) {
        if (!/^[a-zA-Z0-9\s\.\,\!\?]*$/.test(content) || content.length > 10) {
            throw new common_2.BadRequestException('Invalid message');
        }
        return this.prisma.$transaction(async (tx) => {
            const existing = await tx.message.findFirst({
                where: { content, databaseId },
            });
            if (existing)
                throw new common_2.ConflictException('Message must be unique');
            const meta = await tx.databaseMetadata.findUnique({
                where: { id: databaseId },
            });
            if (!meta || !meta.isInitialized || !meta.containerCapacity)
                throw new common_2.NotFoundException('Database not initialized');
            let container = await tx.container.findFirst({
                where: {
                    databaseId,
                    currentCount: { lt: meta.containerCapacity },
                },
                orderBy: { id: 'asc' },
            });
            if (!container) {
                container = await tx.container.create({
                    data: {
                        databaseId,
                        capacity: meta.containerCapacity,
                    },
                });
            }
            const message = await tx.message.create({
                data: {
                    content,
                    containerId: container.id,
                    databaseId,
                },
            });
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
    async searchMessage(content, databaseId) {
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
            throw new common_2.NotFoundException('Message not found');
        }
        return {
            message: result.content,
            containerId: result.container.id,
        };
    }
    async getAllMessages(databaseId) {
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
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessageService);
//# sourceMappingURL=message.service.js.map