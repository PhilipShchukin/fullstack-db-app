import { PrismaService } from 'src/prisma/prisma.service';
export declare class DatabaseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    init(): Promise<{
        id: number;
        name: string | null;
        containerCapacity: number | null;
        totalMessages: number;
        isInitialized: boolean;
        createdAt: Date;
    }>;
    setCapacity(capacity: number): Promise<{
        id: number;
        name: string | null;
        containerCapacity: number | null;
        totalMessages: number;
        isInitialized: boolean;
        createdAt: Date;
    }>;
    getState(): Promise<{
        containers: {
            id: number;
            createdAt: Date;
            databaseId: number;
            capacity: number;
            currentCount: number;
        }[];
        messages: {
            id: number;
            createdAt: Date;
            databaseId: number;
            content: string;
            containerId: number;
        }[];
    } & {
        id: number;
        name: string | null;
        containerCapacity: number | null;
        totalMessages: number;
        isInitialized: boolean;
        createdAt: Date;
    }>;
    resetDatabase(databaseId: number): Promise<boolean>;
}
