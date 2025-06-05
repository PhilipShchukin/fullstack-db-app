import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    addMessage(dto: MessageDto): Promise<{
        id: number;
        content: string;
        containerId: number;
        databaseId: number;
        createdAt: Date;
    }>;
    searchMessage(content: string, dbId: string): Promise<{
        message: string;
        containerId: number;
    }>;
    getAll(dbId: string): Promise<({
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
