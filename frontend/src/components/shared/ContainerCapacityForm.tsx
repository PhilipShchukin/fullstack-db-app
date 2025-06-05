import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSetContainerCapacity, useResetDatabase } from "@/hooks/useDatabase";

interface ContainerCapacityFormProps {
  databaseId: number;
  isDisabled: boolean;
}

const ContainerCapacityForm: React.FC<ContainerCapacityFormProps> = ({
  databaseId,
  isDisabled,
}) => {
  const [containerCapacity, setContainerCapacity] = useState("");

  const setCapacityMutation = useSetContainerCapacity();
  const resetDatabaseMutation = useResetDatabase();

  const handleSetCapacity = () => {
    const capacity = parseInt(containerCapacity);

    if (isNaN(capacity) || capacity < 1 || !Number.isInteger(capacity)) {
      return;
    }

    setCapacityMutation.mutate({ capacity, databaseId });
  };

  const handleReset = () => {
    resetDatabaseMutation.mutate(databaseId);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="capacity">Объем контейнера</Label>
      <div className="flex gap-2">
        <Input
          id="capacity"
          value={containerCapacity}
          onChange={(e) => setContainerCapacity(e.target.value)}
          placeholder="Введите количество сообщений"
          disabled={isDisabled || setCapacityMutation.isPending}
          className="flex-1"
        />
        <Button
          onClick={handleSetCapacity}
          disabled={isDisabled || setCapacityMutation.isPending}
        >
          Установить
        </Button>
        <Button onClick={handleReset}>Удалить БД</Button>
      </div>
    </div>
  );
};

export default ContainerCapacityForm;
