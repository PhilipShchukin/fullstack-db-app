import type { DatabaseState, SearchResult } from "../types/database.types";
import { axiosClassic } from "./api.interceptor";


export const apiService = {
  initializeDatabase: async (): Promise<DatabaseState> => {
    const res = await axiosClassic.post('/database/init');
    return res.data;
  },

  setContainerCapacity: async ({ capacity, databaseId }: { capacity: number, databaseId: number }): Promise<DatabaseState> => {
    const res = await axiosClassic.post('/database/set-capacity', { capacity, databaseId });
    return res.data;
  },

  addMessage: async ({ content, databaseId }: { content: string, databaseId: number }): Promise<DatabaseState> => {
    const res = await axiosClassic.post('/messages', { content, databaseId });
    return res.data;
  },

  searchMessage: async ({ content, databaseId }: { content: string, databaseId: number }): Promise<SearchResult> => {
    const res = await axiosClassic.get(`/messages/search`, {
      params: { content, databaseId }
    });
    return res.data;
  },

  getDatabaseState: async (databaseId: number): Promise<DatabaseState> => {
    const res = await axiosClassic.get(`/database/state`, {
      params: { id: databaseId }
    });
    return res.data;
  },

  getAllMessages: async (databaseId: number): Promise<Array<{ content: string; containerId: string }>> => {
    const res = await axiosClassic.get(`/messages`, {
      params: { databaseId }
    });
    return res.data;
  },

  resetDatabase: async (databaseId: number) => {
    const res = await axiosClassic.patch(`/database/${databaseId}/reset`);
    return res.data;
  },
};