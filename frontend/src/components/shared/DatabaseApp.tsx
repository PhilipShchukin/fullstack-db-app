import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDatabaseState, useInitializeDatabase } from "@/hooks/useDatabase";
import ContainerCapacityForm from "./ContainerCapacityForm";
import MessageInputForm from "./MessageInput";
import MessageSearchForm from "./MessageSearch";
import MessagesTable from "./MessagesTable";
import DatabaseStats from "./DatabaseStats";

const DatabaseApp: React.FC = () => {
  const databaseId: number = 1;

  const { data: dbState, isLoading: isLoadingState } =
    useDatabaseState(databaseId);

  const initializeMutation = useInitializeDatabase();

  // Инициализация базы данных при монтировании компонента
  useEffect(() => {
    if (!dbState) {
      initializeMutation.mutate();
    }
  }, []);

  const containers = dbState?.containers ?? [];

  if (isLoadingState) {
    return <div className="p-6 text-center">Загрузка...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Управление базой данных</CardTitle>
          <p className="text-sm text-gray-600">
            База данных: {dbState?.name || "Загрузка..."}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ContainerCapacityForm
            databaseId={databaseId}
            isDisabled={dbState?.isInitialized || false}
          />

          {dbState?.isInitialized && (
            <>
              <MessageInputForm databaseId={databaseId} />
              <MessageSearchForm databaseId={databaseId} />
            </>
          )}
        </CardContent>
      </Card>

      {dbState?.isInitialized && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Данные</CardTitle>
            </CardHeader>
            <CardContent>
              <MessagesTable databaseId={databaseId} />
            </CardContent>
          </Card>

          <DatabaseStats
            totalMessages={dbState.totalMessages}
            containersCount={containers.length}
          />
        </>
      )}
    </div>
  );
};

export default DatabaseApp;
