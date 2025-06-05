import { PrismaService } from 'src/prisma/prisma.service';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    addMessage(content: string, databaseId: number): Promise<{
        id: number;
        content: string;
        containerId: number;
        databaseId: number;
        createdAt: Date;
    }>;
    searchMessage(content: string, databaseId: number): Promise<{
        message: string;
        containerId: number;
    }>;
    getAllMessages(databaseId: number): Promise<({
        container: {
            id: number;
            databaseId: number;
            createdAt: Date;
            capacity: number;
            currentCount: number;
        };
    } & {
        id: number;
        content: string;
        containerId: number;
        databaseId: number;
        createdAt: Date;
    })[]>;
}
