export interface Message {
    id: string;
    content: string;
    containerId: number;
    createdAt: Date;
  }
  
export interface Container {
    id: number;
    capacity: number;
    currentCount: number;
    messages: Message[];
}
  
export interface DatabaseState {
    id: string;
    name: string;
    containerCapacity: number | null;
    containers: Container[];
    totalMessages: number;
    isInitialized: boolean;
}
  
export interface SearchResult {
    message?: string | null;
    containerId?: number;
}