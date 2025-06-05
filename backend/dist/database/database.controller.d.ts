import { DatabaseService } from './database.service';
import { DatabaseDto } from './dto/database.dto';
export declare class DatabaseController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    init(): Promise<{
        id: number;
        name: string | null;
        containerCapacity: number | null;
        totalMessages: number;
        isInitialized: boolean;
        createdAt: Date;
    }>;
    setCapacity(dto: DatabaseDto): Promise<{
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
    resetDatabase(id: number): Promise<boolean>;
}
