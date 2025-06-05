import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/database.services';
import { toast } from 'sonner'

// Hook для инициализации базы данных
export const useInitializeDatabase = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.initializeDatabase,
    onSuccess: (data) => {
      queryClient.setQueryData(['databaseState', data.id], data);
      toast('База данных успешно инициализирована');
    },
    onError: (error: Error) => {
      toast(error.message);
    },
  });
};

// Hook для получения состояния базы данных
export const useDatabaseState = (databaseId: number) => {
  return useQuery({
    queryKey: ['databaseState', databaseId],
    queryFn: () => apiService.getDatabaseState(databaseId),
    enabled: !!databaseId,
  });
};

// Hook для установки объема контейнера
export const useSetContainerCapacity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.setContainerCapacity,
    onSuccess: (data, { databaseId }) => {
      queryClient.setQueryData(['databaseState', databaseId], data);
      toast('Объем контейнера установлен');
    },
    onError: (error: Error) => {
      toast(error.message);
    },
  });
};

// Hook для добавления сообщения
export const useAddMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.addMessage,
    onSuccess: (data, { databaseId }) => {
      queryClient.invalidateQueries({ queryKey: ['messages', databaseId] });
      toast('Сообщение добавлено');
    },
    onError: (error: Error) => {
      toast(error.message);
    },
  });
};

// Hook для получения всех сообщений
export const useMessages = (databaseId: number) => {
  return useQuery({
    queryKey: ['messages', databaseId],
    queryFn: () => apiService.getAllMessages(databaseId),
    enabled: !!databaseId,
  });
};

// Hook для поиска сообщения
export const useSearchMessage = () => {
  return useMutation({
    mutationFn: apiService.searchMessage,
    onSuccess: (data) => {
        toast(`Найдено: "${data.message}" в контейнере №${data.containerId}`);
    },
    onError: (error: Error) => {
      if (error) {
        toast('Сообщение не найдено');
      }
    },
  });
};

// Hook для удаления базы данных
export const useResetDatabase = () => {

  const initializeDatabase = useInitializeDatabase(); 

  return useMutation({
    mutationFn: (databaseId: number) => apiService.resetDatabase(databaseId),
    onSuccess: async ( ) => {
      toast('База данных успешно сброшена');
      await initializeDatabase.mutateAsync();
    },
    onError: (error: Error) => {
      toast(error.message);
    },
  });
};